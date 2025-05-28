import { useEffect, useState, useRef } from "react"
import PdfViwer from "../../components/PdfViewer"
import ImageShower from "../../../images/ImageComponent";





export default function Overview({ property, developer, setPage, setPdf, setMainPage }) {
    const [location, setLocation] = useState([])
    const [propertyFeatues, setPropertyFeatures] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [downPayment, setDownPayment] = useState("")
    const [totalInstall, setTotalInstall] = useState("")
    const [onhandover, setOnhandover] = useState("")
    const headers = ["category", "unit_type", "FloorDetails", "Sizes", "type"];
    const visibleColumns = []
    for (const col of headers) {
        if (!property.floorDetails?.every(obj => obj[col] === null || obj[col] === undefined)) visibleColumns.push(col)
    }
    useEffect(() => {
        if (property.paymentPlanDetails?.length > 0) {
            let totalInstallments = 0
            let downpay = 0
            let onhandover = 0
            for (const detail of property.paymentPlanDetails) {
                if (detail.installment.toLowerCase().includes("installment") && !detail.installment.toLowerCase().includes("final")) {
                    totalInstallments += parseInt(detail.payment)
                } else if (detail.installment.toLowerCase().includes("down payment")) {
                    downpay = detail.payment
                } else if (detail.installment.toLowerCase().includes("final")) {
                    onhandover = detail.payment
                }
            }
            setTotalInstall(totalInstallments)
            setDownPayment(downpay)
            setOnhandover(onhandover)
        }
    }, [property.paymentPlanDetails])
    


    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth);
        })
    }, [])
    
    useEffect(()  => {
        async function GetState() {
            const resp = await fetch("/api/locations");
            const data = await resp.json();
            const sta = data.filter(st => st.id === parseInt(property.location))[0]
            setLocation(sta)
        }
        GetState();
    }, [property])
    
    
    useEffect(() => {
        async function GetFeatures() {
            const resp = await fetch("/api/features");
            const data = await resp.json();
            setPropertyFeatures(data.filter(feat => parseInt(feat.property) === parseInt(property.id)))
        }
        GetFeatures()

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
                            <i>{location && location.name}</i>
                        </small>
                        <div style={{fontWeight: "600", margin: "10px 0px"}}>
                            Status: {property.status}
                        </div>
                        <div style={{width: "100%", flexDirection: windowSize >= 800 ? "row" : "column", display: "flex", alignItems: windowSize >= 800 ?  "center" : "start", justifyContent:"space-around", flexWrap: "wrap", textWrap: "nowrap"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%", borderBottom: "1px solid #004274", padding: "10px", margin: "10px 0px"}}>
                                <span style={{marginRight: "5px"}}>Type:</span> <p style={{margin: "0px"}}>{property.type}</p>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%", borderBottom: "1px solid #004274", padding: "10px", margin: "10px 0px"}}>
                                <span style={{marginRight: "5px"}}>Bedrooms:</span> <p style={{margin: "0px"}}>{property.bedrooms}</p>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%", borderBottom: "1px solid #004274", padding: "10px", margin: "10px 0px"}}>
                                <span style={{marginRight: "5px"}}>Size:</span> <p style={{margin: "0px"}}>{property.size}</p>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%", borderBottom: "1px solid #004274", padding: "10px", margin: "10px 0px"}}>
                                <span style={{marginRight: "5px"}}>Payment Plan:</span> <p style={{margin: "0px"}}>{property.payment_plan}</p>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%", borderBottom: "1px solid #004274", padding: "10px", margin: "10px 0px"}}>
                                <span style={{marginRight: "5px"}}>Bathrooms:</span> <p style={{margin: "0px"}}>{property.bathrooms}</p>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%", borderBottom: "1px solid #004274", padding: "10px", margin: "10px 0px"}}>
                                <span style={{marginRight: "5px"}}>Handover:</span> <p style={{margin: "0px"}}>{new Date(property.handover).getFullYear()}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign: "center", fontWeight: "600", margin: "20px", padding: "10px", borderRadius: "10px", border: "1px solid #ccc", textWrap: "nowrap", width:  windowSize <= 800 && "90%"}}>Starting From <br /> <span style={{color: "orange"}}>{property.price}</span></div>
                </div>
                


            </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "40px", width: "95%"}}>
                <div style={{padding: " 10px 30px", border: "1px solid #ccc", borderRadius: "10px", width: "100%"}}>
                    <h4 style={{color: "#333"}}>Overview</h4>
                    <p style={{fontWeight: "550", fontSize: ".9rem", color: "#727272"}} dangerouslySetInnerHTML={{__html: property.description?.replaceAll(/\n/g, "<br />")}}></p>
                </div>
                {propertyFeatues.length > 0 && <div style={{padding: " 10px 30px", border: "1px solid #ccc", borderRadius: "10px", width: "100%", position: "relative"}}>
                    <h4 style={{color: "#333"}}>Features And Amenities</h4>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: "20px"}}>
                        {
                            propertyFeatues.map((feature, index) => (
                                
                                <div key={index} style={{display: "flex", alignItems: "center", justifyContent: "center",borderRadius: "10px", flexDirection: "column", width: "150px", textAlign: "center", boxShadow: "0 2px 5px rgb(0 0 0 / 10%)", height: "150px"}}>
                                    <div>
                                        {feature.icon && <img src={`/api/file/${feature.icon}`} style={{width: "50px"}} />}
                                    </div>
                                    <h4 style={{margin: "0px"}}>{feature.name}</h4>
                                    <small style={{margin: "5px"}} className="text-clamp">{feature.description}</small>
                                </div>
                            ))
                        }
                    </div>
                    <button style={{position: "absolute", bottom: "0", right: "0", background: "#004274", color: "#fff", borderTopLeftRadius: "42px", border: "none", outline: "none", cursor: "pointer", padding: "20px"}} onClick={() => { setPage("amenities") }}>
                        Read More...
                    </button>
                </div>}
                <div style={{padding: " 10px 30px", border: "1px solid #ccc", borderRadius: "10px", width: "100%", position: "relative"}}>
                    <h4 style={{color: "#333"}}>Location Map</h4>
                    <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around"}}>
                        <div style={{width: "50%"}}>
                            <img src={`/api/file/${property.location_map}`} style={{width: "100%", borderRadius: "10px"}} />
                        </div>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: "20px", width: "50%"}}>
                            {
                                property.nearby_places?.split(",").map(place => place.trim()).map((place, index) => {
                                    if (place === "") return 
                                    return (
                                        <div key={index} style={{display: "flex", alignItems: "center", justifyContent: "center",borderRadius: "10px", flexDirection: "column", width: "100px", textAlign: "center", boxShadow: "0 2px 5px rgb(0 0 0 / 10%)", height: "100px"}}>
                                            <h4 style={{margin: "0"}}>{place.split("-")[1]?.trim()}</h4>
                                            <small>{place.split("-")[0]?.trim()}</small>
                                        </div>
                                )})
                            }
                        </div>
                    </div>
                    <button style={{position: "absolute", bottom: "0", right: "0", background: "#004274", color: "#fff", borderTopLeftRadius: "42px", border: "none", outline: "none", cursor: "pointer", padding: "20px"}} onClick={() => { setPage("location") }}>
                        Read More...
                    </button>
                </div>
                <div style={{padding: " 10px 30px", border: "1px solid #ccc", borderRadius: "10px", width: "100%",position: "relative"}}>
                    <h4 style={{color: "#333"}}>Master Plan</h4>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "90%"}}>
                        <div style={{width: "50%"}}>
                            <img src={`/api/file/${property.master_plan_map}`} style={{width: "100%", borderRadius: "10px"}} />
                        </div>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: "20px", width: "40%"}}>
                            {
                                propertyFeatues.slice(0, 10).map((feature, index) => (
                                    
                                    <div key={index} style={{display: "flex", alignItems: "center", justifyContent: "center",borderRadius: "10px", flexDirection: "column", width: "75px", textAlign: "center", boxShadow: "0 2px 5px rgb(0 0 0 / 10%)", height: "75px"}}>
                                        <div>
                                            {feature.icon && <img src={`/api/file/${feature.icon}`} style={{width: "40px"}} />}
                                        </div>
                                        <h4 style={{margin: "0px", fontSize: "0.8rem"}}>{feature.name}</h4>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <button style={{position: "absolute", bottom: "0", right: "0", background: "#004274", color: "#fff", borderTopLeftRadius: "42px", border: "none", outline: "none", cursor: "pointer", padding: "20px"}} onClick={() => { setPage("master") }}>
                        Read More...
                    </button>
                </div>
                {   property.floorDetails?.length > 0 &&
                    <div style={{padding: " 10px 30px", border: "1px solid #ccc", borderRadius: "10px", width: "100%", position: "relative"}}>
                        <button style={{position: "absolute", top: "10px", right: "10px", background: "#004274", color: "#fff", border: "none", outline: "none", cursor: "pointer", padding: "20px"}} onClick={() => { setPdf("floor"); setMainPage("2"); setPage("") }}>
                            Download Floor Plan
                        </button>
                        <h4 style={{color: "#333"}}>Floor Plan</h4>
                        <div style={{padding: "20px", margin: "20px", borderRadius: "10px", border: "1px solid #eee"}}>
                            <table style={{width: "100%", }}>
                                <style>
                                    {`
                                        table, th, td{
                                            border: 1px solid #ccc;
                                            border-collapse: collapse;
                                        }
                                        th, td {
                                            padding: 10px;
                                        }
                                    `}
                                </style>
                                <thead>
                                    <th>Floor Plan</th>
                                    {
                                        visibleColumns.map((col, index) => (
                                            <th key={index}>{col}</th>
                                        ))
                                    }
                                </thead>
                                <tbody style={{textAlign: "center"}}>
                                    {
                                        property.floorDetails.slice(0, 3).map((floorDetail, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <img src={`/api/file/${floorDetail.floorPlanImage}`} style={{width: "50px"}} />
                                                </td>
                                                {
                                                    visibleColumns.filter(col => col === "category").length > 0 &&
                                                    <td>
                                                        {floorDetail.category || "-"}
                                                    </td>

                                                }
                                                {
                                                    visibleColumns.filter(col => col === "unit_type").length > 0 &&
                                                    <td>
                                                        {floorDetail.unit_type || "-"}
                                                    </td>
                                                }
                                                {
                                                    visibleColumns.filter(col => col === "FloorDetails").length > 0 &&
                                                    <td>
                                                        {floorDetail.FloorDetails || "-"}
                                                    </td>
                                                }
                                                {
                                                    visibleColumns.filter(col => col === "Sizes").length > 0 &&
                                                    <td>
                                                        {floorDetail.Sizes || "-"}
                                                    </td>
                                                }
                                                {
                                                    visibleColumns.filter(col => col === "type").length > 0 &&
                                                    <td>
                                                        {floorDetail.type || "-"}
                                                    </td>
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <button style={{position: "absolute", bottom: "0", right: "0", background: "#004274", color: "#fff", borderTopLeftRadius: "42px", border: "none", outline: "none", cursor: "pointer", padding: "20px"}} onClick={() => { setPage("floor") }}>
                            Read More...
                        </button>
                    </div>
                }
                {downPayment !== "" && totalInstall !== "" && onhandover !== "" && 
                <div style={{padding: " 10px 30px", border: "1px solid #ccc", borderRadius: "10px", width: "100%", position: "relative"}}>
                    <button style={{position: "absolute", top: "10px", right: "10px", borderRadius: "5px", background: "#004274", color: "#fff", border: "none", outline: "none", cursor: "pointer", padding: "20px"}} onClick={() => { setPdf("payment"); setMainPage("2"); setPage("") }}>
                        Download Payment Plan
                    </button>
                    
                    <h4 style={{color: "#333"}}>Payment Plan</h4>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem"}}>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center",borderRadius: "10px", flexDirection: "column", width: "150px", textAlign: "center", boxShadow: "0 2px 5px rgb(0 0 0 / 10%)", height: "150px"}}>
                            <h2 style={{margin: "0"}}>{downPayment}</h2>
                            <h4 style={{marginTop: "0"}}>Down Payment</h4>
                            <small>On Booking Date</small>
                        </div>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center",borderRadius: "10px", flexDirection: "column", width: "150px", textAlign: "center", boxShadow: "0 2px 5px rgb(0 0 0 / 10%)", height: "150px"}}>
                            <h2 style={{margin: "0"}}>{totalInstall}%</h2>
                            <h4 style={{marginTop: "0"}}>During Construction</h4>
                            <small>1st to last Installment</small>
                        </div>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center",borderRadius: "10px", flexDirection: "column", width: "150px", textAlign: "center", boxShadow: "0 2px 5px rgb(0 0 0 / 10%)", height: "150px"}}>
                            <h2 style={{margin: "0"}}>{onhandover}</h2>
                            <h4 style={{marginTop: "0"}}>On Handover</h4>
                            <small>100% Completion</small>
                        </div>
                    </div>
                    <button style={{position: "absolute", bottom: "0", right: "0", background: "#004274", color: "#fff", borderTopLeftRadius: "42px", border: "none", outline: "none", cursor: "pointer", padding: "20px"}} onClick={() => { setPage("payment") }}>
                        Read More...
                    </button>
                </div>}
                {property.images && 
                <div id="propertyImageGallery">
                    <ImageShower images={JSON.parse(property.images.replace("{", "[").replace("}","]"))}  />    
                </div>
                }
            </div>
        </div>
    )
}