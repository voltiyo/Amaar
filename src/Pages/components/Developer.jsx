export default function Community({ data }) {
    return (
        <a href={`/Developer/${data.name.replaceAll(" ", "-")}`} style={{color: "#333"}} >
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%", border: "1px solid #ccc"}} className="property">
                <div style={{width: "35%", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #ccc", overflow: "hidden", height: "100%"}}>
                    <img src={"/api/file/" + data.logo} style={{maxWidth: "250px", width: "100%"}} alt="" />
                </div>

                <div style={{width: "55%"}}>
                    <h3 style={{color: "#333"}}>{data.name}</h3>
                    <small style={{textTransform: "uppercase", fontSize: ".65rem"}}>total Projects</small><br />
                    <span>{data.projects.length}</span>
                    <p className="clamp-text" style={{color: "#727272"}}>
                        {data.description}
                    </p>
                </div>

            </div>
        </a>
    )
}