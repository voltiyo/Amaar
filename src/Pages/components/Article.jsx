import { useState, useEffect } from "react";

export default function ArticleCompo({data, index}) {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth);
        })
    }, [])
    return (
        <div key={index} style={{width: "100%", padding: "0px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <a href={`/News-and-Articles/${data.title.replaceAll(" ", "-")}`} style={{ padding: "0px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{display: "flex", flexDirection: windowSize >= 800 ? "row" : "column", width: windowSize >= 800 ? "95%" : "100%", alignItems: "center", justifyContent: "start", gap: "1rem", border: "1px solid #ccc", borderRadius: "10px", padding: "0px"}}>
                    <div style={{height: "100%", maxHeight: windowSize <= 800 && "200px", borderRadius: windowSize >= 800 ? "10px 0 0 10px" : "10px", width: windowSize >= 800 ? "40%": "100%", overflow: "hidden", padding: "0px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <img src={`/api/file/${data.image}`} style={{height: "100%", padding: "0px", objectFit: "cover", margin: "0px"}} />
                    </div>
                    <div style={{width: windowSize >= 800 ? "50%": "90%"}}>
                        <h3 style={{color: "#2b3b3a"}}>{data.title}</h3>
                        <div style={{display: "flex", alignItems: "center", gap: ".25rem", color: "#001F3F", fontWeight: "600"}}>
                            <i className="fa fa-calendar"></i>
                            <p style={{margin: "0px"}}>
                            {new Date(data.date).toDateString()}
                            </p>
                            |
                            <p style={{margin: "0px"}}>
                            {data.location}
                            </p>
                        </div>
                        <div style={{fontSize: ".8rem", color: "#727272"}}>
                            <p className="clamp-text">
                                {data.body}
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}