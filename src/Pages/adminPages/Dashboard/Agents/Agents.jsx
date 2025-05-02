import { useState, useEffect } from "react";
import Checkbox from "../components/checkbox";
  
async function CreateAgent(logo) {
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone_number = document.querySelector("#phoneN").value;
    const formData = new FormData();

    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone_number", phone_number)
    formData.append("logo", logo)

    const response = await fetch("/api/create-agent", {
        method: "POST",
        body: formData,
    });
    const data = await response.json();
    if (data.success) {
        window.location.reload();
    } else {
        document.querySelector("#error").textContent = "An Error Occured While Creating Agent"
    }
}

export default function Agents() {
    const [AgentsPerPage, setAgentsPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [agents, setAgents] = useState([])
    const [createForm, setCreateForm] = useState(false)
    const [uploadedLogo, setUploadedLogo] = useState("")
    const [selected, setSelected] = useState("")
    const totalPages = Math.ceil(agents.length / AgentsPerPage);

    const startIndex = (currentPage - 1) * AgentsPerPage;
    const visibleAgents = agents.slice(startIndex, startIndex + AgentsPerPage);
    function checked() {
        const checks = document.querySelectorAll(".select-checkbox")
        const CheckedChecks = []
        for (const check of checks) {
            if (check.checked) {
                CheckedChecks.push(check.value)
            }
        }
        setSelected(CheckedChecks)
    }
    
    useEffect(() => {
        async function GetAgents() {
            const resp = await fetch("/api/agents");
            const data = await resp.json();
            setAgents(data)
        }
        GetAgents();
    }, [])


    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                setCreateForm(false)
            }
        })
    })

    async function DeleteAgents() {
        const response = await fetch("/api/delete-agent", {
            method: "POST", 
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({agents: selected})
        })
        const data = await response.json();
        if (data.success) {
            window.location.reload();
        } else {
            document.querySelector("#globalError").textContent = "An Error Happened Deleting Developers"
        }
    }

    function EditAgent() {
        window.location.href = `/Admin/Agent/edit/${selected[0]}`
    }


    return (
        <div style={{padding: "10px 60px", color: "#fff"}}>
            <h1 style={{color: "#fff", textDecoration: "underline"}}>Agents</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div>
                    <span style={{margin: "0px 10px", fontWeight: "600"}}>Agents per page:</span> 
                    <select name="" id="" value={AgentsPerPage} onChange={(value) => {setAgentsPerPage(value.target.value)}}>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                    </select>
                </div>
                <button style={{display: "flex", cursor: "pointer", fontSize: "1.1rem",alignItems: "center", justifyContent: "space-around", fontWeight: "600", color: "#fff", outline: "none", borderRadius: "10px", background: "green", padding: "10px 20px", width: "130px", border: "1px solid #ccc"}} onClick={() => {setCreateForm(true)}}>
                    <i className="fa fa-plus"></i>
                    create
                </button>
            </div>
            <p id="globalError" style={{textAlign: "center", color: "red", fontWeight: "600"}}></p>
            <div>
                {
                    selected.length > 0 && (
                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                            <div onClick={DeleteAgents} style={{cursor: "pointer", fontSize: "0.8rem", background: "#E85D75", borderRadius: "5px", padding: "5px 7px", fontWeight: "600"}}>
                                Delete
                            </div>
                            {selected.length === 1 && <div onClick={EditAgent} style={{cursor: "pointer", fontSize: "0.8rem", background: "#89A6FB", borderRadius: "5px", padding: "5px 7px", fontWeight: "600"}}>
                                Edit
                            </div>}
                        </div>
                    )
                }
            </div>
            <div>
                <div>
                    <table width={"100%"}  style={{textAlign: "center"}} className="admin-clients-table">
                        <thead >
                            <tr>
                                <th>Select</th>
                                <th>ID</th>
                                <th>image</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Date Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleAgents.map((Agent) => (
                                <tr key={Agent.id}>
                                    <td><Checkbox val={Agent.id} checked={checked}/></td>
                                    <td>{Agent.id}</td>
                                    <td><img src={`/api/file/${Agent.image}`} style={{maxWidth: "50px"}} /></td>
                                    <td>{Agent.name}</td>
                                    <td>{Agent.email}</td>
                                    <td>{Agent.phone}</td>
                                    <td>{new Date(Agent.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0px", fontWeight: "600", gap: "10px"}}>
                <button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                    >
                    Previous
                    </button>
                    <span> Page {currentPage} of {totalPages} </span>
                    <button 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            {
                createForm && (
                    <div style={{position: "absolute", top: "0px", left: "0px", bottom: "0px", right: "0px", background: "rgb(0, 0, 0, 0.7)", display: "flex", alignItems: "center", justifyContent: "center"}} className="newPropCont">
                        <i className="fa fa-xmark" style={{position: "absolute", top: "0", right: "0", padding: "20px", fontSize: "2rem", color: "red" , zIndex: "7", cursor: "pointer"}}  onClick={() => { setCreateForm(false) }}></i>
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
                            <h1 style={{textAlign: "center", color: "#333"}}>Create New Agent</h1>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
                                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <input type="file" name="" hidden id="logoUp" onChange={(e) => {setUploadedLogo(e.target.files[0])}}/>
                                    <label htmlFor="logoUp" style={{color: "#fff", width: "20%", background: "#727272", padding: "20px 60px", borderRadius: "10px",cursor: "pointer", textWrap: "nowrap"}}>
                                        
                                        {uploadedLogo ? (<p style={{margin: "0px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>{uploadedLogo.name}</p>): (<p style={{margin: "0px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}><i className="fa fa-camera"></i>upload Logo</p>)}
                                    </label>
                                </div>
                            </div>
                            <p id="error" style={{color: "red", fontSize: "1.2rem"}}></p>
                            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "50px", gap: "10px"}} onFocus={(e) => {e.target.style.borderColor = "#004274"}} onBlur={(e) => { e.target.style.borderColor = "#ccc" }}>
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Agents's Name" id="name" />
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Agents's Email" id="email" />
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Agents's Phone Number" id="phoneN" />
                                
                                <button style={{width: "84%", outline: "none", border: "none", borderRadius: "7px", padding: "10px 20px", background: "#04418b", color: "#fff", cursor: "pointer", fontSize: "1.1rem", fontWeight: "550"}} onClick={() => {CreateAgent(uploadedLogo)}}>Create</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}