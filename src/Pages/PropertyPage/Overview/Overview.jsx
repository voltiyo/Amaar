import { useEffect, useState } from "react"
import PdfViwer from "../../components/PdfViewer"

export default function Overview({ property, developer }) {
    const [states, setStates] = useState([])
    const [propertyFeatues, setPropertyFeatures] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth);


    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth);
        })
    }, [])
    
    useEffect(()  => {
        async function GetState() {
            const resp = await fetch("/api/states");
            const data = await resp.json();
            const sta = data.filter(st => st.id === parseInt(property.state))[0]
            setStates(sta)
        }
        GetState();
    }, [property])
    
    
    useEffect(() => {
        async function GetFeatures() {
            const resp = await fetch("/api/features");
            const data = await resp.json();
            setPropertyFeatures([])
            for (let i = 0; i <= JSON.parse(property.features.replaceAll("{", '[').replaceAll("}", "]")).length; i++) {
               if (data[i].id === parseInt(JSON.parse(property.features.replaceAll("{", '[').replaceAll("}", "]"))[i])) {
                setPropertyFeatures(prev => [...prev, data[i]])
               }
            }
        }
        if (property.features) {
            GetFeatures();
        }

    },[property])
    
    
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "40px", margin: "50px 0px", padding: "0px 10px"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
                <div style={{display: "flex", flexDirection:  windowSize >= 800 ? "row" : "column-reverse", alignItems:  windowSize >= 800 ?  "start" : "center", justifyContent: "space-between", width: "100%", padding: " 10px 30px", border: "1px solid #ccc", borderRadius: "10px"}}>
                    <div style={{width:  windowSize >= 800 ?  "80%" : "95%"}}>
                        <h2 style={{marginBottom: "0px"}}>{property.title}</h2>
                        <small style={{fontWeight: "600", gap: "1rem", display: "flex", alignItems: "center"}}>
                            <i>By {developer.name}</i>
                            <i>|</i>
                            <i className="fa fa-location-dot"></i>
                            <i>{states && states.name}</i>
                        </small>
                        <div style={{fontWeight: "600", margin: "10px 0px"}}>
                            Status: {property.status}
                        </div>
                        <div style={{width: "100%", flexDirection: windowSize >= 800 ? "row" : "column", display: "flex", alignItems: windowSize >= 800 ?  "center" : "start", justifyContent:"space-around", flexWrap: "wrap", textWrap: "nowrap"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%", borderBottom: "1px solid #001F3F", padding: "10px", margin: "10px 0px"}}>
                                <span style={{marginRight: "5px"}}>Type:</span> <p style={{margin: "0px"}}>{property.type}</p>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%", borderBottom: "1px solid #001F3F", padding: "10px", margin: "10px 0px"}}>
                                <span style={{marginRight: "5px"}}>Bedrooms:</span> <p style={{margin: "0px"}}>{property.bedrooms}</p>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%", borderBottom: "1px solid #001F3F", padding: "10px", margin: "10px 0px"}}>
                                <span style={{marginRight: "5px"}}>Size:</span> <p style={{margin: "0px"}}>{property.size}</p>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%", borderBottom: "1px solid #001F3F", padding: "10px", margin: "10px 0px"}}>
                                <span style={{marginRight: "5px"}}>Payment Plan:</span> <p style={{margin: "0px"}}>{property.payment_plan}</p>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%", borderBottom: "1px solid #001F3F", padding: "10px", margin: "10px 0px"}}>
                                <span style={{marginRight: "5px"}}>Bathrooms:</span> <p style={{margin: "0px"}}>{property.bathrooms}</p>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%", borderBottom: "1px solid #001F3F", padding: "10px", margin: "10px 0px"}}>
                                <span style={{marginRight: "5px"}}>Handover:</span> <p style={{margin: "0px"}}>{new Date(property.handover).getFullYear()}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign: "center", fontWeight: "600", margin: "20px", padding: "10px", borderRadius: "10px", border: "1px solid #ccc", textWrap: "nowrap", width:  windowSize <= 800 && "90%"}}>Starting From <br /> <span style={{color: "#af9500"}}>{property.price}</span></div>
                </div>
                


            </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "40px", width: "100%"}}>
                <div style={{padding: " 10px 30px", border: "1px solid #ccc", borderRadius: "10px"}}>
                    <h4 style={{color: "#333"}}>Overview</h4>
                    <p style={{fontWeight: "550", fontSize: ".9rem", color: "#727272"}} dangerouslySetInnerHTML={{__html: property.description?.replaceAll(/\n/g, "<br />")}}></p>
                </div>
                <div style={{padding: " 10px 30px", border: "1px solid #ccc", borderRadius: "10px"}}>
                    <h4 style={{color: "#333"}}>Features And Amenities</h4>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: "20px"}}>
                        {
                            propertyFeatues.map((feature, index) => (
                                
                                <div key={index} style={{display: "flex", alignItems: "center", justifyContent: "center",borderRadius: "10px", flexDirection: "column", width: "200px", textAlign: "center", boxShadow: "0 2px 5px rgb(0 0 0 / 10%)", height: "160px"}}>
                                    <h4 style={{margin: "0px"}}>{feature.name}</h4>
                                    <small style={{margin: "5px"}} className="text-clamp">{feature.description}</small>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div style={{padding: " 10px 30px", border: "1px solid #ccc", borderRadius: "10px"}}>
                    <h4 style={{color: "#333"}}>Location Map</h4>
                    <div>
                        <img src={`/api/file/${property.location_map}`} style={{width: "100%", borderRadius: "10px"}} />
                    </div>
                </div>
                <div style={{padding: " 10px 30px", border: "1px solid #ccc", borderRadius: "10px"}}>
                    <h4 style={{color: "#333"}}>Master Plan</h4>
                    <div>
                        <img src={`/api/file/${property.master_plan_map}`} style={{width: "100%", borderRadius: "10px"}} />
                    </div>
                </div>
                <div style={{padding: " 10px 30px", border: "1px solid #ccc", borderRadius: "10px", width: "82%"}}>
                    <h4 style={{color: "#333"}}>Floor Plan</h4>
                    <div>
                        <PdfViwer fileUrl={"/api/file/" + property.floorPlanPDF} />
                    </div>
                </div>
                <div style={{padding: " 10px 30px", border: "1px solid #ccc", borderRadius: "10px", width: "82%"}}>
                    <h4 style={{color: "#333"}}>Payment Plan</h4>
                    <div>
                        <PdfViwer fileUrl={"/api/file/" + property.paymentplanPDF} />
                    </div>
                </div>
                {property.images && 
                    <div style={{padding: " 10px 30px", border: "1px solid #ccc", borderRadius: "10px", width: "82%"}} id="propertyImageGallery">
                        <h4 style={{color: "#333"}}>Image Gallery</h4>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
                        <div style={{width: "70%", height: "300px" , display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: "10px"}}>
                            <img src={`/api/file/${JSON.parse(property.images.replace("{", "[").replace("}","]"))[0]}`} style={{width: "100%", borderRadius: "10px"}} />
                        </div>
                            {
                                JSON.parse(property.images.replace("{", "[").replace("}","]"))?.length > 1 &&
                                <div style={{width: "25%"}}>
                                    {
                                        JSON.parse(property.images.replace("{", "[").replace("}","]")).map((img, index) => (
                                            <img src={`/api/file/${img}`} style={{width: "100%", borderRadius: "10px"}} />
                                        ))
                                    }
                                </div> 
                            }
                            
                        </div>
                    </div>}
            </div>
        </div>
    )
}