import NavBar from "../components/NavBar"
import React, { lazy } from "react";
import { useRef, useState, useEffect } from "react"
import "./Home.css"
const PropertiesCarousel = lazy(() => import("../components/propertiesCarousel.jsx"));
const Footer = lazy(() => import("../components/Footer.jsx"))
const Carousel = lazy(() => import("../components/Caroussel.jsx"))

export default function Home() {
    const [choice1, setchoice1] = useState(1)
    const homeContainerRef = useRef(null)
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [states, setStates] = useState([])
    const [developer, setDevelopers] = useState([])
    const [dubDevs, setDubDevs] = useState([])
    const [AbuDevs, setAbuDevs] = useState([])
    const [RAKDevs, setRAKDevs] = useState([])
    const [dubComs, setDubComs] = useState([])
    const [abuComs, setAbuComs] = useState([])
    const [RAKComs, setRAKComs] = useState([])
    const [postCommunities, setPostCommunities] = useState([]);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [properties, setProperties] = useState([])
    const [locations, setLocations] = useState([])


    const scrollToTop = () => {
        if (homeContainerRef.current) {
            homeContainerRef.current.scrollTo({ top: 0, behavior: "smooth" })
        }
    }
    useEffect(() => {
        const handleScroll = () => {
          if (homeContainerRef.current.scrollTop > 100) {
            setShowBackToTop(true);
          } else {
            setShowBackToTop(false);
          }
        };
      
        const container = homeContainerRef.current;
        container.addEventListener("scroll", handleScroll);
      
        return () => {
          container.removeEventListener("scroll", handleScroll);
        };
    }, []);


    useEffect(() => {
        async function GetStates() {
            const response = await fetch("/api/states");
            const data = await response.json();
            setStates(data);
        }
        async function GetComs() {
            const response = await fetch("/api/communities");
            const data = await response.json();
            setDubComs(data.filter(com => com.projects[0]?.state === "3"));
            setAbuComs(data.filter(com => com.projects[0]?.state === "2"));
            setRAKComs(data.filter(com => com.projects[0]?.state === "4"));
            setPostCommunities(data.sort((a,b) => a.name.localeCompare(b.name)))
        }
        async function GetDevelopers() {
            const response = await fetch("/api/developers");
            const data = await response.json();
            setDubDevs(data.filter(dev => dev.projects[0]?.state === "3"));
            setAbuDevs(data.filter(dev => dev.projects[0]?.state === "2"));
            setRAKDevs(data.filter(dev => dev.projects[0]?.state === "4"));
            setDevelopers(data);    
        }
        async function GetProperties() {
            const response = await fetch("/api/properties");
            const data = await response.json();
            setProperties(data);   
        }
        async function GetLocations() {
            const response = await fetch("/api/locations");
            const data = await response.json();
            setLocations(data);   
        }
        GetLocations();
        GetProperties();
        GetDevelopers();
        GetComs();
        GetStates();
    }, [])
    
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowSize(window.innerWidth)
          });
          
    }, [])

    return (
        <div id="home-container" ref={homeContainerRef}>
            <NavBar page={"home"} />
            <div style={{ display: "flex", justifyContent: windowSize >= 800 ? "space-around" : "center", flexDirection: windowSize >= 800 ? "row": "column", alignItems: "start", height: windowSize >= 800 ? "90vh" :  "fit-content", padding: windowSize >= 800 ? "100px 0" : "50px 0", background: "url(/banner.jpg)", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
                
                <div style={{padding: " 0px 50px", textWrap: "nowrap", width: "98%"}}>
                    <div style={{maxWidth: "450px"}}>

                        <p style={{fontSize: "1.1rem",marginTop:"0", fontWeight: "600", textWrap: "wrap", color: "#fff"}}>
                        Whether you're searching for your dream home, a thriving workspace, or a smart investment opportunity, you're in the right place. With nearly two decades of market insight, I'm here to turn your real estate goals into reality.
                        </p>
                    </div>
                    <div style={{position: "relative", width: windowSize >= 800 ? "50%" : "70%"}}>
                        <div style={{ width: "100%"}}>
                            <div style={{background: "#dfdfdf", padding: "1rem", borderRadius: "10px", marginTop: "1rem", width: "100%"}}>
                                <h4 style={{textWrap: "wrap"}}><span style={{color: "#004274"}}>WHAT ARE YOU LOOKING FOR?</span> (Easily find the house of your choice)</h4>
                                <div style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                                    <div style={{ background: choice1 === 1 ? "#004274": "#fff", color: choice1 === 1 ? "#fff" : "#000", fontWeight: "700", padding: "10px", borderRadius: "5px", cursor: "pointer", transition: "all 500ms", }} onClick={() => setchoice1(1)} onMouseOver={(e) => { e.target.style.background = "#004274", e.target.style.color = "#fff"  }} onMouseLeave={(e) => { if (choice1 !== 1) { e.target.style.background = "#fff", e.target.style.color = "#000"  }}}>
                                        Buy
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "start", alignItems: windowSize >= 800 ? "center" : "stretch", gap: "1rem", flexDirection: windowSize <= 800 ? "column" : "row" }}>
                                    <select id="home-dropdown">
                                        {
                                            states.slice(0, 3).map((state, index) => (
                                                <option key={index} value={state.name}>{state.name}</option>
                                                
                                            ))
                                        }
                                    </select>
                                    <input type="text" id="home-drop-input" placeholder="City Neighboorhood, Community" />
                                    <button style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", padding: "1.1rem 1rem", fontSize: "1rem", background: "#004274", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
                                        onClick={() => {
                                            window.location.href = `/Offplan-projects/${document.querySelector("#home-dropdown").value}/${document.querySelector("#home-drop-input").value.replaceAll(" ", "-")}`
                                        }}
                                    >
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                        Search
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div style={{height: "fit-content", display: "flex", paddingLeft: "30px", alignItems: "start",justifyContent: "start" ,paddingBottom: "50px", background: "#e5e5e5"}}>
                <div style={{ margin: "0", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start", width: "100%"}} >
                    <div style={{marginTop: "3rem", marginBottom: "1rem"}}>
                        <h1 style={{color: "#2b3b3a", margin: "0px"}}>Off Plan Projects</h1>
                        <p style={{color: "rgb(0 0 0 / .5)", marginTop: "0px"}}>Select Your Desired City</p>
                    </div>
                    <div style={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center", gap: windowSize >= 800 ? "3rem" : "0rem", flexWrap: "wrap", rowGap: "50px" }}> 
                        {
                            states.slice(0,3).map((state, index) => {
                                return (
                                <div style={{width: windowSize >= 800 ? "30%" : "80%", height: "350px"}} key={index} className="property-card">
                                    <a href={`/Offplan-projects/${state.name.replaceAll(" ", "-")}`} style={{textDecoration: "none", position: "relative", height: "100%", width: "100%",borderRadius: "10px"}}>
                                        <div style={{overflow: "hidden", height: "100%", borderRadius: "10px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <img src={`/api/file/${state.image}`} alt="" style={{minHeight: "100%", objectFit: "cover"}}/>
                                            <div style={{opacity: "0.9", background: "#004274", position: "absolute", bottom: "0", width: "100%", textAlign: "center", color: "#fff"}}>
                                                <p style={{fontWeight: "600"}}>{state.propCount} + Properties</p>
                                            </div>
                                        </div>
                                    </a>
                                    <h3 style={{textAlign: "center", fontWeight: "600", textTransform: "uppercase"}}>{state.name}</h3>
                                </div>
                            )
                            }
                            )
                        }
                    </div>
                </div>

            </div>

            <div>
                <div style={{padding: "2rem"}}>
                    <div style={{ marginLeft: "4rem"}}> 
                        <h2 style={{color: "#2b3b3a", fontWeight: "700", marginBottom: "0px"}}>New developments</h2>
                        <h4 style={{color: "rgb(0 0 0 / .5)", fontWeight: "500", marginTop: "0px"}}>Take a look at new off-plan developments in and around Dubai</h4>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <PropertiesCarousel properties={properties} developers={developer} locations={locations} />
                    </div>
                </div>
            </div>
            <div>
                <div style={{padding: "2rem"}}>
                    <div style={{ marginLeft: "4rem"}}> 
                        <h2 style={{color: "#2b3b3a", fontWeight: "700", marginBottom: "0px"}}>Browse by property type</h2>
                        <h4 style={{color: "rgb(0 0 0 / .5)", fontWeight: "500", marginTop: "0px"}}>Handpicked projects for you</h4>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Carousel elements={Object.entries(Object.groupBy(properties, prop => prop.type))} />
                    </div>
                </div>
            </div>
            <div id="back-to-top" style={{transition: "all 500ms",position: "fixed", bottom: "15%", right: "2%",padding: "10px 15px", borderRadius: "5px", backgroundColor: "#004274", cursor: "pointer", transform: showBackToTop ? "scale(1)": "scale(0)", zIndex: "90"}} onClick={scrollToTop}>
                <i className="fa-solid fa-caret-up" style={{color: "#fff"}}></i>

            </div>
            <div style={{display: "flex", flexDirection: "column",gap: "5rem", justifyContent: "center", alignItems: "center",width: "90%", padding: "5%"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center",flexDirection: windowSize >= 800 ? "row" : "column", gap: "3rem", placeSelf: "start", width: "100%"}}>
                    <div style={{width: "50%"}}>
                        <img src="/services.jpg" alt="" style={{width: "100%", borderRadius: "10px"}}/>
                    </div>
                    <div>
                        <h1 style={{textWrap: "wrap", maxWidth: "332px", color: "#2b3b3a", margin: "0px", marginBottom: windowSize >= 800 && "15px", fontSize: windowSize >= 800 ? "" : "18px"}}>Get in Touch and Find Our Services</h1>
                        
                        <a href="/Services">
                        <button style={{
                            background: "#004274",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            transition: "all 500ms",
                            fontSize: "1.25rem"
                        }} >
                            Find More
                        </button></a>
                    </div>
                </div>
                
                
            </div>


            <div style={{width: "100%", position: "relative", marginBottom: "100px"}}>
                <div style={{padding: "2rem"}}>
                    <div style={{ marginLeft: windowSize >= 800 && "4rem"}}> 
                        <h2 style={{color: "#2b3b3a", fontWeight: "700", marginBottom: "0px"}}>Top Developers in UAE</h2>
                        <h4 style={{color: "rgb(0 0 0 / .5)", fontWeight: "500", marginTop: "0px"}}>Real Estate in Popular Developers</h4>
                    </div>
                    <div style={{display: windowSize >= 800 ? "grid" : "flex", flexDirection: "column", flexWrap: "wrap", gap: "1rem", padding: "1rem", gridTemplateColumns: "repeat(4, 1fr)", width: "95%", marginLeft: windowSize >= 800 && "3rem", boxShadow: " 0 1px 4px 0 rgb(153 154 155 / 42%)", zIndex: "10", background: "#fff", borderRadius: "8px"}}>
                        {
                            dubDevs && dubDevs.sort((a,b) => { return b.projects.length -  a.projects.length }).slice(0, 4).map((property, index) => {
                                
                                return (
                                    <a href={`/Developer/${property.name.replaceAll(" ", "-")}`} key={index} style={{textDecoration: "none"}}>
                                        <div style={{display: "flex",gap: "1rem", alignItems: "center", justifyContent: "start", width: "70%"}}>
                                            <div style={{border: "1px solid #dee2e6", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"}}>    
                                                <img src={"/api/file/" + property.logo} alt="" style={{width: "100px", maxHeight: "80px"}}/>
                                            </div>
                                            <div>
                                                <h4 style={{margin: "0px", color: "#2b3b3a"}}>
                                                    {property.name}
                                                </h4>
                                                <small style={{margin: "0px", color: "#6c757d "}}>{property.projects.length}</small>
                                            </div>
                                        </div>
                                    </a>
                                )
                            })
                        }
                        {
                            AbuDevs && AbuDevs.sort((a,b) => { return b.projects.length -  a.projects.length }).slice(0, 4).map((property, index) => {
                                
                                return (
                                    <a href={`/Developer/${property.name.replaceAll(" ", "-")}`} key={index} style={{textDecoration: "none"}}>
                                        <div style={{display: "flex",gap: "1rem", alignItems: "center", justifyContent: "start", width: "70%"}}>
                                            <div style={{border: "1px solid #dee2e6", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"}}>    
                                                <img src={"/api/file/" + property.logo} alt="" style={{width: "100px", maxHeight: "80px"}}/>
                                            </div>
                                            <div>
                                                <h4 style={{margin: "0px", color: "#2b3b3a"}}>
                                                    {property.name}
                                                </h4>
                                                <small style={{margin: "0px", color: "#6c757d "}}>{property.projects.length}</small>
                                            </div>
                                        </div>
                                    </a>
                                )
                            })
                        }
                        {
                            RAKDevs && RAKDevs.sort((a,b) => { return b.projects.length -  a.projects.length }).slice(0, 4).map((property, index) => {
                                
                                return (
                                    <a href={`/Developer/${property.name.replaceAll(" ", "-")}`} key={index} style={{textDecoration: "none"}}>
                                        <div style={{display: "flex",gap: "1rem", alignItems: "center", justifyContent: "start", width: "70%"}}>
                                            <div style={{border: "1px solid #dee2e6", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"}}>    
                                                <img src={"/api/file/" + property.logo} alt="" style={{width: "100px", maxHeight: "80px"}}/>
                                            </div>
                                            <div>
                                                <h4 style={{margin: "0px", color: "#2b3b3a"}}>
                                                    {property.name}
                                                </h4>
                                                <small style={{margin: "0px", color: "#6c757d "}}>{property.projects.length}</small>
                                            </div>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            



            <div style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", marginBottom: "200px"}}>

                
                <div style={{display: "flex", alignItems: "center", justifyContent: "center",flexDirection: "column", width: "100%"}}>
                    <div style={{}}> 
                        <h2 style={{color: "#2b3b3a", fontWeight: "700", marginBottom: "0px"}}>Top Communities in UAE</h2>
                        <h4 style={{color: "rgb(0 0 0 / .5)", fontWeight: "500", marginTop: "0px"}}>Check out the top Communities</h4>
                    </div>
                    <div style={{display: windowSize >= 800 ? "grid" : "flex", flexDirection: "row", flexWrap: "wrap", gridTemplateColumns: "repeat(6, 1fr)",maxWidth: windowSize >= 800 && "80%",placeSelf: "center",justifyContent: "center",alignItems: "center", gap: "1.5rem", marginBottom: "50px", width: "100%"}}>
                        {
                            dubComs && dubComs.sort((a,b) => a.name.localeCompare(b.name)).slice(0, 6).map((community, index) => {
                                return (
                                    <a href={`/community/${community.name.replaceAll(" ", "-")}`}>
                                        <div key={index} style={{backgroundImage: `url(/api/file/${community.image}`, width: "166px", height: "133px", position: "relative", borderRadius: "10px", backgroundSize: "cover", marginBottom: "20px"}}>
                                            <h3 style={{position: "absolute", bottom: "10px", fontWeight: "600", background: "#004274", color: "#fff", borderRadius: "0px 25px 25px 0px", padding: "5px 7px", fontSize: "0.85rem", maxWidth: "80%"}} className="line-clamp-1">{community.name}</h3>
                                        </div>
                                    </a>
                                )
                            })
                        }
                        {
                            abuComs && abuComs.sort((a,b) => a.name.localeCompare(b.name)).slice(0, 8).map((community, index) => {
                                return (
                                    <a href={`/community/${community.name.replaceAll(" ", "-")}`}>
                                        <div key={index} style={{backgroundImage: `url(/api/file/${community.image}`, width: "166px", height: "133px", position: "relative", borderRadius: "10px", backgroundSize: "cover", marginBottom: "20px"}}>
                                            <h3 style={{position: "absolute", bottom: "10px", fontWeight: "600", background: "#004274", color: "#fff", borderRadius: "0px 25px 25px 0px", padding: "5px 7px", fontSize: "0.85rem", maxWidth: "80%"}} className="line-clamp-1">{community.name}</h3>
                                        </div>
                                    </a>
                                )
                            })
                        }
                        {
                            RAKComs && RAKComs.sort((a,b) => a.name.localeCompare(b.name)).slice(0, 6).map((community, index) => {
                                return (
                                    <a href={`/community/${community.name.replaceAll(" ", "-")}`}>
                                        <div key={index} style={{backgroundImage: `url(/api/file/${community.image}`, width: "166px", height: "133px", position: "relative", borderRadius: "10px", backgroundSize: "cover", marginBottom: "20px"}}>
                                            <h3 style={{position: "absolute", bottom: "10px", fontWeight: "600", background: "#004274", color: "#fff", borderRadius: "0px 25px 25px 0px", padding: "5px 7px", fontSize: "0.85rem", maxWidth: "80%"}} className="line-clamp-1">{community.name}</h3>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>

                </div>
                
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%"}}>
                    <div style={{width:"90%", textWrap: "nowrap", display:"flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexWrap: "wrap"}}>
                        {
                            postCommunities.map((postCom, index) => {
                                return (
                                    <a className="postCommunityAelement" href={`/community/${postCom.name.replaceAll(" ", "-")}`} key={index} style={{textDecoration: "none",padding: "6px 15px", color: "#757575"}}>
                                        {postCom.name}
                                    </a>
                                )
                            })
                        }
                    </div>
                    <a href="/Communities" style={{ textDecoration: "none", color: "#004274", marginTop: "25px"}}>Explore more</a>
                </div>

            </div>

            <Footer />
            <div style={{color: "#ccc", background: "#004274", textAlign: "center", padding: "25px"}}>
                @ Copyright 2025 <strong>Amaar Asaad</strong> - All Rights Reserved.
            </div>
        </div>
    )
}