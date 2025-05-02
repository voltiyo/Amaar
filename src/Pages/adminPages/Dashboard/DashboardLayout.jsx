import { useState, useEffect } from "react"
import AdminDashboard from "./Dashboard/dashboard"
import Agents from "./Agents/Agents"
import Bookings from "./Bookings/Bookings"
import Clients from "./Clients/Clients"
import Developers from "./Developers/Developers"
import Payments from "./Payments/Payments"
import Transactions from "./Transactions/Transactions"
import Properties from "./Properties/Properties"
import NewsAndArticles from "./NewsAndArticles/NewsAndArticles"
import Communities from "./Communities/Communities"
import States from "./States/States"
import Locations from "./Locations/Locations"
import Messages from "./Messages/Messages"

function ShowMobileMenu() {
    document.querySelector("#mobileAdminNav").style.display = "block"
    setTimeout(() => {
        document.querySelector("#mobileAdminNav").style.transform = "translateX(0px)"
    }, 50);
    
}
function HideMobileMenu() {
    document.querySelector("#mobileAdminNav").style.transform = "translateX(300px)"
    setTimeout(() => {
        document.querySelector("#mobileAdminNav").style.display = "none"
    }, 200);
}
function ToggleMobileMenu() {
    if (document.querySelector("#mobileAdminNav").style.display === "none") {
        ShowMobileMenu();
    } else {
        HideMobileMenu();
    }
}


export default function AdminDashboardLayout() {
    const [page, setPage] = useState(() => sessionStorage.getItem("currentPage") || "Dashboard");
    const [windowSize, setWindowSize] = useState(window.innerWidth);


    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth);
        })
    }, [])
    

    useEffect(() => {
        sessionStorage.setItem("currentPage", page);
        if (windowSize <= 800 ) {
            HideMobileMenu();
        }
    }, [page]);

    const sections = [
        {name: "Dashboard", icon: "house"},
        {name: "Clients", icon: "user"},
        {name: "Properties", icon: "building"},
        {name: "Communities", icon: "building-user"},
        {name: "Developers", icon: "flag"},
        {name: "Bookings", icon: "book"},
        {name: "States", icon: "tree-city"},
        {name: "Locations", icon: "location"},
        {name: "Payments", icon: "dollar-sign"},    
        {name: "Transactions", icon: "wallet"},
        {name: "Agents", icon: "laptop"},
        {name: "News And Articles", icon: "newspaper"},
        {name: "Messages", icon: "message"},
    ]
    
    
    return (
        <div style={{display: "flex", alignItems: "center", height: "94.5vh", gridGap: "10px",overflow: "hidden", padding: "20px 0px", justifyContent: windowSize >= 800 ? "space-around": "center", background: "#004274", marginTop: "-10vh"}}>
            <div id="mobileAdminNav" style={{height: "90%", zIndex: "80", transition: "all .5s", backgroundColor: "#333", borderRadius: "10px", padding: "0px 10px", position: "absolute", right: "0px",top: "50px", transform: "translateX(300px)", display: "none"}}>
                <div style={{ height: "100%", overflowY: "auto", overflowX: "hidden"}}>
                    <div style={{padding: "10px", color: "white"}}>
                        <table>
                            <tbody>
                                {
                                    sections.map((section, index) => {
                                        return (
                                            
                                            <tr key={index} style={{display: "flex", alignItems: "center", borderRadius: "5px", cursor: "pointer", transition: "all 500ms", width: "100%", color: page === section.name && "#FFD700"}} className="dashboard-link" onClick={() => {setPage(section.name)}}>
                                                <td style={{width: "25%",display: "flex",justifyContent: "center", alignItems: "center"}}><i className={`fa-solid fa-${section.icon}`} style={{marginRight: "10px"}}></i></td>
                                                <td style={{minWidth: "150px"}}><h3 style={{margin: "15px", textWrap: "nowrap"}}>{section.name}</h3></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <style>{".dashboard-link:hover{color: #FFD700}"}</style>
            <div style={{position: "absolute", right: "40px", top: "20px", display: windowSize >= 800 ? "none" : "block", color: "#fff", fontSize: "1.3rem"}} onClick={ToggleMobileMenu}>
                <i className="fa fa-bars"></i>
            </div>
            <div style={{height: "100%", width: "20%", backgroundColor: "#333", borderRadius: "10px", padding: "0px 10px", display: windowSize <= 800 && "none"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "10%", padding: "30px"}}>
                    <img src="/light-logo.png" width={"200"} alt="" />
                </div>
                <div style={{ height: "78%", overflowY: "auto", overflowX: "hidden"}}>
                    <div style={{padding: "10px", color: "white"}}>
                        <table>
                            <tbody>
                                {
                                    sections.map((section, index) => {
                                        return (
                                            
                                            <tr key={index} style={{display: "flex", alignItems: "center", borderRadius: "5px", cursor: "pointer", transition: "all 500ms", width: "100%", color: page === section.name && "#FFD700"}} className="dashboard-link" onClick={() => {setPage(section.name)}}>
                                                <td style={{width: "25%",display: "flex",justifyContent: "center", alignItems: "center"}}><i className={`fa-solid fa-${section.icon}`} style={{marginRight: "10px"}}></i></td>
                                                <td style={{minWidth: "150px"}}><h3 style={{margin: "15px", textWrap: "nowrap"}}>{section.name}</h3></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div style={{height: windowSize >= 800 ? "100%" : "90%", display: "flex", justifyContent: "center", alignItems: "center", width: windowSize <= 800 ? "100%" : "75%", borderRadius: "10px", overflow: "hidden"}}>
                <div style={{height: "100%" , overflowY: "auto", width: "95%", backgroundColor: "#727272", borderRadius: "10px"}}>
                    {page === "Dashboard" && <AdminDashboard />}
                    {page === "Clients" && <Clients />}
                    {page === "Properties" && <Properties />}
                    {page === "Communities" && <Communities />}
                    {page === "Developers" && <Developers />}
                    {page === "Bookings" && <Bookings />}
                    {page === "States" && <States />}
                    {page === "Locations" && <Locations />}
                    {page === "Payments" && <Payments />}
                    {page === "Transactions" && <Transactions />}
                    {page === "Agents" && <Agents />}
                    {page === "News And Articles" && <NewsAndArticles />}
                    {page === "Messages" && <Messages />}
                </div>
            </div>
        </div>
    )
}