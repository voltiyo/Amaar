import { useEffect, useState } from "react";
import Checkbox from "../components/checkbox"
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


function CheckAllPresent(data) {
    const requiredFields = [
        "title", "description", "price", "status", "size", "bedrooms", "bathrooms",
        "type", "location", "location_description", "nearby_places", "features",
        "features_description", "payment_plan", "handover", "payment_plan_description",
        "floor_plan_description", "master_plan_description"
    ];
    
    const missingFields = requiredFields.filter(field => !data[field]);
    

    if (missingFields.length > 0) {
        return {success: false, missing: missingFields};
    } else {
        return {success: true}
    }
}


async function HandleCreateProperty(images,features, MapPreview, FloorPlanPdf, PaymentPlanPdf, MasterPlanPreview) {
    const community_id = document.querySelector("#community").value
    const developer_id = document.querySelector("#developer").value
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const price = document.querySelector("#price").value;
    const status = document.querySelector("#status").value;
    const size = document.querySelector("#size").value;
    const bedrooms = document.querySelector("#bedrooms").value;
    const bathrooms = document.querySelector("#bathrooms").value;
    const type = document.querySelector("#type").value;
    const location = document.querySelector("#location").value;
    const location_description = document.querySelector("#location_description").value;
    const nearby_places = document.querySelector("#nearby_places").value;
    const features_description = document.querySelector("#features_description").value;
    const payment_plan = document.querySelector("#payment_plan").value;
    const handover = document.querySelector("#handover").value;
    const state = document.querySelector("#state").value;
    const payment_plan_description = document.querySelector("#payment_plan_description").value;
    const floor_plan_description = document.querySelector("#floor_plan_description").value;
    const master_plan_description = document.querySelector("#master_plan_description").value;

    const data = {
        title,
        description,
        price,
        status,
        size,
        bedrooms,
        bathrooms,
        type,
        location,
        location_description,
        nearby_places,
        features: features,
        features_description,
        payment_plan,
        handover,
        payment_plan_description,
        floor_plan_description,
        master_plan_description,
        community_id,
        developer_id,
        state,
    };
    const valid = CheckAllPresent(data);
    if (!images.length > 0) {
        document.querySelector("#FormMainCont").scrollTo({ top: 0, behavior: "smooth" })
        return document.querySelector(".Formerror").textContent = "Please Upload Images"
    }
    const formData = new FormData();
    formData.append("data", JSON.stringify(data)); 
    for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i]);
    }
    formData.append("MapPreview", MapPreview)
    formData.append("FloorPlanPdf", FloorPlanPdf)
    formData.append("PaymentPlanPdf", PaymentPlanPdf)
    formData.append("MasterPlanPreview", MasterPlanPreview)
    if (valid.success) {
        const response = await fetch("/api/create-property", {
            method: "POST",
            body: formData,
        })
        const responseData = await response.json();
        if (responseData.success) {
            window.location.reload()
        }
    } else {
        document.querySelector(".Formerror").textContent = "Missing Fields"
        document.querySelector("#FormMainCont").scrollTo({ top: 0, behavior: "smooth" })
    }
}





export default function Properties() {
    const [PropertiesPerPage, setPropertiesPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [createForm, setCreateForm] = useState(false)
    const [uploadedImages, setUploadedImages] = useState([])
    const [communities, setCommunities] = useState([])
    const [devs, setDevs] = useState([])
    const [paymentplanpdf, setpaymentplanpdf] = useState("")
    const [floorplanpdf, setfloorplanpdf] = useState("")
    const [locationmapperview, setlocationmapperview] = useState("")
    const [masterplanprev, setmasterplanprev] = useState("")
    const [selected, setSelected] = useState([])
    const [properties, setProperties] = useState([])
    const [features, setFeatures] = useState([])
    const [ChosenFeatures, setChosenFeatures] = useState([])
    const [states, setStates] = useState([])
    const [locations, setLocations] = useState([])

    const animatedComponents = makeAnimated();
    
    function checked() {
        const checks = document.querySelectorAll(".select-checkbox")
        const CheckedChecks = []
        for (const check of checks) {
            if (check.checked) {
                CheckedChecks.push(check.value)
            }
        }
        setSelected(CheckedChecks)
    }
    
    async function DeleteProperties() {
        const response = await fetch("/api/delete-property", {
            method: "POST", 
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({properties: selected})
        })
        const data = await response.json();
        if (data.success) {
            window.location.reload();
        } else {
            document.querySelector("#globalError").textContent = "An Error Happened Deleting Developers"
        }
    }

    
    useEffect(() => {
        async function GetPros() {
            const resp = await fetch("/api/properties");
            const data = await resp.json();
            setProperties(data)
        }
        GetPros();
    },[])

    
    useEffect(() => {
        async function GetComs() {
            const resp = await fetch("/api/communities");
            const data = await resp.json();
            setCommunities(data)
        }
        GetComs();
    },[])

    useEffect(() => {
        async function GetDEVS() {
            const resp = await fetch("/api/developers");
            const data = await resp.json();
            setDevs(data)
        }
        GetDEVS();
    },[])


    useEffect(() => {
        async function getFeat() {
            const resp = await fetch("/api/features");
            const data = await resp.json();
            setFeatures([])
            for (const feature of data) {
                setFeatures(prev =>  [...prev, { label: feature.name, value: feature.id} ] )
            }
        }
        getFeat();
    }, [])

    useEffect(() => {
        setfloorplanpdf("")
        setpaymentplanpdf("")
        setUploadedImages([])
        setlocationmapperview("")
        setmasterplanprev("")
    }, [createForm])


    useEffect(() => {
        async function getStates() {
            const resp = await fetch("/api/states");
            const data = await resp.json();
            setStates(data)
        }
        getStates();
    }, [])

    useEffect(() => {
        async function getLocations() {
            const resp = await fetch("/api/locations");
            const data = await resp.json();
            setLocations(data)
        }
        getLocations();
    }, [])


    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                setCreateForm(false)
            }
        })
    })
    const totalPages = Math.ceil(properties.length / PropertiesPerPage);

    const startIndex = (currentPage - 1) * PropertiesPerPage;
    const visibleProperties = properties.slice(startIndex, startIndex + PropertiesPerPage);
    
    return (
        <div style={{padding: "10px 60px", color: "#fff"}}>
            <h1 style={{color: "#fff", textDecoration: "underline"}}>Properties</h1>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div>
                    <span style={{margin: "0px 10px", fontWeight: "600"}}>Properties per page:</span> 
                    <select name="" id="" value={PropertiesPerPage} onChange={(value) => {setPropertiesPerPage(value.target.value)}}>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                    </select>
                </div>
                <button style={{display: "flex", cursor: "pointer", fontSize: "1.1rem",alignItems: "center", justifyContent: "space-around", fontWeight: "600", color: "#fff", outline: "none", borderRadius: "10px", background: "green", padding: "10px 20px", width: "130px", border: "1px solid #ccc"}} onClick={() => {setCreateForm(true)}}>
                    <i className="fa fa-plus"></i>
                    create
                </button>
            </div>
            <p id="globalError" style={{textAlign: "center", color: "red", fontWeight: "600"}}></p>
            <div>
                {
                    selected.length > 0 && (
                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                            <div onClick={DeleteProperties} style={{cursor: "pointer", fontSize: "0.8rem", background: "#E85D75", borderRadius: "5px", padding: "5px 7px", fontWeight: "600"}}>
                                Delete
                            </div>
                            {
                                selected.length === 1 &&
                                <div onClick={() => { window.location.href = `/Admin/property/edit/${selected[0]}` }} style={{cursor: "pointer", fontSize: "0.8rem", background: "#89A6FB", borderRadius: "5px", padding: "5px 7px", fontWeight: "600"}}>
                                    Edit
                                </div>
                            }
                        </div>
                    )
                }
            </div>
            <div>
                <div>
                    <table width={"100%"}  style={{textAlign: "center"}} className="admin-clients-table">
                        <thead >
                            <tr>
                                <th>Select</th>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Area</th>
                                <th>Bedrooms</th>
                                <th>Bathrooms</th>
                                <th>Developer ID</th>
                                <th>Status</th>
                                <th>Date Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleProperties.map((property) => (
                                <tr key={property.id}>
                                    <td><Checkbox val={property.id} checked={checked}/></td>
                                    <td>{property.id}</td>
                                    <td>{property.title}</td>
                                    <td>{property.type}</td>
                                    <td>{property.location}</td>
                                    <td>{property.price}</td>
                                    <td>{property.size}</td>
                                    <td>{property.bedrooms || "-"}</td>
                                    <td>{property.bathrooms || "-"}</td>
                                    <td>{property.developer_id}</td>
                                    <td>{property.status}</td>
                                    <td>{new Date(property.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0px", fontWeight: "600", gap: "10px"}}>
                <button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                    >
                    Previous
                    </button>
                    <span> Page {currentPage} of {totalPages} </span>
                    <button 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            {
                createForm && (
                    <div style={{position: "absolute", top: "0px", left: "0px", bottom: "0px", right: "0px", background: "rgb(0, 0, 0, 0.7)", display: "flex", alignItems: "center", justifyContent: "center"}} className="newPropCont">
                        <i className="fa fa-xmark" style={{position: "absolute", top: "0", right: "0", padding: "20px", fontSize: "2rem", color: "red" , zIndex: "7", cursor: "pointer"}}  onClick={() => { setCreateForm(false) }}></i>
                        <div className="newPropContBlur"></div>
                        <style>{`
                            .newPropContBlur{
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                content: "";
                                z-index: 6;
                            }
                        `}</style>
                        <div id="FormMainCont" style={{width: "70%", height: "90%", background: "white", borderRadius: "10px", overflowY: "auto", paddingBottom: "30px", zIndex: "7"}}>
                            <h1 style={{textAlign: "center", color: "#333"}}>Create New Property</h1>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <input type="file" name="" multiple hidden id="imagesUp" onChange={(e) => {setUploadedImages(e.target.files)}}/>
                                <label htmlFor="imagesUp" style={{color: "#fff", width: "20%", background: "#727272", padding: "20px 60px", borderRadius: "10px",cursor: "pointer"}}>
                                    
                                    {uploadedImages.length > 0 ? (<p style={{margin: "0px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>{uploadedImages.length} Uploaded</p>): (<p style={{margin: "0px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}><i className="fa fa-camera"></i>upload Images</p>)}
                                </label>
                            </div>
                            <p className="Formerror" style={{color: "red", textAlign: "center"}}></p>
                            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "50px", gap: "10px"}} onFocus={(e) => {e.target.style.borderColor = "#001F3F"}} onBlur={(e) => { e.target.style.borderColor = "#ccc" }}>
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Title" id="title" />
                                <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "200px"}} placeholder="Description" id="description" />
                                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                    <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "27.5%"}} placeholder="Price (AED)" id="price" />
                                    <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "27.5%"}} placeholder="Status" id="status" />
                                    <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "27.5%"}} placeholder="Size" id="size" />
                                </div>
                                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                    <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "44.5%"}} placeholder="Bedrooms" id="bedrooms" />
                                    <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "44.5%"}} placeholder="Bathrooms" id="bathrooms" />
                                </div>
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Type" list="property-types" id="type" />
                                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                    <p style={{color: "#333", fontWeight: "600"}}>State : </p>
                                    <select type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "84%"}} id="state" >
                                        {
                                            states.map((com, index) => {
                                                return (
                                                    <option value={com.id} key={index}>{com.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                    <p style={{color: "#333", fontWeight: "600"}}>Community : </p>
                                    <select type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "84%"}} id="community" >
                                        {
                                            communities.map((com, index) => {
                                                return (
                                                    <option value={com.id} key={index}>{com.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                    <p style={{color: "#333", fontWeight: "600"}}>Developer : </p>
                                    <select type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "84%"}} id="developer" >
                                        {
                                            devs.map((dev, index) => {
                                                return (
                                                    <option value={dev.id} key={index}>{dev.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                    <p style={{color: "#333", fontWeight: "600"}}>Location : </p>
                                    <select type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "84%"}} id="location" >
                                        {
                                            locations.map((dev, index) => {
                                                return (
                                                    <option value={dev.id} key={index}>{dev.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="Location Description" id="location_description" />
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Nearby Places (separe them by a ',' )" id="nearby_places" />
                                <div  style={{width: "84%", display: "flex", alignItems: "center", justifyContent:"center"}}>
                                    <label htmlFor="locationmapperviewup" style={{color: "#727272",fontWeight: "700", width: "100%", textAlign: "center", background: "#eee", border: "1px solid #ccc", padding: "10px 20px", borderRadius: "7px", cursor: "pointer"}}>{locationmapperview ? locationmapperview.name : "Upload Map location Preview (image)"}</label>
                                    <input type="file" multiple id="locationmapperviewup" accept="*" hidden onChange={(e) => { setlocationmapperview(e.target.files[0]) }}/>
                                </div>
                                <div style={{width: "84%", color: "#727272", background: "#eee"}}>

                                    <Select
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                backgroundColor: "#eee", // Background color
                                                border: state.isFocused ? "1px solid #001F3F" : "1px solid #ccc", // Border color
                                                boxShadow: state.isFocused ? "none" : "none", // Custom focus outline
                                                outline: "none",
                                                "&:hover" : {
                                                    borderColor: "#001F3F"
                                                }
                                              }),
                                            menu: (provided) => ({
                                              ...provided,
                                              backgroundColor: "#e0e0e0", // Change dropdown menu background
                                            }),
                                            input: (provided) => ({
                                              ...provided,
                                              outline: "none", // Remove input outline
                                              boxShadow: "none", // Remove focus shadow
                                            }),
                                          }}
                                        isMulti
                                        onChange={(e) => setChosenFeatures(e)}
                                        options={features}
                                        />
                                </div>
                                <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="Features Description" id="features_description"/>
                                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                    <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "60%"}} placeholder="payment plan" id="payment_plan" />
                                    <div style={{display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", marginRight: "40px"}}>
                                        <span style={{color : "#727272", fontWeight: "700"}}>HandOver</span>
                                        <input type="date" name="" id="handover" />
                                    </div>
                                </div>
                                <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="payment plan description" id="payment_plan_description" />
                                <div  style={{width: "84%", display: "flex", alignItems: "center", justifyContent:"center"}}>
                                    <label htmlFor="paymentplanpdfup" style={{color: "#727272",fontWeight: "700", width: "100%", textAlign: "center", background: "#eee", border: "1px solid #ccc", padding: "10px 20px", borderRadius: "7px", cursor: "pointer"}}>{paymentplanpdf ? paymentplanpdf.name : "Upload Payment Plan Pdf File"}</label>
                                    <input type="file" multiple id="paymentplanpdfup" accept=".pdf" hidden onChange={(e) => { setpaymentplanpdf(e.target.files[0]) }}/>
                                </div>
                                <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="floor plan description" id="floor_plan_description" />
                                <div  style={{width: "84%", display: "flex", alignItems: "center", justifyContent:"center"}}>
                                    <label htmlFor="floorplanpdfup" style={{color: "#727272",fontWeight: "700", width: "100%", textAlign: "center", background: "#eee", border: "1px solid #ccc", padding: "10px 20px", borderRadius: "7px", cursor: "pointer"}}>{floorplanpdf ? floorplanpdf.name : "Upload Floor Plan Pdf File"}</label>
                                    <input type="file" multiple id="floorplanpdfup" accept=".pdf" hidden onChange={(e) => { setfloorplanpdf(e.target.files[0]) }}/>
                                </div>

                                <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="master plan description" id="master_plan_description" />
                                <div  style={{width: "84%", display: "flex", alignItems: "center", justifyContent:"center"}}>
                                    <label htmlFor="masterplanprevup" style={{color: "#727272",fontWeight: "700", width: "100%", textAlign: "center", background: "#eee", border: "1px solid #ccc", padding: "10px 20px", borderRadius: "7px", cursor: "pointer"}}>{masterplanprev ? masterplanprev.name : "Upload Master Plan Preview (image)"}</label>
                                    <input type="file" multiple id="masterplanprevup" accept="*" hidden onChange={(e) => { setmasterplanprev(e.target.files[0]) }}/>
                                </div>
                                
                                <button style={{width: "84%", outline: "none", border: "none", borderRadius: "7px", padding: "10px 20px", background: "#04418b", color: "#fff", cursor: "pointer", fontSize: "1.1rem", fontWeight: "550"}} onClick={() => {HandleCreateProperty(uploadedImages, ChosenFeatures, locationmapperview, floorplanpdf, paymentplanpdf, masterplanprev)}}>Create</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}