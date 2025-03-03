import { useState, useEffect } from "react";
export default function Master({ property }) {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth);
        })
    }, [])
    
    return (
        <div style={{padding: "20px", margin: "20px", borderRadius: "10px", border: "1px solid #eee", width: "100%"}}>
            <h2 style={{color: "#333"}}>Master Plan</h2>
            <div style={{display: "flex", alignItems: windowSize >= 800 ? "start": "center", justifyContent: "space-around", width: "100%", flexDirection: windowSize >= 800 ? "row" : "column"}}>
                <div style={{width: "48%"}}>
                    <img src={`/api/file/${property.master_plan_map}`} style={{width: "100%", borderRadius: "10px"}} />
                </div>
                <div style={{width: "48%"}}>
                    <p style={{color: "#727272"}} dangerouslySetInnerHTML={{__html: property.master_plan_description?.replaceAll(/\n/g, "<br />")}}></p>
                    <br />
                </div>
            </div>
        </div>
    )
}