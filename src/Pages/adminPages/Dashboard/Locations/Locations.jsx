import { useEffect, useState } from "react";
import Checkbox from "../components/checkbox";

async function CreateLocation() {
    const name = document.querySelector("#name").value;
    const area = document.querySelector("#area").value;
    const density = document.querySelector("#density").value;
    const population = document.querySelector("#population").value;
    const description = document.querySelector("#description").value;
    const state = document.querySelector("#state").value;


    const formData = new FormData();
    formData.append("name", name)
    formData.append("area", area)
    formData.append("density", density)
    formData.append("population", population)
    formData.append("description", description)
    formData.append("state", state)

    const response = await fetch("/api/create-location", {
        method: "POST",
        body: formData,
    })
    const data = await response.json();
    if (data.success) {
        window.location.reload()
    } else {
        document.querySelector("#Formerror").textContent = "an error happened"
    }
}

function EditCom(com) {
    window.location.href = "/Admin/Location/edit/" + com
    
}


export default function Locations() {
    const [CommunitiesPerPage, setCommunitiesPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [Locations, setLocations] = useState([])
    const [createForm, setCreateForm] = useState(false)
    const [selected, setSelected] = useState([])
    const [states, setStates] = useState([])
    
    const totalPages = Math.ceil(Locations.length / CommunitiesPerPage);

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

    async function DeleteLocations() {
        const response = await fetch("/api/delete-location", {
            method: "POST", 
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({locations: selected})
        })
        const data = await response.json();
        if (data.success) {
            window.location.reload();
        } else {
            document.querySelector("#globalError").textContent = "An Error Happened Deleting Locations"
        }
    }


    const startIndex = (currentPage - 1) * CommunitiesPerPage;
    const visibleCommunities = Locations.slice(startIndex, startIndex + CommunitiesPerPage);
    
    useEffect(() => {
        async function GetLocations() {
            const resp = await fetch("/api/locations");
            const data = await resp.json();
            setLocations(data)
        }
        GetLocations();
    }, [])


    useEffect(() => {
        async function getStates() {
            const resp = await fetch("/api/states");
            const data = await resp.json();
            setStates(data)
        }
        getStates();
    }, [])
    
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                setCreateForm(false)
            }
        })
    })

    return (
        <div style={{padding: "10px 60px", color: "#fff"}}>
            <h1 style={{color: "#fff", textDecoration: "underline"}}>Locations</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: "500px"}}>
                <div>
                    <span style={{margin: "0px 10px", fontWeight: "600"}}>Locations per page:</span> 
                    <select name="" id="" value={CommunitiesPerPage} onChange={(value) => {setCommunitiesPerPage(value.target.value)}}>
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
                            <div onClick={DeleteLocations} style={{cursor: "pointer", fontSize: "0.8rem", background: "#E85D75", borderRadius: "5px", padding: "5px 7px", fontWeight: "600"}}>
                                Delete
                            </div>
                            {selected.length == 1 && (<div onClick={() => {EditCom(selected[0])}} style={{cursor: "pointer", fontSize: "0.8rem", background: "#89A6FB", borderRadius: "5px", padding: "5px 7px", fontWeight: "600"}}>
                                Edit
                            </div>)}
                        </div>
                    )
                }
            </div>
            <div>
                <div>
                    <table width={"100%"}  style={{textAlign: "center"}} className="admin-clients-table">
                        <thead >
                            <tr>
                                <th>select</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Population</th>
                                <th>Density</th>
                                <th>Area</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleCommunities.map((dev) => (
                                <tr key={dev.id}>
                                    <td><Checkbox val={dev.id}  checked={checked}/></td>
                                    <td>{dev.id}</td>
                                    <td>{dev.name}</td>
                                    <td className="clamp-text">{dev.description}</td>
                                    <td>{dev.population}</td>
                                    <td>{dev.density}</td>
                                    <td>{dev.area}</td>
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
                            <h1 style={{textAlign: "center", color: "#333"}}>Create New Location</h1>
                            <p id="Formerror" style={{color: "red", fontSize: "1.2rem", textAlign: "center"}}></p>
                            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "50px", gap: "10px"}} onFocus={(e) => {e.target.style.borderColor = "#001F3F"}} onBlur={(e) => { e.target.style.borderColor = "#ccc" }}>
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Location's Name" id="name" />
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Location's Area" id="area" />
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Location's Density" id="density" />
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Location's Population" id="population" />
                                <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="Location's Description" id="description" />
                                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                    <p style={{color: "#333", fontWeight: "600"}}>State : </p>
                                    <select type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "84%"}} id="state" >
                                        {
                                            states.map((com, index) => {
                                                return (
                                                    <option value={com.id} key={index}>{com.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <button style={{width: "84%", outline: "none", border: "none", borderRadius: "7px", padding: "10px 20px", background: "#04418b", color: "#fff", cursor: "pointer", fontSize: "1.1rem", fontWeight: "550"}} onClick={() => {CreateLocation()}}>Create</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}