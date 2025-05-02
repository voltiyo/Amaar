import { useEffect } from "react";
import { useState } from "react";

const ToggleOpen = (e) => {
    const target = e.target.parentElement.children[1];
    const upElement = e.target;
    
    if(target.style.display === "none"){
        target.style.display = "block";
        upElement.style.background = "linear-gradient(82deg,rgb(255, 136, 0) 0%,rgb(255, 136, 0) 35%,rgb(255 255 255) 100%)"
        upElement.style.color = "white";
        upElement.children[1].style.transform = "rotate(180deg)";
        upElement.children[1].style.color = "#004274";

    } else {
        target.style.display = "none";
        upElement.style.background = "linear-gradient(82deg,rgb(238 238 238) 0%,rgb(238 238 238) 41%,rgb(255 255 255) 99%)"
        upElement.style.color = "black";
        upElement.children[1].style.transform = "rotate(0deg)";
        upElement.children[1].style.color = "black";
    }
}


export default function Filter({setProps}) {
    const [states, setStates] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [coms, setComs] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    
    

    useEffect(() => {
        async function GetComs() {
            const response = await fetch('/api/communities')
            const data = await response.json()
            setComs(data)
        }
        async function GetStates() {
            const response = await fetch('/api/states')
            const data = await response.json()
            setStates(data)
        }
        async function GetDevelopers() {
            const response = await fetch('/api/developers')
            const data = await response.json()
            setDevelopers(data)
        }
        GetDevelopers();
        GetStates();
        GetComs();
    }, [])


    useEffect(() => {
        async function GetProps() {
            const properties = await  (await fetch("/api/properties")).json()
            setProps( properties.filter(prop => parseInt(prop.state) === parseInt(selectedState)))
        }
        if (selectedState) {
            GetProps()
        }
    }, [selectedState])
    


    return (
        <div style={{width: "95%" , padding: "20px", boxShadow: "0 .5rem 1rem rgb(0 0 0 / .15)", borderRadius: "5px"}}>
            <h3 style={{color: "#333", borderBottom: "1px solid rgb(0 0 0 / .15)"}}>Filter</h3>
            <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <div>
                    <div style={{display: "flex", color: "#fff", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: "linear-gradient(82deg,rgb(255, 136, 0) 0%,rgb(255, 136, 0) 35%,rgb(255 255 255) 100%)", padding: "0px 10px", borderRadius: "5px", transition: "all 300ms"}} onClick={(e) => {ToggleOpen(e)}}>
                        <p style={{pointerEvents: "none"}}>Starting Price Range</p>
                        <i style={{pointerEvents: "none", color: "#004274", transform: "rotate(180deg)" , transition: "all 300ms"}} className="fa-solid fa-caret-down"></i>
                    </div>
                    <div className="search-options-1">
                        <ul style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem"}}>
                            <li style={{display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem"}}>
                                <p style={{color: "#757575"}}>Min</p>
                                <input type="text" defaultValue={0} name="" id="min-search-range" style={{outline: "none", borderRadius: "5px", width: "93px", border: "1px solid #999"}}/>
                            </li>
                            <li style={{color: "#757575"}}>
                                -
                            </li>
                            <li style={{display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem"}}>
                                <p style={{color: "#757575"}}>Max</p>
                                <input type="text" name="" defaultValue={9000000000} id="max-search-range" style={{outline: "none", borderRadius: "5px", width: "93px", border: "1px solid #999"}}/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div style={{display: "flex", padding: "0px 10px", borderRadius: "5px", transition: "all 300ms", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: "linear-gradient(82deg,rgb(238 238 238) 0%,rgb(238 238 238) 41%,rgb(255 255 255) 99%)"}} onClick={(e) => {ToggleOpen(e)}}>
                        <p style={{pointerEvents: "none"}}>City</p>
                        <i style={{pointerEvents: "none" , transition: "all 300ms"}} className="fa-solid fa-caret-down"></i>
                    </div>
                    <div className="search-options-2" style={{display: "none"}}>
                        <div>
                            {
                                states.map((state, index) => (
                                    <div key={index}>
                                        <input type="radio" name="check-city" id={`${state.id}`} onChange={(e) => { setSelectedState(state.id) }} />
                                        <label htmlFor={`${state.id}`}>{state.name}</label>
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <h3>Communities</h3>
                            <div>
                                {
                                    coms.map((com, index) => (
                                        <div key={index}>
                                            <input type="checkbox" id={`${com.id}`} />
                                            <label htmlFor={`${com.id}`}>{com.name}</label><br />
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: "linear-gradient(82deg,rgb(238 238 238) 0%,rgb(238 238 238) 41%,rgb(255 255 255) 99%)", padding: "0px 10px", borderRadius: "5px", transition: "all 300ms"}} onClick={(e) => {ToggleOpen(e)}}>
                        <p style={{pointerEvents: "none"}}>Status</p>
                        <i style={{pointerEvents: "none" , transition: "all 300ms"}} className="fa-solid fa-caret-down"></i>
                    </div>
                    <div className="search-options-4" style={{display: "none", fontSize: ".75rem"}}>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", textWrap: "nowrap"}}> 
                            <div >
                                <input type="checkbox" name="" id="" /> 
                                <label htmlFor="">New Launch</label><br />

                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Ready to Move in</label><br />

                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Ready Plots</label><br />

                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Under Construction</label><br />

                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Upcoming</label><br />

                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Sold Out</label><br />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: "linear-gradient(82deg,rgb(238 238 238) 0%,rgb(238 238 238) 41%,rgb(255 255 255) 99%)", padding: "0px 10px", borderRadius: "5px", transition: "all 300ms"}} onClick={(e) => {ToggleOpen(e)}}>
                        <p style={{pointerEvents: "none"}}>Developers</p>
                        <i style={{pointerEvents: "none" , transition: "all 300ms"}} className="fa-solid fa-caret-down"></i>
                    </div>
                    <div style={{display: "none"}}>
                        {
                            developers.map((developer, index) => (
                                <div key={index}>
                                    <input type='checkbox' name="dev" id={`${developer.id}`} />
                                    <label htmlFor={`${developer.id}`}>{developer.name}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: "linear-gradient(82deg,rgb(238 238 238) 0%,rgb(238 238 238) 41%,rgb(255 255 255) 99%)", padding: "0px 10px", borderRadius: "5px", transition: "all 300ms"}} onClick={(e) => {ToggleOpen(e)}}>
                        <p style={{pointerEvents: "none"}}>Bedrooms</p>
                        <i style={{pointerEvents: "none" , transition: "all 300ms"}} className="fa-solid fa-caret-down"></i>
                    </div>
                    <div style={{display: "none", fontSize: ".75rem"}}>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">1 Bedroom</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2 Bedrooms</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">3 Bedrooms</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">4 Bedrooms</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">5 Bedrooms</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">6 Bedrooms</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">7 Bedrooms</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">8 Bedrooms</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">studio</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: "linear-gradient(82deg,rgb(238 238 238) 0%,rgb(238 238 238) 41%,rgb(255 255 255) 99%)", padding: "0px 10px", borderRadius: "5px", transition: "all 300ms"}} onClick={(e) => {ToggleOpen(e)}}>
                        <p style={{pointerEvents: "none"}}>Completion</p>
                        <i style={{pointerEvents: "none" , transition: "all 300ms"}} className="fa-solid fa-caret-down"></i>
                    </div>
                    <div style={{display: "none"}}>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(2,1fr)"}}>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2016</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2018</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2019</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2020</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2021</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2022</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2023</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2024</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2025</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2026</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2027</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2028</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2029</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Announcing Soon</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Ready To Move in</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button style={{width: "100%", margin: "10px 0px", border: "none", borderRadius: "10px", background: "#004274", color: "#fff", padding: "7px 0px", fontSize: "1.25rem"}}>Search</button>
        </div>
    )
}