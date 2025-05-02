import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


async function EditLocation(id) {
    const name = document.querySelector("#name").value;
    const description = document.querySelector("#description").value;
    const population = document.querySelector("#population").value;
    const state = document.querySelector("#state").value;
    const density = document.querySelector("#density").value;
    const area = document.querySelector("#area").value;

    const response = await fetch(`/api/SaveLocaEdit`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify({name, description, population, state, density, area, ID: id}),
    });
    const data = await response.json();

    if (data.success) {
        window.location.href = "/Admin"
    } else {
        document.querySelector("#Formerror").textContent = "Error Saving Data"
        
    }

}




export default function EditLoca() {
    const { ID } = useParams();
    const [LocaName, setLocaName] = useState("");
    const [LocaDens, setLocaDens] = useState("");
    const [LocaArea, setLocaArea] = useState("");
    const [LocaDesc, setLocaDesc] = useState("");
    const [LocaPop, setLocaPop] = useState("");
    const [LocaState, setLocaState] = useState("");
    const [States, setStates] = useState("");


    useEffect(() => {
        async function getCommunity () {
            const resp = await fetch(`/api/getLocationById/${ID}`)
            const data = await resp.json();
            if (data.empty) {
                window.location.href = "/Admin"
            }
            
            
            setLocaDesc(data.description)
            setLocaName(data.name)
            setLocaDens(data.density)
            setLocaArea(data.area)
            setLocaPop(data.population)
            setLocaState(data.state)
            
        }
        if (ID) {
            getCommunity();
        }
    }, [])

    useEffect(() => {
        async function getStates() {
            const response = await fetch("/api/states");
            const data = await response.json();
            setStates(data)
        }
        getStates();
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
                    <h1 style={{textAlign: "center", color: "#333"}}>Edit Location</h1>
                    
                    <p id="Formerror" style={{color: "red", fontSize: "1.2rem", textAlign: "center"}}></p>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "50px", gap: "10px"}} onFocus={(e) => {e.target.style.borderColor = "#004274"}} onBlur={(e) => { e.target.style.borderColor = "#ccc" }}>
                        <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Location's Name" id="name" defaultValue={LocaName} />
                        <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Location's Area" id="area" defaultValue={LocaArea} />
                        <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Location's Density" id="density" defaultValue={LocaDens} />
                        <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Location's Population" id="population" defaultValue={LocaPop} />
                        <select id="state" value={LocaState} onChange={(e) => { setLocaState(e.target.value) }} style={{
                            width: "84%",
                            padding: "10px 20px",
                            background: "#eee",
                            borderRadius: "7px",
                            border: "1px solid #ccc",
                            outline: "none",
                            transition: "all .5s"
                        }}>
                            {
                                States && States.map((state, index) => (
                                    <option value={state.id} key={index}>{state.name}</option>
                                ))
                            }
                        </select>
                        <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="Location's Description" id="description" defaultValue={LocaDesc} />

                        
                        <button style={{width: "84%", outline: "none", border: "none", borderRadius: "7px", padding: "10px 20px", background: "#04418b", color: "#fff", cursor: "pointer", fontSize: "1.1rem", fontWeight: "550"}} onClick={() => {EditLocation(ID)}}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}