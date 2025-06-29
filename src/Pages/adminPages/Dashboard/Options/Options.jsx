import { useEffect, useState } from "react";
import Checkbox from "../components/checkbox";

function EditOption(option) {
    window.location.href = `/Admin/Option/edit/${option}`
}
async function CreateOption() {
    const name = document.querySelector("#name").value
    const value = document.querySelector("#value").value
    const body = {
        name, value
    }
    const response = await fetch("/api/create-option", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    if (data.success) {
        window.location.reload()
    } else {
        document.querySelector("#Formerror").textContent = "Error Creating Option"
    }
}

export default function Options() {
    const [OptionsPerPage, setOptionsPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [Options, setOptions] = useState([])
    const [createForm, setCreateForm] = useState(false)
    const [selected, setSelected] = useState([])
    const totalPages = Math.ceil(Options.length / OptionsPerPage);

    const startIndex = (currentPage - 1) * OptionsPerPage;
    const visibleOptions = Options.slice(startIndex, startIndex + OptionsPerPage);

    useEffect(() => {
        async function getOptions() {
            const data = await (await fetch("/api/optionalOptions")).json();
            setOptions(data)
        }
        getOptions();
    }, [])
    async function DeleteOptions(){
        const response = await fetch("/api/delete-options", {
            method: "POST", 
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({options: selected})
        })
        const data = await response.json();
        if (data.success) {
            window.location.reload();
        } else {
            document.querySelector("#globalError").textContent = "An Error Happened Deleting Options"
        }
    }

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


    return (
        <div style={{padding: "10px 60px", color: "#fff"}}>
            <h1 style={{color: "#fff", textDecoration: "underline"}}>Options</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: "900px"}}>
                <div>
                    <span style={{margin: "0px 10px", fontWeight: "600"}}>Options per page:</span> 
                    <select name="" id="" value={OptionsPerPage} onChange={(e) => {setOptionsPerPage(e.target.value)}}>
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
            <div>
                {
                    selected.length > 0 && (
                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                            <div onClick={DeleteOptions} style={{cursor: "pointer", fontSize: "0.8rem", background: "#E85D75", borderRadius: "5px", padding: "5px 7px", fontWeight: "600"}}>
                                Delete
                            </div>
                            {
                                selected.length === 1 &&
                                <div onClick={() => { EditOption(selected[0]) }} style={{cursor: "pointer", fontSize: "0.8rem", background: "#89A6FB", borderRadius: "5px", padding: "5px 7px", fontWeight: "600"}}>
                                    Edit
                                </div>
                            }
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
                                <th>Option Name</th>
                                <th>Option Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleOptions.map((option) => (
                                <tr key={option.id}>
                                    <td><Checkbox val={option.id}  checked={checked}/></td>
                                    <td>{option.id}</td>
                                    <td>{option.optionName}</td>
                                    <td>{option.optionValue}</td>
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
                            <h1 style={{textAlign: "center", color: "#333"}}>Create New Option</h1>
                            
                            <p id="Formerror" style={{color: "red", fontSize: "1.2rem", textAlign: "center"}}></p>
                            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "50px", gap: "10px"}} onFocus={(e) => {e.target.style.borderColor = "#004274"}} onBlur={(e) => { e.target.style.borderColor = "#ccc" }}>
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Option Name" id="name" />
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="Option Value" id="value" />

                                
                                <button style={{width: "84%", outline: "none", border: "none", borderRadius: "7px", padding: "10px 20px", background: "#04418b", color: "#fff", cursor: "pointer", fontSize: "1.1rem", fontWeight: "550"}} onClick={() => {CreateOption()}}>Create</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}