import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


async function EditAgentData(image, id) {
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    
    const body = new FormData();
    body.append("name", name);
    body.append("email", email);
    body.append("phone", phone);
    body.append("image", image);
    body.append("ID", id)

    const response = await fetch(`/api/SaveAgentEdit`, {
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




export default function EditAgent() {
    const { ID } = useParams();
    const [uploadedLogo, setUploadedLogo] = useState(null);
    const [uploadedlogoFile, setuploadedlogoFile] = useState(null);
    const [AgentN, setAgentN] = useState("");
    const [AgentNum, setAgentNum] = useState("");
    const [AgentE, setAgentE] = useState("");

    useEffect(() => {
        async function getAgent () {
            const resp = await fetch(`/api/getAgentById/${ID}`)
            const data = await resp.json();
            
            if (data.empty) {
                window.location.href = "/Admin"
            }

            setAgentN(data.name)
            setUploadedLogo("/api/file/" + data.image)
            setAgentNum(data.phone)
            setAgentE(data.email)
        }
        if (ID) {
            getAgent();
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
                    <h1 style={{textAlign: "center", color: "#333"}}>Edit Agent</h1>
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
                        <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Agent's Name" id="name" defaultValue={AgentN} />
                        <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Agent's Number" id="phone" defaultValue={AgentNum} />
                        <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="Agent's Email" id="email" defaultValue={AgentE} />

                        
                        <button style={{width: "84%", outline: "none", border: "none", borderRadius: "7px", padding: "10px 20px", background: "#04418b", color: "#fff", cursor: "pointer", fontSize: "1.1rem", fontWeight: "550"}} onClick={() => {EditAgentData(uploadedlogoFile, ID)}}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}