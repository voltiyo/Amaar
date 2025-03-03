import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"

export default function PropertyManagement() {
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth)
        })
    }, [])
    
    
    return (
        <div>
            <NavBar page={"listyours"}/>
            <div>
                <div className='services-title-container'>
                    <h1>Property Management</h1>
                    <ul>
                        <li>Home</li>
                        <li>/</li>
                        <li>Property Management</li>
                    </ul>
                </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "50px 0px"}}>
                    <div style={{width: "80%", display: "flex", alignItems: "center", justifyContent:"center", gap: "4rem", flexDirection: windowSize >= 800 ? "row" : "column"}}>
                        <div>
                            <h2 style={{color: "#333", fontWeight: "650"}}>How It Works</h2>
                            <p style={{color: "#727272", fontWeight: "600"}}>When renting or buying your property in Dubai, you will want to get the best possible price. If you own one or more properties in Dubai, register with us and let your property benefit from professional property marketing services that result in the best possible rental price. Whether you are renting a commercial or residential property, our knowledgeable Dubai property experts are ready for you.</p>

                        </div>
                        <div style={{display: "flex", alignItems: "center", justifyContent:"center", gap: "2rem", flexDirection: windowSize >= 1200 ? "row" : "column"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent:"center", flexDirection: "column", gap: "2rem"}}>
                                <div style={{width: "280px", padding: "20px", border: "1px solid #eee", borderRadius: "10px", boxShadow: "0 .5rem 1rem rgb(0 0 0 / .15)"}}>
                                    <i className="ri-file-3-line" style={{color: "#001F3F", fontSize: "2rem", margin: "1rem"}}></i>
                                    <h4 style={{color: "#333", fontWeight: "650", margin: "0px"}}>DOCUMENTS</h4>
                                    <p style={{color: "#727272", fontWeight: "600", margin: "0px"}}>The owner agrees to list a property, all necessary documentation is signed and handed over for listing.</p>
                                </div>
                                <div style={{width: "280px", padding: "20px", border: "1px solid #eee", borderRadius: "10px", boxShadow: "0 .5rem 1rem rgb(0 0 0 / .15)"}}>
                                    <i className="ri-home-7-line" style={{color: "#001F3F", fontSize: "2rem", margin: "1rem"}}></i>
                                    <h4 style={{color: "#333", fontWeight: "650", margin: "0px"}}>PROPERTY VISITS</h4>
                                    <p style={{color: "#727272", fontWeight: "600", margin: "0px"}}>One of our property representatives will visit the property to take a description and photos.</p>
                                </div>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent:"center", flexDirection: "column", gap: "2rem"}}>
                                <div style={{width: "280px", padding: "20px", border: "1px solid #eee", borderRadius: "10px", boxShadow: "0 .5rem 1rem rgb(0 0 0 / .15)"}}>
                                    <i className="ri-volume-up-fill" style={{color: "#001F3F", fontSize: "2rem", margin: "1rem"}}></i>
                                    <h4 style={{color: "#333", fontWeight: "650", margin: "0px"}}>MARKETING</h4>
                                    <p style={{color: "#727272", fontWeight: "600", margin: "0px"}}>Our in-house marketing team lists the property on multi-channel portals.</p>
                                </div>
                                <div style={{width: "280px", padding: "20px", border: "1px solid #eee", borderRadius: "10px", boxShadow: "0 .5rem 1rem rgb(0 0 0 / .15)"}}>
                                    <i className="ri-live-line" style={{color: "#001F3F", fontSize: "2rem", margin: "1rem"}}></i>
                                    <h4 style={{color: "#333", fontWeight: "650", margin: "0px"}}>VISUALIZATION</h4>
                                    <p style={{color: "#727272", fontWeight: "600", margin: "0px"}}>When viewings are arranged, our property expert will show the property to a potential tenant/buyer.</p>
                                </div>
                                <div style={{width: "280px", padding: "20px", border: "1px solid #eee", borderRadius: "10px", boxShadow: "0 .5rem 1rem rgb(0 0 0 / .15)"}}>
                                    <i className="ri-community-line" style={{color: "#001F3F", fontSize: "2rem", margin: "1rem"}}></i>
                                    <h4 style={{color: "#333", fontWeight: "650", margin: "0px"}}>SELL/RENT</h4>
                                    <p style={{color: "#727272", fontWeight: "600", margin: "0px"}}>And will guide you through the process relieving the owner of any related stress.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "4rem", width: "60%", flexDirection: windowSize >= 1200 ? "row" : "column"}}>
                        <div>
                            <img src="https://www.tanamiproperties.com/images/pro-manage.webp" width="300" />
                        </div>
                        <div>
                            <h4 style={{color: "#333"}}>WE MANAGE EACH PROPERTY AS IF IT WERE OUR OWN. SELLING/RENTING YOUR PROPERTY, WE MAKE SURE YOU WILL GET THE FOLLOWING:</h4>
                            <ul>
                                <li style={{color: "#727272"}}>
                                    <i style={{color: "#FFD700", marginRight: "10px"}} className="ri-focus-line"></i>
                                    A solid database of qualified prospects
                                </li>
                                <li style={{color: "#727272"}}>
                                    <i style={{color: "#FFD700", marginRight: "10px"}} className="ri-focus-line"></i>
                                    A higher occupancy rate
                                </li>
                                <li style={{color: "#727272"}}>
                                    <i style={{color: "#FFD700", marginRight: "10px"}} className="ri-focus-line"></i>
                                    Property management services
                                </li>
                                <li style={{color: "#727272"}}>
                                    <i style={{color: "#FFD700", marginRight: "10px"}} className="ri-focus-line"></i>
                                    Holiday home services
                                </li>
                                <li style={{color: "#727272"}}>
                                    <i style={{color: "#FFD700", marginRight: "10px"}} className="ri-focus-line"></i>
                                    Finance department
                                </li>
                                <li style={{color: "#727272"}}>
                                    <i style={{color: "#FFD700", marginRight: "10px"}} className="ri-focus-line"></i>
                                    Best Marketing Platforms
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}