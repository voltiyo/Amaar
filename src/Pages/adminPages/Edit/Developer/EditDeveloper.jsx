import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


async function EditDeveloper(image, id) {
    const name = document.querySelector("#name").value;
    const description = document.querySelector("#description").value;
    const website = document.querySelector("#Website").value;
    const contact = document.querySelector("#Contact").value;
    
    const body = new FormData();
    body.append("name", name);
    body.append("description", description);
    body.append("website", website);
    body.append("contact", contact);
    body.append("image", image);
    body.append("ID", id)

    const response = await fetch(`/api/SaveDevEdit`, {
        method: "POST",
        body: body,
    });
    const data = await response.json();

    if (data.success) {
        window.location.href = "/Admin"
    } else {
        document.querySelector("#Formerror").textContent = "Error Saving Data"
        
    }

}




export default function EditDev() {
    const { ID } = useParams();
    const [uploadedLogo, setUploadedLogo] = useState(null);
    const [uploadedlogoFile, setuploadedlogoFile] = useState(null);
    const [DevName, setDevName] = useState("");
    const [DevWeb, setDevWeb] = useState("");
    const [DevDesc, setDevDesc] = useState("");
    const [DevCon, setDevCon] = useState("");

    useEffect(() => {
        async function getCommunity () {
            const resp = await fetch(`/api/getDeveloperById/${ID}`)
            const data = await resp.json();
            if (data.empty) {
                window.location.href = "/Admin"
            }
            
            
            setDevDesc(data.description)
            setUploadedLogo("/api/file/" + data.logo)
            setDevName(data.name)
            setDevWeb(data.website)
            setDevCon(data.contact_info)
            
        }
        if (ID) {
            getCommunity();
        }
    }, [])
    
    return (
        <div>
            <div style={{position: "absolute", top: "0px", left: "0px", bottom: "0px", right: "0px", background: "rgb(0, 0, 0, 0.7)", display: "flex", alignItems: "center", justifyContent: "center"}} className="newPropCont">
                
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
                <div style={{width: "70%", height: "90%", background: "white", borderRadius: "10px", overflowY: "auto", paddingBottom: "30px", zIndex: "7"}}>
                    <h1 style={{textAlign: "center", color: "#333"}}>Edit Developer</h1>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <input type="file" name="" hidden id="logoUp" onChange={(e) => {setUploadedLogo(URL.createObjectURL(e.target.files[0])); setuploadedlogoFile(e.target.files[0])}}/>
                            <label htmlFor="logoUp" style={{color: "#fff", width: "20%",display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 80px", borderRadius: "10px",cursor: "pointer", textWrap: "nowrap", background: uploadedLogo ? "" : "#727272"}}>
                                <div className="ComLogoCont" style={{position: "relative", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    {uploadedLogo ? (<img src={`${uploadedLogo}`} width={128} style={{borderRadius: "8px"}} />): (<p style={{margin: "0px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}><i className="fa fa-camera"></i>Upload Image</p>)}
                                    {uploadedLogo && <div className="Del">
                                        <i className="fa fa-pen" style={{color: "blue", opacity: "1"}}></i>
                                    </div>}
                                </div>
                                <style>
                                    {`
                                        .Del {
                                            width: 100%;
                                            height: 100%;
                                            background: rgba(0, 0, 0, .6);
                                            opacity: 0;
                                            border-radius: 10px;
                                            position: absolute;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            font-size: 1.5rem;
                                            z-index: 10;
                                            transition: all .5s;
                                        }
                                        .ComLogoCont:hover .Del{
                                            opacity: 1;
                                        }
                                    `}
                                </style>
                            </label>
                        </div>
                    </div>
                    <p id="Formerror" style={{color: "red", fontSize: "1.2rem", textAlign: "center"}}></p>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "50px", gap: "10px"}} onFocus={(e) => {e.target.style.borderColor = "#004274"}} onBlur={(e) => { e.target.style.borderColor = "#ccc" }}>
                        <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Developer's Name" id="name" defaultValue={DevName} />
                        <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Developer's Website" id="Website" defaultValue={DevWeb} />
                        <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Developer's Contact Info" id="Contact" defaultValue={DevCon} />
                        <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="Developer's Description" id="description" defaultValue={DevDesc} />

                        
                        <button style={{width: "84%", outline: "none", border: "none", borderRadius: "7px", padding: "10px 20px", background: "#04418b", color: "#fff", cursor: "pointer", fontSize: "1.1rem", fontWeight: "550"}} onClick={() => {EditDeveloper(uploadedlogoFile, ID)}}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}