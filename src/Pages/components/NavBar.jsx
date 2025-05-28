import { useEffect, useState } from "react";
import "./navBar.css";


function showMenu() {
    const dropdown = document.querySelector(".dropdown-content");
    dropdown.classList.add("show");
}

function hideMenu() {
    const dropdown = document.querySelector(".dropdown-content");
    dropdown.classList.remove("show");
}

function ToggleMobileMenu() {
    const menu = document.querySelector("#mobileNav");
    if (menu.style.width === "0px") {
        menu.style.width = "250px";
    } else {
        menu.style.width = "0px";
    }
}


export default function NavBar({ page }) {
    const [states, setStates] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth);
        })
    }, [])
    
    

    useEffect(() => {
        async function GetStates() {
            const response = await fetch("/api/states");
            const data = await response.json();
            setStates(data);
        }
        GetStates();
    }, [])
    
    return (
        <div style={{ display: "flex", justifyContent: "start", height: '10vh', position: "fixed", top: "0px", width: "100%", background: "#fff", zIndex: "80", backgroundColor: " #004274 "}}>
            <a href="/" style={{width: windowSize >= 800 ? "12%" : "45%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{ width: "100%", margin: "0px 30px", position: "relative" }}>
                    <img src="/2.png" alt="Amaar Properties" style={{width: "100%"}} />
                </div>
            </a>
            {windowSize >= 800 ? <div id="nav-a-container" style={{ display: "flex", gap: "2rem", justifyContent: "space-around", marginLeft: "15%"}}>
                <a href="/" className={page === "home" ? "selected" : ""} style={{textWrap: "nowrap", fontFamily: "Arial, Helvetica, sans-serif"}}>home</a>
                {/* {<a href="/secondary-market-properties" className={page === "secondary" ? "selected" : ""}>secondary properties</a>} */}
                <div style={{ textTransform: "uppercase", position: "relative", transform: "translateY(-50%)"}}>
                    <a 
                        href="/Offplan-Projects"
                        onMouseOver={showMenu}
                        onMouseLeave={hideMenu}
                        style={{padding: "8px 10px", height: "100%", textWrap: "nowrap", display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", fontFamily: "Arial, Helvetica, sans-serif" }}
                        className={page === "offplan" ? "selected" : ""}
                    >
                        off plan <i className="fa-solid fa-caret-down"></i>
                    </a>
                    <div className="dropdown-content" onMouseOver={showMenu} onMouseLeave={hideMenu}>
                        {
                            states.map((state, index) => (
                                <a href={"/Offplan-projects/" + state.name.replaceAll(" ", "-")} style={{textWrap: "nowrap", fontFamily: "Arial, Helvetica, sans-serif"}} key={index}>{state.name}</a>
                            ))
                        }
                        <a href="/Offplan-projects/" style={{textWrap: "nowrap"}}>All Projects</a>
                    </div>
                </div>
                <a href="/Services" className={page === "services" ? "selected" : ""} style={{textWrap: "nowrap", fontFamily: "Arial, Helvetica, sans-serif"}}>services</a>
                <a href="/News-and-Articles" className={page === "newsandarticles" ? "selected" : ""} style={{textWrap: "nowrap", fontFamily: "Arial, Helvetica, sans-serif"}}>news & articles</a>
                <a href="/List-your-Property" className={page === "listyours" ? "selected" : ""} style={{textWrap: "nowrap", fontFamily: "Arial, Helvetica, sans-serif"}}>list your property</a>
                <a href="/About" className={page === "about" ? "selected" : ""} style={{textWrap: "nowrap", fontFamily: "Arial, Helvetica, sans-serif"}}>About</a>
            </div>
            :
            <div style={{position: "absolute", top: "20px", right: "30px", fontSize: "1.3rem", zIndex: "21"}} onClick={ToggleMobileMenu}>
                <i className="fa fa-bars" style={{color: "#fff"}}></i>
            </div>
            }
            {
                windowSize <= 800 && (
                    <div id="mobileNav" style={{display: "flex", backgroundColor: "#004274", flexDirection: "column", gap: "1rem",position: "absolute", top: "50px", zIndex: "20", right: "0px", transform: "translateX(100px)", padding: "10px 30px 10px ", overflow: "hidden", fontWeight: "600", borderRadius: "10px 0 0 10px", width: "0px", transition: "all .5s"}}>
                        <a href="/" className={page === "home" ? "selected" : ""} style={{color: "#fff", textWrap: "nowrap"}}>Home</a>
                        <a href="/Offplan-Projects" className={page === "offplan" ? "selected" : ""} style={{color: "#fff", textWrap: "nowrap"}}>
                            Off Plan
                        </a>
                        <a href="/Services" className={page === "services" ? "selected" : ""} style={{color: "#fff", textWrap: "nowrap"}}>Services</a>
                        <a href="/News-and-Articles" className={page === "newsandarticles" ? "selected" : ""} style={{color: "#fff", textWrap: "nowrap"}}>News & Articles</a>
                        <a href="/List-your-Property" className={page === "listyours" ? "selected" : ""} style={{color: "#fff", textWrap: "nowrap"}}>List Your Property</a>
                    </div>
                )
            }
        </div>
    );
}
