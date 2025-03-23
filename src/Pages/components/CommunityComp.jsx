import { useEffect, useState } from "react"

export default function CommunityComp({ data }) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.innerWidth);
        })
    }, [])
    return (
        <a href={`/Community/${data.name.replaceAll(" ", "-")}`} style={{color: "#333"}} >
            <div style={{display: "flex", flexDirection: screenWidth >= 800 ? "row" : "column", alignItems: "center", overflow: "hidden", justifyContent: "center",gap: "1.75rem", width: "100%", border: "1px solid #ccc", height: screenWidth <= 800 && "500px"}} className="property">
                <div style={{height: "100%", minHeight: "250px",width: "100%", objectFit: "cover", maxWidth: "350px", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #ccc", borderRadius: "10px", overflow: "hidden"}}>
                    <img src={`/api/file/${data.image}`} style={{height: screenWidth >= 800 ? "100%" : "", width: screenWidth >= 800 && "100%", objectFit: "cover"}} />
                </div>

                <div style={{width: "60%"}}>
                    <h3 style={{color: "#333", marginBottom: "0px", lineClamp: "1"}}>{data.name}</h3>
                    <p style={{marginTop: "0px", color: "#727272"}}>
                        <i className="ri-map-pin-line"></i>
                        {data.location}
                    </p>
                    <small style={{textTransform: "uppercase", fontSize: ".65rem"}}>Projects</small><br />
                    <span>{data.projects.length}</span>
                    <p className="clamp-text" style={{color: "#727272"}}>
                        {data.description}
                    </p>
                </div>

            </div>
        </a>
    )
}