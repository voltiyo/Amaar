import express from "express";
import multer from "multer"
import path from "path"
import pkg from 'pg';
import dotenv from 'dotenv';
import fs from "fs"
import { fileURLToPath } from "url";
import { log } from "console";

dotenv.config();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/");  // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
  }
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDFs and image files are allowed"), false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB file size limit
});

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}


const { Pool } = pkg;
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
  max: 20,
  allowExitOnIdle: false 
});

const app = express();
app.use(express.json());

app.get("/api/properties", async (req, res) => {
  const client = await pool.connect();
  const data = await client.query("SELECT * FROM properties")
  client.release();
  res.send(data.rows)
})


app.get("/api/RecentProperties", async (req, res) => {
  const client = await pool.connect();
  const data = await client.query("SELECT * FROM properties ORDER BY created_at  DESC LIMIT 4")
  client.release();
  res.send(data.rows)
})


app.get("/api/propertiesIn/:city", async ( req, res ) => {
  let city = req.params.city
  const client = await pool.connect();
  city = city.replaceAll("-", " ")
  const state = await client.query("SELECT * FROM states WHERE name = $1 ", [city])
  const stateID = state.rows[0].id  
  const data = await client.query("SELECT * FROM properties where state = $1", [stateID])
  client.release();
  res.send(data.rows)
})



app.get("/api/locations", async (req, res) => {
  const client = await pool.connect();
  const data = await client.query("SELECT * FROM locations")
  client.release();
  res.send(data.rows)
})



app.get("/api/developers", async (req, res) => {
  const client = await pool.connect();
  const data = await client.query("SELECT * FROM developers")
  const Response = []

  for (const dev of data.rows) {
    const props = await client.query("SELECT * FROM properties WHERE developer_id = $1", [ dev.id ])
    Response.push({...dev, projects: props.rows})
  }
  
  client.release();
  res.send(Response)
})

app.post("/api/developerId", async ( req, res ) => {
  const client = await pool.connect();
  const data = await client.query("SELECT * FROM developers WHERE id = $1", [req.body.developer_id])
  client.release();
  res.send(data.rows[0])
})


app.get("/api/clients", async ( req, res ) => {
  const client = await pool.connect();
  const data = await client.query("SELECT * FROM clients")
  client.release()
  res.send(data.rows)
})


app.get("/api/bookings", async ( req, res ) => {
  const client = await pool.connect();
  const data = await client.query("SELECT * FROM bookings")
  client.release()
  res.send(data.rows)
})



app.get("/api/transactions", async ( req, res ) => {
  const client = await pool.connect();
  const data = await client.query("SELECT * FROM transactions")
  client.release()
  res.send(data.rows)
})



app.get("/api/payments", async ( req, res ) => {
  const client = await pool.connect();
  const data = await client.query("SELECT * FROM payments")
  client.release()
  res.send(data.rows)
})

app.get("/api/news", async ( req, res ) => {
  const client = await pool.connect();
  const data = await client.query("SELECT * FROM news_articles")
  
  const articles = [];
  for (const article of data.rows) {
    const location = await client.query("SELECT * FROM locations WHERE id = $1 ", [ article.location ])
    article.location = location.rows[0].name

    articles.push(article)
  }

  client.release()
  res.send(articles)
})

app.post("/api/VerifyAdmin", async ( req, res ) => {
  const email = req.body.email;
  const password = req.body.password;

  const client = await pool.connect();
  const admins = await client.query("SELECT * FROM admins")
  client.release();

  const admin = admins.rows.filter(admin => admin.email === email && admin.password === password);
  if (admin.length) {
    return res.send({ success: true })
  } else {
    return res.send({ success: false })
  }
  
})




app.get("/api/communities", async ( req, res ) => {
  const client = await pool.connect();
  const data = await client.query("SELECT * FROM communities")
  const coms = []

  for (const com of data.rows){
    const projects = await client.query("SELECT * FROM properties WHERE community_id = $1", [com.id])
    coms.push({...com, projects: projects.rows})
  }
  
  client.release()
  res.send(coms)
})


app.get("/api/features", async (req, res ) => {
  const client = await pool.connect();
  const data = await client.query("SELECT * FROM features")
  client.release()
  res.send(data.rows)
})


app.get("/api/agents", async ( req, res ) => {
  const client = await pool.connect();
  const data = await client.query("SELECT * FROM agents")
  client.release()
  res.send(data.rows)
})


app.post("/api/create-property",upload.fields([
    { name: "files", maxCount: 10 },
    { name: "MapPreview", maxCount: 1 },
    { name: "FloorPlanPdf", maxCount: 1 },
    { name: "PaymentPlanPdf", maxCount: 1 },
    { name: "MasterPlanPreview", maxCount: 1 }
  ]), async ( req, res ) => {
  try {
    const ReqData = JSON.parse(req.body.data);
    const client = await pool.connect();
    const images = []
    for (const img of req.files.files) {
      images.push(img.filename)
    }
    const FormattedFeatures = []
    for (const feature of ReqData.features) {
      FormattedFeatures.push(feature.value) 
    }



    const values = [ReqData.title, ReqData.description, ReqData.price, ReqData.type, ReqData.status, parseInt(ReqData.bedrooms), parseInt(ReqData.bathrooms), ReqData.size,ReqData.community_id, ReqData.location, FormattedFeatures, ReqData.payment_plan, ReqData.handover, ReqData.features_description,req.files.FloorPlanPdf[0].filename, ReqData.floor_plan_description, ReqData.payment_plan_description, req.files.MapPreview[0].filename, ReqData.location_description, ReqData.nearby_places, req.files.MasterPlanPreview[0].filename,ReqData.master_plan_description ,images, ReqData.developer_id, req.files.PaymentPlanPdf[0].filename, ReqData.state]
    
    
    await client.query("INSERT INTO properties VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, DEFAULT, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)", values)
  
    client.release();
    res.send({success: true})
  } catch (err) {
    res.send({success: false})
}})
app.post("/api/create-developer", upload.fields([{name: "logo", maxCount: 1},{name: "banner", maxCount: 1}]), async (req, res) => {
  try  {
    const client = await pool.connect();
    const uploads = req.files;
    const values = [req.body.name, req.body.contact, req.body.website, req.body.description, uploads.logo[0].filename, uploads.banner[0].filename];

    const query = "INSERT INTO developers VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)"

    await client.query(query, values)
    client.release();
    res.send({success: true})
  } catch (err) {
    res.send({success: false})
  }
})

app.post("/api/create-agent", upload.single("logo"), async ( req, res ) => {
  try {
    const logo = req.file;
    
    const values = [req.body.name, req.body.email, req.body.phone_number, logo.filename]
    const query = "INSERT INTO agents VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4)"
  
    const client = await pool.connect();
    await client.query(query, values);
    client.release();
    res.send({ success: true })

  } catch (err) {
    res.send({ success: false })
  }
})


app.post("/api/create-article", upload.single("logo"), async ( req, res ) => {
  try {
    const logo = req.file;
    
    const values = [req.body.title, req.body.body, logo.filename,new Date().toISOString() ,req.body.location]
    const query = "INSERT INTO news_articles VALUES ($1, $2, $3, $4, $5, DEFAULT)"
  
    const client = await pool.connect();
    await client.query(query, values);
    client.release();
    res.send({ success: true })

  } catch (err) {
    res.send({ success: false })
  }
})


app.post("/api/create-location", upload.single("logo"), async ( req, res ) => {
  try {
    
    const values = [req.body.name, req.body.area, req.body.density, req.body.population, req.body.description, req.body.state]
    const query = "INSERT INTO locations VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)"
  
    const client = await pool.connect();
    await client.query(query, values);
    client.release();
    res.send({ success: true })

  } catch (err) {
    res.send({ success: false })
  }
})
app.post("/api/delete-developer", async ( req, res) => {
  try {
    const client = await pool.connect();

    const query = "DELETE FROM developers WHERE id = $1"
    
    for (const dev of req.body.developers) {
      await client.query(query, [dev])
    }

    client.release()
    res.send({success: true})
  } catch (err) {
    res.send({success: false})
  }
})
app.post("/api/delete-property", async ( req, res) => {
  try {
    const client = await pool.connect();

    const query = "DELETE FROM properties WHERE id = $1"
    
    for (const property of req.body.properties) {
      await client.query(query, [property])
    }

    client.release()
    res.send({success: true})
  } catch (err) {
    res.send({success: false})
  }
})
app.post("/api/delete-agent", async ( req, res) => {
  try {
    const client = await pool.connect();

    const query = "DELETE FROM agents WHERE id = $1"
    
    for (const agent of req.body.agents) {
      await client.query(query, [agent])
    }

    client.release()
    res.send({success: true})
  } catch (err) {
    res.send({success: false})
  }
})
app.post("/api/delete-article", async ( req, res) => {
  try {
    const client = await pool.connect();

    const query = "DELETE FROM news_articles WHERE id = $1"
    
    for (const article of req.body.articles) {
      await client.query(query, [article])
    }

    client.release()
    res.send({success: true})
  } catch (err) {
    res.send({success: false})
  }
})

app.post("/api/developer", async ( req, res ) => {
  try {
    const client = await pool.connect();
    const devName = req.body.developer_name.replaceAll("-", " ")

    const query = "SELECT * FROM developers WHERE name = $1"

    const data = await client.query(query, [devName])

    const data2 = await client.query("SELECT * FROM properties WHERE developer_id = $1", [data.rows[0].id])
    
    const response = {...data.rows[0]}
    response.projects = data2.rows;
    
    client.release();
    res.send(response)
  } catch (e) {
    res.send({success: false})
  }
})

app.post("/api/community", async ( req, res ) => {
  try {
    const client = await pool.connect();
    const comName = req.body.community_name.replaceAll("-", " ")

    const query = "SELECT * FROM communities WHERE name = $1"

    const data = await client.query(query, [comName])

    const data2 = await client.query("SELECT * FROM properties WHERE community_id = $1", [data.rows[0].id])
    
    const response = {...data.rows[0]}
    response.projects = data2.rows;
    
    client.release();
    res.send(response)
  } catch (e) {
    res.send({success: false})
  }
})


app.post("/api/property", async ( req, res ) => {
  try {
    const client = await pool.connect();
    const propertyTitle = req.body.propertyTitle.replaceAll("-", " ")

    const query = "SELECT * FROM properties WHERE title = $1"

    const data = await client.query(query, [propertyTitle])
    
    
    client.release();
    res.send(data.rows[0])
  } catch (e) {
    res.send({success: false})
  }
})


app.post("/api/article", async ( req, res ) => {
  try {
    const client = await pool.connect();
    const articleTitle = req.body.articleTitle.replaceAll("-", " ")
    const query = "SELECT * FROM news_articles WHERE title = $1"

    const data = await client.query(query, [articleTitle])
    
    
    client.release();
    res.send(data.rows[0])
  } catch (e) {
    res.send({success: false})
  }
})


app.post("/api/location", async ( req, res ) => {
  try {
    const client = await pool.connect();
    const locName = req.body.location.replaceAll("-", " ")

    const query = "SELECT * FROM locations WHERE name = $1"

    const data = await client.query(query, [locName])

    const data2 = await client.query("SELECT * FROM properties WHERE location = $1", [data.rows[0].id])
    
    const response = {...data.rows[0]}
    response.projects = data2.rows;
    
    client.release();
    res.send(response)
  } catch (e) {
    res.send({success: false})
  }
})


app.post("/api/create-community", upload.single("file"), async ( req, res ) => {
  try {
    const logo = req.file;
    
    const values = [req.body.name, req.body.location, req.body.description, logo.filename]
    const query = "INSERT INTO communities VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4)"
  
    const client = await pool.connect();
    await client.query(query, values);
    client.release();
    res.send({ success: true })

  } catch (err) {
    res.send({ success: false })
  }
})

app.get("/api/getCommunityById/:ID", async ( req, res ) => {
  try {
    const client = await pool.connect()
    const { ID } = req.params;
    const resp = await  client.query("SELECT * from communities where id = $1", [ ID])
    client.release();
    if (resp.rows.length === 0 ) {
      return res.send({ empty: true })
    }
    res.send(resp.rows[0]);
  } catch (err) {
    res.send({ empty: true })
  }
})

app.get("/api/getLocationById/:ID", async ( req, res ) => {
  try {
    const client = await pool.connect()
    const { ID } = req.params;
    const resp = await  client.query("SELECT * from locations where id = $1", [ ID])
    client.release();
    if (resp.rows.length === 0 ) {
      return res.send({ empty: true })
    }
    res.send(resp.rows[0]);
  } catch (err) {
    res.send({ empty: true })
  }
})

app.get("/api/getArticleById/:ID", async ( req, res ) => {
  try {
    const client = await pool.connect()
    const { ID } = req.params;
    const resp = await  client.query("SELECT * from news_articles where id = $1", [ ID])
    client.release();
    if (resp.rows.length === 0 ) {
      return res.send({ empty: true })
    }
    res.send(resp.rows[0]);
  } catch (err) {
    res.send({ empty: true })
  }
})

app.get("/api/getDeveloperById/:ID", async ( req, res ) => {
  try {
    const client = await pool.connect()
    const { ID } = req.params;
    const resp = await  client.query("SELECT * from developers where id = $1", [ ID])
    client.release();
    if (resp.rows.length === 0 ) {
      return res.send({ empty: true })
    }
    res.send(resp.rows[0]);
  } catch (err) {
    res.send({ empty: true })
  }
})

app.get("/api/getAgentById/:ID", async ( req, res ) => {
  try {
    const client = await pool.connect()
    const { ID } = req.params;
    const resp = await  client.query("SELECT * from agents where id = $1", [ID])
    client.release();
    if (resp.rows.length === 0 ) {
      return res.send({ empty: true })
    }
    res.send(resp.rows[0]);
  } catch (err) {
    res.send({ empty: true })
  }
})


app.get("/api/getStateById/:ID", async ( req, res ) => {
  try {
    const client = await pool.connect()
    const { ID } = req.params;
    const resp = await  client.query("SELECT * from states where id = $1", [ID])
    client.release();
    if (resp.rows.length === 0 ) {
      return res.send({ empty: true })
    }
    res.send(resp.rows[0]);
  } catch (err) {
    res.send({ empty: true })
  }
})


app.post("/api/save-state", upload.single("image"), async ( req, res ) => {
  try {
    const image = req.file;
    const StateName = req.body.StateName;
    const client = await pool.connect();

    const query = "INSERT INTO states VALUES (DEFAULT, $1, $2)";

    await client.query(query, [ StateName, image.filename ]);
    
  client.release()    
    res.send({ success: true });
  } catch (e) {
    res.send({ success: false });
  }
})



app.get("/api/states", async ( req, res ) => {
  const client = await pool.connect();
  const response = await client.query("SELECT * FROM states");
  
  const states = []
  
  for (const state of response.rows) {
    const propCount = (await client.query("SELECT * FROM properties WHERE state = $1", [state.id])).rowCount
    state.propCount = propCount;
    states.push(state)
  }
  
  
  client.release()




  res.send(states)
})


app.post("/api/delete-state", async ( req, res ) => {
  try {
    const client = await pool.connect();

    const query = "DELETE FROM states WHERE id = $1";
    for ( const state of req.body.states ) {
      await client.query(query, [ state ]);
    } 

    client.release();
    res.send({ success: true })
  } catch {
    res.send({ success: false })
  }
})

app.post("/api/delete-community",async ( req, res) => {
  try {
    const client = await pool.connect();

    const query = "DELETE FROM communities WHERE id = $1"
    
    for (const community of req.body.communities) {
      await client.query(query, [community])
    }

    client.release()
    res.send({success: true})
  } catch (err) {
    res.send({success: false})
  }
})

app.post("/api/delete-location",async ( req, res) => {
  try {
    const client = await pool.connect();

    const query = "DELETE FROM locations WHERE id = $1"
    
    for (const location of req.body.locations) {
      await client.query(query, [location])
    }

    client.release()
    res.send({success: true})
  } catch (err) {
    res.send({success: false})
  }
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  console.log("production mode enabled !")
  app.use(express.static(path.join(__dirname, "dist")));
  app.use("/public", express.static(path.join(__dirname, "public")));
  app.get("/api/file/:img", ( req, res ) => {
    const fileName = req.params.img;
    const filePath = path.resolve(__dirname, "uploads", fileName);
    res.sendFile(filePath);
  })
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
  PORT = process.env.PORT || 3000;
} else {
  console.log("dev mode enabled !")
}


app.get("/api/devReco/:devID/:exclude", async ( req, res ) => {
  const client = await pool.connect()
  const resp = await client.query("SELECT * FROM properties where developer_id = $1 AND id <> $2", [req.params.devID, req.params.exclude])
  client.release();
  res.send(resp.rows)
})


app.get("/api/file/:img", ( req, res ) => {
  const fileName = req.params.img;
  const filePath = path.resolve(__dirname, "uploads", fileName);
  res.sendFile(filePath);
})

app.post("/api/SaveComEdit", upload.single("image"), async ( req , res ) => {
  const client = await pool.connect();
  try {
    if (req.file) {
      await client.query("UPDATE communities SET name = $2, location = $3, description  = $4, image = $5 WHERE id = $1", [req.body.ID, req.body.name, req.body.location, req.body.description, req.file.filename])
    }
    else {
      await client.query("UPDATE communities SET name = $2, location = $3, description  = $4 WHERE id = $1", [req.body.ID, req.body.name, req.body.location, req.body.description])
    }
    client.release()
    res.send({ success: true })
  } catch {
    res.send({ success: false })
  }
})


app.post("/api/SaveArticleEdit", upload.single("image"), async ( req , res ) => {
  const client = await pool.connect();
  try {
    if (req.file) {
      await client.query("UPDATE news_articles SET title = $2, location = $3, body  = $4, image = $5 WHERE id = $1", [req.body.ID, req.body.title, req.body.location, req.body.ArticleBody, req.file.filename])
    }
    else {
      await client.query("UPDATE news_articles SET title = $2, location = $3, body  = $4 WHERE id = $1", [req.body.ID, req.body.title, req.body.location, req.body.ArticleBody])
    }
    client.release()
    res.send({ success: true })
  } catch (e) {
    res.send({ success: false })
  }
})


app.post("/api/SaveAgentEdit", upload.single("image"), async ( req , res ) => {
  const client = await pool.connect();
  try {
    if (req.file) {
      await client.query("UPDATE agents SET name = $2, email = $3, phone  = $4, image = $5 WHERE id = $1 RETURNING *", [req.body.ID, req.body.name, req.body.email, req.body.phone, req.file.filename])
    }
    else {
      await client.query("UPDATE agents SET name = $2, email = $3, phone  = $4 WHERE id = $1 RETURNING *", [req.body.ID, req.body.name, req.body.email, req.body.phone])
    }
    client.release()
    res.send({ success: true })
  } catch {
    res.send({ success: false })
  }
})


app.post("/api/SaveDevEdit", upload.single("image"), async ( req , res ) => {
  const client = await pool.connect();
  try {
    if (req.file) {
      await client.query("UPDATE developers SET name = $2, contact_info = $3, website  = $4, description = $5, logo = $5 WHERE id = $1 RETURNING *", [req.body.ID, req.body.name, req.body.contact, req.body.website, req.body.description, req.file.filename])
    }
    else {
      await client.query("UPDATE developers SET name = $2, contact_info = $3, website  = $4, description = $5 WHERE id = $1 RETURNING *", [req.body.ID, req.body.name, req.body.contact, req.body.website, req.body.description])
    }
    client.release()
    res.send({ success: true })
  } catch {
    res.send({ success: false })
  }
})


app.post("/api/SaveStateEdit", upload.single("image"), async ( req , res ) => {
  const client = await pool.connect();
  try {
    if (req.file) {
      await client.query("UPDATE states SET name = $2, image = $3 WHERE id = $1 RETURNING *", [req.body.ID, req.body.name, req.file.filename])
    }
    else {
      await client.query("UPDATE states SET name = $2 WHERE id = $1 RETURNING *", [req.body.ID, req.body.name])
    }
    client.release()
    res.send({ success: true })
  } catch {
    res.send({ success: false })
  }
})


app.post("/api/SaveLocaEdit", async ( req , res ) => {
  try {
    const client = await pool.connect();
    await client.query("UPDATE locations SET name = $2, area = $3, density = $4, population = $5, description = $6, state = $7 WHERE id = $1 RETURNING *", [req.body.ID, req.body.name, req.body.area, req.body.density, req.body.population, req.body.description, req.body.state])
    client.release()
    res.send({ success: true })
  } catch {
    res.send({ success: false })
  }
})


app.post("/api/SavePropEdit",
  upload.fields([
    { name: "images", maxCount: 10 },
    {name: "locationmapperview", maxCount: 1},
    {name: "payment_plan_pdf", maxCount: 1},
    {name: "floor_plan_pdf", maxCount: 1},
    {name: "master_plan_preview", maxCount: 1},
  ]),
  async ( req, res ) => {
    try {
      const client = await pool.connect();
      const query =
      
      `
      UPDATE properties
      SET 
        title = $1,
        description = $2,
        price = $3,
        status = $4,
        size = $5,
        bedrooms = $6,
        bathrooms = $7,
        type = $8,
        state = $9,
        community_id = $10,
        developer_id = $11,
        location = $12,
        location_description = $13,
        nearby_places = $14,
        location_map = $15,
        features = $16,
        features_description = $17,
        payment_plan = $18,
        handover = $19,
        payment_plan_description = $20,
        "paymentplanPDF" = $21,
        "floorPlanDescription" = $22,
        "floorPlanPDF" = $23,
        "master_plan_description" = $24,
        "master_plan_map" = $25,
        "images" = $26
      WHERE id = $27
      RETURNING *
      `

      const reqBody = req.body;
      const imagesToPush = [];
      for (const img of req.files.images) {
        imagesToPush.push(img.filename)
      }
      const response = await client.query(query, [reqBody.title, reqBody.description, reqBody.price, reqBody.status, reqBody.size, reqBody.bedrooms, reqBody.bathrooms, reqBody.type, reqBody.state, reqBody.community, reqBody.developer, reqBody.location, reqBody.location_description, reqBody.nearby_places,req.files.locationmapperview[0].filename, reqBody.SelectedFeatures, reqBody.features_description, reqBody.payment_plan, reqBody.handover, reqBody.payment_plan_description, req.files.payment_plan_pdf[0].filename, reqBody.floor_plan_description, req.files.floor_plan_pdf[0].filename, reqBody.master_plan_description, req.files.master_plan_preview[0].filename, imagesToPush, reqBody.id])
      
      const data = response.rows;
      if (data.length === 0) {
        return res.send({ success: false })
      }
      client.release()
      res.send({ success: true })
    } catch (e) {
      res.send({ success: false })
    }
})


app.post("/api/getInTouch", async ( req , res ) => {
  try {
    const client = await pool.connect();


    const query = "INSERT INTO getintouch VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, DEFAULT)"
    const name = req.body.name;
    const message = req.body.message;
    const email = req.body.email;
    const phone_code = req.body.code;
    const phone_number = req.body.phone_num;
    const identity = req.body.identity;

    await client.query(query, [name, email, phone_code, phone_number, identity, message]);

    client.release();
    res.send({success: true})
  } catch {
    res.send({success: false})
  }
})

app.get("/api/Messages", async ( req, res ) => {
  const client = await pool.connect();
  const query = "SELECT * from getintouch"
  const response = await client.query(query)
  client.release();
  res.send(response.rows)
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));