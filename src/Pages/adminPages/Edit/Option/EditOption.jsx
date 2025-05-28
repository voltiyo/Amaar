import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


async function EditOption(id) {
    const optionName = document.querySelector("#name").value;
    const optionValue = document.querySelector("#value").value;
    
    const body = {
        optionName, optionValue, id: parseInt(id)
    }
    const response = await fetch(`/api/SaveOptEdit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
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
    const [optionName, setOptionName] = useState("");
    const [optionValue, setOptionValue] = useState("");

    useEffect(() => {
        async function getCommunity () {
            const resp = await fetch(`/api/optionalOptions`)
            const data = await resp.json();
            if (data.empty) {
                window.location.href = "/Admin"
            }
            const option = data.filter(opt => parseInt(opt.id) === parseInt(ID))[0]
            setOptionName(option.optionName)
            setOptionValue(option.optionValue)
            
        }
        if (ID) {
            getCommunity();
        }
    }, [])
    
    return (
        <div>
            <div style={{position: "absolute", top: "0px", left: "0px", bottom: "0px", right: "0px", background: "rgb(0, 0, 0, 0.7)", display: "flex", alignItems: "center", justifyContent: "center"}} className="newPropCont">
                
                <div style={{width: "70%", height: "90%", background: "white", borderRadius: "10px", overflowY: "auto", paddingBottom: "30px", zIndex: "7"}}>
                    <h1 style={{textAlign: "center", color: "#333"}}>Edit Option</h1>
                    <p id="Formerror" style={{color: "red", fontSize: "1.2rem", textAlign: "center"}}></p>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "50px", gap: "10px"}} onFocus={(e) => {e.target.style.borderColor = "#004274"}} onBlur={(e) => { e.target.style.borderColor = "#ccc" }}>
                        <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Option Name" id="name" defaultValue={optionName} />
                        <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Option Value" id="value" defaultValue={optionValue} />

                        
                        <button style={{width: "84%", outline: "none", border: "none", borderRadius: "7px", padding: "10px 20px", background: "#04418b", color: "#fff", cursor: "pointer", fontSize: "1.1rem", fontWeight: "550"}} onClick={() => {EditOption(ID)}}>Edit</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}