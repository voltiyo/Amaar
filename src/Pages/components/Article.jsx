export default function ArticleCompo({data, index}) {
    return (
        <li key={index} style={{width: "100%", padding: "0px"}}>
            <a href={`/News-and-Articles/${data.title.replaceAll(" ", "-")}`} style={{width: "100%", padding: "0px"}}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "start", gap: "1rem", border: "1px solid #ccc",width: "100%", borderRadius: "10px", padding: "0px"}}>
                    <div style={{height: "100%", width: "40%",overflow: "hidden", padding: "0px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <img src={`/api/file/${data.image}`} style={{height: "100%", padding: "0px", objectFit: "cover", borderRadius: "10px 0px 0px 10px", margin: "0px"}} />
                    </div>
                    <div style={{width: "50%"}}>
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
        </li>
    )
}