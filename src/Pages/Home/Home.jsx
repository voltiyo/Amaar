import NavBar from "../components/NavBar"
import { useRef, useState, useEffect } from "react"
import "./Home.css"
import PropertiesCarousel from "../components/propertiesCarousel.jsx"
import Footer from "../components/Footer.jsx"




export default function Home() {
    const [choice1, setchoice1] = useState(1)
    const homeContainerRef = useRef(null)
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [states, setStates] = useState([])
    const [communities, setCommunities] = useState([])
    const [developer, setDevelopers] = useState([])
    const [postCommunities, setPostCommunities] = useState([]);
    const [windowSize, setWindowSize] = useState(window.innerWidth);



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
            setStates(data.slice(0, 3));
        }
        async function GetComs() {
            const response = await fetch("/api/communities");
            const data = await response.json();
            setCommunities(data.slice(0, 12));    
            setPostCommunities(data.slice(12, 18))
        }
        async function GetDevelopers() {
            const response = await fetch("/api/developers");
            const data = await response.json();
            setDevelopers(data);    
        }
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
        <div id="home-container" style={{height: "100vh", overflowY: "scroll", overflowX: "hidden"}} ref={homeContainerRef}>
            <NavBar page={"home"} />
            <div style={{ display: "flex",marginBottom: windowSize >= 800 ? "" : "350px", justifyContent: windowSize >= 800 ? "space-around" : "center", flexDirection: windowSize >= 800 ? "row": "column", alignItems: "start", height: windowSize >= 800 ? "90vh" : "40vh"}}>
                
                <div style={{padding: " 0px 50px", textWrap: "nowrap"}}>
                    <div>
                        <h1 style={{marginTop: "4rem",fontSize: "2.5rem",marginBottom:"10px", fontStyle: "italic",color: "#2b3b3a", fontWeight: "500"}}><span style={{fontWeight: "700"}}>Amaar</span><br />PROPERTIES</h1>
                        <h3 style={{fontSize: "1.75rem",marginTop:"0", fontWeight: "600"}}> Find the <span className="color">perfect place</span> to <br />live <span className="color">with your</span> family </h3>
                    </div>
                    <div style={{position: "relative", width: "230%"}}>
                        <div style={{ width: "100%", position: "absolute"}}>
                            <div style={{background: "#dfdfdf", padding: "1rem", borderRadius: "10px", marginTop: "1rem"}}>
                                <h4><span style={{color: "#001F3F"}}>WHAT ARE YOU LOOKING FOR?</span> (Easily find the house of your choice)</h4>
                                <div style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                                    <div style={{ background: choice1 === 1 ? "#001F3F": "#fff", color: choice1 === 1 ? "#fff" : "#000", fontWeight: "700", padding: "10px", borderRadius: "5px", cursor: "pointer", transition: "all 500ms", }} onClick={() => setchoice1(1)} onMouseOver={(e) => { e.target.style.background = "#001F3F", e.target.style.color = "#fff"  }} onMouseLeave={(e) => { if (choice1 !== 1) { e.target.style.background = "#fff", e.target.style.color = "#000"  }}}>
                                        Buy
                                    </div>
                                    <div style={{ background: choice1 === 2 ? "#001F3F": "#fff", color: choice1 === 2 ? "#fff" : "#000", fontWeight: "700", padding: "10px", borderRadius: "5px", cursor: "pointer", transition: "all 500ms" }} onClick={() => setchoice1(2)}  onMouseOver={(e) => { e.target.style.background = "#001F3F", e.target.style.color = "#fff"  }} onMouseLeave={(e) => { if (choice1 !== 2) { e.target.style.background = "#fff", e.target.style.color = "#000"
                                    }  }}>
                                        Lease
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "1rem" }}>
                                    <select id="home-dropdown">
                                        {
                                            states.map((state, index) => (
                                                <option key={index} value={state.name}>{state.name}</option>
                                                
                                            ))
                                        }
                                    </select>
                                    <input type="text" id="home-drop-input" placeholder="City Neighboorhood, Community" />
                                    <button style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", padding: "1.1rem 1rem", fontSize: "1rem", background: "#001F3F", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
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
                {
                    windowSize >= 800 &&
                    <div style={{ height: "100%"}}>
                    <img src="/banner.webp" alt="" style={{objectFit: "cover", height: "100%", maxWidth: "641px"}}/>
                </div>}
            </div>
            <div style={{height: "fit-content", display: "flex", paddingLeft: "30px", alignItems: "start",justifyContent: "start" ,paddingBottom: "50px", background: "#e5e5e5"}}>
                <div style={{ margin: "0", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start", width: "100%"}} >
                    <div style={{marginTop: "3rem", marginBottom: "1rem"}}>
                        <h1 style={{color: "#2b3b3a", margin: "0px"}}>Offplan Projects</h1>
                        <p style={{color: "rgb(0 0 0 / .5)", marginTop: "0px"}}>New off-plan developments</p>
                    </div>
                    <div style={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center", gap: windowSize >= 800 ? "1rem" : "0rem", flexWrap: "wrap" }}> 
                        {
                            states.map((state, index) => {
                                return (
                                <div style={{ width: "261px", height: "350px", transform: windowSize >= 800 ? "" : "scale(.7)"}} key={index} className="property-card">
                                    <a href={`/Offplan-projects/${state.name.replaceAll(" ", "-")}`} style={{textDecoration: "none", position: "relative", height: "100%", width: "100%",borderRadius: "10px"}}>
                                        <div style={{overflow: "hidden", height: "100%", borderRadius: "10px", position: "relative"}}>
                                            <img src={`/api/file/${state.image}`} alt="" style={{height: "100%", objectFit: "contain"}}/>
                                            <div style={{opacity: "0.9", background: "#001F3F", position: "absolute", bottom: "0", width: "100%", textAlign: "center", color: "#fff"}}>
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
                        <PropertiesCarousel />
                    </div>
                </div>
            </div>
            <div id="back-to-top" style={{transition: "all 500ms",position: "fixed", bottom: "15%", right: "2%",padding: "10px 15px", borderRadius: "5px", backgroundColor: "#001F3F", cursor: "pointer", transform: showBackToTop ? "scale(1)": "scale(0)", zIndex: "90"}} onClick={scrollToTop}>
                <i className="fa-solid fa-caret-up" style={{color: "#fff"}}></i>

            </div>
            <div style={{display: "flex", flexDirection: "column",gap: "5rem", justifyContent: "center", alignItems: "center",width: "90%", padding: "5%"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center",flexDirection: windowSize >= 800 ? "row" : "column", gap: "3rem", placeSelf: "start", width: "100%"}}>
                    <div style={{width: "50%"}}>
                        <img src="/buy.webp" alt="" style={{width: "100%", borderRadius: "10px"}}/>
                    </div>
                    <div>
                        <small style={{color: "#6c757d", fontWeight: "700"}}>BUY A HOME</small>
                        <h1 style={{textWrap: "wrap", maxWidth: "332px", color: "#2b3b3a", margin: "0px", marginBottom: windowSize >= 800 && "15px", fontSize: windowSize >= 800 ? "" : "18px"}}>Find, Buy & Own Your Dream Home</h1>
                        {windowSize >= 800 && <p style={{color: "#757575", textWrap: "wrap", maxWidth: "332px"}}>Explore Apartments, Villas, Penthouses, Mansions and more at service.</p>}
                        <a href="/Services">
                        <button style={{
                            background: "#001F3F",
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
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "3rem", placeSelf: "end",flexDirection: windowSize >= 800 ? "row" : "column-reverse"}}>
                    
                    <div style={{textAlign: "right"}}>
                        <small style={{color: "#6c757d", fontWeight: "700"}}>RENT A HOME</small>
                        <h1 style={{textWrap: "wrap", maxWidth: "332px", color: "#2b3b3a", marginBottom: windowSize >= 800 && "15px", fontSize: windowSize >= 800 ? "" : "18px"}}>Rental Homes for Everyone</h1>

                        {windowSize >= 800 &&
                            <p style={{color: "#757575", textWrap: "wrap", maxWidth: "332px"}}>
                            The key selection of refined lifestyle, where you will find an exclusive collection of rental properties.
                        </p>}
                        <a href="/Services">
                        <button style={{
                            background: "#001F3F",
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
                    <div style={{width: "50%"}}>
                        <img src="/rent.webp" alt="" style={{width: "100%", borderRadius: "10px"}}/>
                    </div>
                </div>
                
            </div>


            <div style={{width: "100%", position: "relative", marginBottom: "100px"}}>
                <div style={{padding: "2rem"}}>
                    <div style={{ marginLeft: "4rem"}}> 
                        <h2 style={{color: "#2b3b3a", fontWeight: "700", marginBottom: "0px"}}>Top Developers in UAE</h2>
                        <h4 style={{color: "rgb(0 0 0 / .5)", fontWeight: "500", marginTop: "0px"}}>Real Estate in Popular Developers</h4>
                    </div>
                    <div style={{display: "grid", gap: "1rem", padding: "1rem", gridTemplateColumns: "repeat(3, 1fr)", width: "80%", marginLeft: "3rem", boxShadow: " 0 1px 4px 0 rgb(153 154 155 / 42%)", zIndex: "10", background: "#fff", borderRadius: "8px"}}>
                        {
                            developer && developer.sort((a,b) => { return b.projects.length -  a.projects.length }).slice(0, 6).map((property, index) => {
                                
                                return (
                                    <a href={`/Developer/${property.name.replaceAll(" ", "-")}`} key={index} style={{textDecoration: "none"}}>
                                        <div style={{display: "flex",gap: "1rem", alignItems: "center", justifyContent: "start", width: "70%"}}>
                                            <div style={{border: "1px solid #dee2e6"}}>
                                                <img src={"/api/file/" + property.logo} alt="" style={{width: "100px"}}/>
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
                {windowSize >= 800 &&   
                    <div style={{position: "absolute", right: "5%", top: "0px", overflow: "hidden", borderRadius: "7px", width:"261px", height:"350px", zIndex: "-50"}}>
                    <img src="/dev_bg.webp" alt="" style={{objectFit: "contain"}}/>
                </div>}
            </div>
            



            <div style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", marginBottom: "200px"}}>

                
                <div style={{display: "flex", alignItems: "center", justifyContent: "center",flexDirection: "column", width: "100%"}}>
                    <div style={{}}> 
                        <h2 style={{color: "#2b3b3a", fontWeight: "700", marginBottom: "0px"}}>Top Communities in UAE</h2>
                        <h4 style={{color: "rgb(0 0 0 / .5)", fontWeight: "500", marginTop: "0px"}}>Check out the top Communities</h4>
                    </div>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)",maxWidth: "80%",placeSelf: "center",justifyContent: "center",alignItems: "center", gap: "1.5rem", marginBottom: "50px"}}>
                        {
                            communities.map((community, index) => {
                                return (
                                    <a href={`/community/${community.name.replaceAll(" ", "-")}`}>
                                        <div key={index} style={{backgroundImage: `url(/api/file/${community.image}`, width: "166px", height: "133px", position: "relative", borderRadius: "10px", backgroundSize: "cover", marginBottom: "20px"}}>
                                            <h3 style={{position: "absolute", bottom: "10px", fontWeight: "600", background: "#001F3F", color: "#fff", borderRadius: "0px 25px 25px 0px", padding: "5px 7px", fontSize: "0.85rem", maxWidth: "80%"}} className="line-clamp-1">{community.name}</h3>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>

                </div>
                
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%"}}>
                    <div style={{width:"70%", textWrap: "nowrap", display:"flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexWrap: "wrap"}}>
                        {
                            postCommunities.map((postCom, index) => {
                                return (
                                    <a className="postCommunityAelement" href={`/community/${postCom.name.replaceAll(" ", "-")}`} key={index} style={{textDecoration: "none",padding: "6px 15px", borderRadius: "50px",color: "#757575" , border: "1px solid #fff", boxShadow: " 0 0 7px 0 #0000001f"}}>
                                        {postCom.name}
                                    </a>
                                )
                            })
                        }
                    </div>
                    <a href="/Communities" style={{ textDecoration: "none", color: "#001F3F", marginTop: "25px"}}>Explore more</a>
                </div>

            </div>

            <Footer />
            <div style={{color: "#ccc", background: "#001F3F", textAlign: "center", padding: "25px"}}>
                @ Copyright 2025 <strong>Amaar Properties</strong> - All Rights Reserved.
            </div>
        </div>
    )
}