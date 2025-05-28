import { useState, useEffect } from "react";

export default function Property( data ) {
    const [locations, setLocations] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth);
        })
    }, [])

    useEffect(() => {
        async function GetLocations() {
            const resp = await fetch("/api/locations");
            const data = await resp.json();
            setLocations(data)
        }
        GetLocations();
    }, [])
    return (
        <a href={`/Projects/${data.data.title.replaceAll(" ", "-")}`}  style={{ borderRadius: "15px", width: "95%"}}>
            <div style={{display: "flex",alignItems: windowSize >= 800 ? "center" : "start", border: "1px solid #ccc",width: "95%", height: windowSize >= 800 ? "250px": "fit-content", paddingBottom: windowSize <= 800 && "20px", flexDirection: windowSize >= 800 ? "row": "column", overflow: "hidden"}} className="property">
                <div style={{height: windowSize >= 800 ? "100%" : "fit-content", width: windowSize >= 800 ? "40%" : "100%", overflow: "hidden"}}>
                    <img src={`/api/file/${JSON.parse(data.data.images.replace("{", "[").replace("}","]"))[0]}`} style={{borderRadius: "10px", height: "100%", width: "460px", objectFit: "cover"}} alt="" />
                </div>
                <div style={{margin: "0px 20px", width: "60%"}}>
                    <h4 style={{color: "#004274", display: "flex", alignItems: "center", justifyContent: "start", gap: "5px"}}>
                        <i className="ri-arrow-up-line ri-color" style={{ color: "#fff", fontSize: "13px", padding: "1px", borderRadius: "50%"}}></i>
                        {
                            data.data.price.includes("AED") === false && data.data.price !== "Call Us" && "AED" 
                        } {data.data.price}
                    </h4>
                    <h4 href={`/Projects/${data.data.title}`} id="prop-title" style={{color: "#757575", fontWeight: "600", margin: "0px"}}>{data.data.title}</h4>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", color: "#757575", width: "fit-content", gap: "5px"}}>
                        <i className="ri-map-pin-line" style={{color: "#004274"}}></i>
                        <p>{locations.length > 0 && locations.filter(location => parseInt(data.data.location) === location.id)[0]?.name}</p>
                    </div>
                    <div style={{display: "flex", alignItems: windowSize >= 800 ? "center" : "start", justifyContent: "center", gap: "10px", flexDirection: windowSize >= 800 ? "row": "column"}}>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center",gap: "10px ", background: "#eee", padding: "5px 10px", borderRadius: "10px", color: "#727272"}}>
                            <i className="fa fa-building" style={{color: "#004274", fontSize: "1.4rem"}}></i>
                            <div style={{textWrap: "nowrap", maxWidth: "100px", overflow: "hidden"}}>
                                <span>Property Type</span><br />
                                <strong>{data.data.type}</strong>
                            </div>
                        </div>

                        
                        
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center",gap: "10px ", background: "#eee", padding: "5px 10px", borderRadius: "10px", color: "#727272"}}>
                            <i className="fa fa-bed" style={{color: "#004274", fontSize: "1.4rem"}}></i>
                            <div style={{textWrap: "nowrap", maxWidth: "100px", overflow: "hidden"}}>
                                <span>Bedrooms</span><br />
                                <strong>{data.data.bedrooms}</strong>
                            </div>
                        </div>

                        
                        
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center",gap: "10px ", background: "#eee", padding: "5px 10px", borderRadius: "10px", color: "#727272"}}>
                            <i className="fa fa-area-chart" style={{color: "#004274", fontSize: "1.4rem"}}></i>
                            <div style={{textWrap: "nowrap", maxWidth: "100px", overflow: "hidden"}}>
                                <span>Size</span><br />
                                <strong style={{fontSize: ".8rem"}}>{data.data.size}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}