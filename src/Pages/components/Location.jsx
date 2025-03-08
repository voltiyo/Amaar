import { useState, useEffect } from "react";

export default function Location({ data }) {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth);
        })
    }, [])
    return (
        <a href={`/Locations/${data.name.replaceAll(" ", "-")}`} style={{color: "#333"}} >
            <div style={{display: "flex", flexDirection: windowSize >= 800 ? "row": "column", alignItems: "center", justifyContent: "start", gap: "1.75rem", width: "100%", border: "1px solid #ccc", height: windowSize <= 800 && "420px" }} className="property">
                <div style={{height: windowSize >= 800 ? "100%": "200px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #ccc"}}>
                    <img src="https://www.tanamiproperties.com/images/default-location.webp" style={{height:  "100%", width: "100%", objectFit: "cover", borderRadius: "10px"}} alt="" />
                </div>

                <div style={{width: windowSize >= 800 ? "55%": "85%"}}>
                    <h3 style={{color: "#333", marginBottom: "20px", lineClamp: "1"}}>{data.name}</h3>
                    
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <span style={{fontSize: ".7rem", fontWeight: "400", color: "#727272"}}>AREA</span>
                            <span style={{fontSize: ".8rem", fontWeight: "500", color: "#333"}}>{data.area}</span>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <span style={{fontSize: ".7rem", fontWeight: "400", color: "#727272"}}>DENSITY</span>
                            <span style={{fontSize: ".8rem", fontWeight: "500", color: "#333"}}>{data.density}</span>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <span style={{fontSize: ".7rem", fontWeight: "400", color: "#727272"}}>POPULATION</span>
                            <span style={{fontSize: ".8rem", fontWeight: "500", color: "#333"}}>{data.population}</span>
                        </div>
                    </div>
                    <p className="clamp-text" style={{color: "#727272"}}>
                        {data.description}
                    </p>
                </div>

            </div>
        </a>
    )
}