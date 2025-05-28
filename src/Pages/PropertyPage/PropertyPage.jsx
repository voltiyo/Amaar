import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import PropertyPageNavBar from "../components/PropertyPageNavBar";
import { lazy, Suspense } from 'react';
const Overview = lazy(() => import('./Overview/Overview'));
const Amenities = lazy(() => import('./Amenities/Amenities'));
const Payment = lazy(() => import('./Payment/Payment'));
const Floor = lazy(() => import('./Floor/Floor'));
const Location = lazy(() => import('./Location/Location'));
const Master = lazy(() => import('./Master/Master'));
const BrochureDownload = lazy(() => import('./Download/BrochureDownload'));
import GetInTouch from "./GetInTouch/GetInTouch";
import PropertiesPageMainNavigationBar from "../components/PropertiesPageMainNavigationBar";
import "./PropertyPage.css"

function ShowMenu() {
    if (document.querySelector("#propMobileMenu").style.transform === "translateY(-250px)") {
        document.querySelector("#propMobileMenu").style.transform = "translateX(0px)"
    } else {
        document.querySelector("#propMobileMenu").style.transform = "translateY(-250px)"
    }
}

export default function PropertyPage() {
    const [pdf, setPdf] = useState("floor")
    const [MainPage, setMainPage] = useState("1")
    const  propertyTitle  = useParams().propertyTitle;
    const [property, setProperty] = useState([])
    const [page, setPage] = useState("overview")
    const [developer, setDeveloper] = useState([]);
    const [recommandedProperties, setRecommandedProperties] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [countries , setCountries] = useState([])
    useEffect(() => {
        async function GetCountries() {
            const response = await fetch("https://countriesnow.space/api/v0.1/countries/codes")
            const data = await response.json()
            setCountries(data.data)
        }
        GetCountries();
    }, [])
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth);
        })
    }, [])
    useEffect(() => {
        async function GetProperty() {
            const response = await fetch("/api/property", {
                method: "POST",
                headers : {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({ propertyTitle })
            })
            const data = await response.json();
            setProperty(data)
        } 
        GetProperty();
    }, [])

    useEffect(() => {
        windowSize >= 800 && window.scrollTo({top: "0", behavior: "smooth"})
    }, [page, MainPage])
    
    useEffect(() => {
        async function GetDev() {
            const response = await fetch("/api/developerId", {
                method: "POST",
                headers : {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({ developer_id: property.developer_id })
            })
            const data = await response.json();
            
            setDeveloper(data)
        } 
        if (property.developer_id) {
            GetDev();
        }
    }, [property])

    useEffect(() => {
        if (windowSize <= 800) {
            document.querySelector("#propMobileMenu").style.transform = "translateY(-250px)"
        }
    }, [page])
    
    useEffect(() => {
        async function getRecommandedProps() {
            const response = await fetch("/api/devReco/" + property.developer_id + "/" + "0")
            const data = await response.json();
            
            setRecommandedProperties(data)
        } 
        if (property.developer_id) {
            getRecommandedProps();
        }
    }, [property])
    
    


    return (
        <div style={{overflowX: "hidden", width: "100%", marginTop: "-10vh"}}>
            <div style={{scrollBehavior: "smooth", overflow: "hidden", width: "100%"}}>
                {
                    windowSize >= 800 && <PropertiesPageMainNavigationBar />
                }
                { windowSize >= 800 && <PropertyPageNavBar page={page} setPage={setPage} logo={developer.logo} setMainPage={setMainPage} />}
                {windowSize <= 800 && (
                    <div style={{background: "white", height: "40px", zIndex: "70", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px"}}>
                        <img src={`/api/file/${developer.logo}`} style={{width: "20%"}} />
                        <div onClick={ShowMenu}>
                            <i className="fa fa-bars"></i>
                        </div>
                    </div>
                )}
                {
                    windowSize <= 800 && (
                        <div id="propMobileMenu" style={{ transition: "all .5s", transform: "translateY(-250px)", placeSelf: "end", position: "absolute", right: "0px", fontWeight: "600", top: "59px", borderRadius: "0 0 10px 10px", color: "#000", zIndex: "60", background: "#eee", padding: "10px 20px", width: "fit-content"}}>
                            <p onClick={() => { setPage("overview") }} style={{color: page === "overview" ? "#000" : "#727272", transition: "all .5s"}}>Overview</p>
                            <p onClick={() => { setPage("amenities") }} style={{color: page === "amenities" ? "#000" : "#727272", transition: "all .5s"}}>Amenities</p>
                            <p onClick={() => { setPage("payment") }} style={{color: page === "payment" ? "#000" : "#727272", transition: "all .5s"}}>Payment Plan</p>
                            <p onClick={() => { setPage("floor") }} style={{color: page === "floor" ? "#000" : "#727272", transition: "all .5s"}}>Floor Plan</p>
                            <p onClick={() => { setPage("location") }} style={{color: page === "location" ? "#000" : "#727272", transition: "all .5s"}}>Location Map</p>
                            <p onClick={() => { setPage("master") }} style={{color: page === "master" ? "#000" : "#727272", transition: "all .5s"}}>Master Plan</p>
                        </div>
                    )
                }
                { property.images !== undefined && MainPage === "1" && 
                    <div className='services-title-container' style={{backgroundImage: `url(/api/file/${JSON.parse(property.images.replace("{", "[").replace("}","]"))[0]})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "600px" }}>
                        <h1 style={{textWrap: "wrap", width: "80%", textAlign: "center"}}>{property.title} - {developer.name}</h1>
                        <ul>
                            <li>Home</li>
                            <li>/</li>
                            <li>{property.title}</li>
                        </ul>
                    </div>
                }
                {MainPage === "1" && <div style={{display: "flex",flexDirection: windowSize >= 800 ? "row": "column", alignItems: windowSize >= 800 ? "stretch" : "center", justifyContent: "space-around", scrollBehavior: "smooth", width: "100%"}}>
                    <div style={{width: windowSize >= 800 ? "75%" : "100%", scrollBehavior: "smooth"}}>
                        <Suspense fallback={<div>Loading...</div>}>
                            {page === "overview" && <Overview property={property} developer={developer} setPage={setPage} setPdf={setPdf} setMainPage={setMainPage} />}
                            {page === "amenities" && <Amenities property={property} />}
                            {page === "payment" && <Payment property={property} />}
                            {page === "floor" && <Floor property={property} />}
                            {page === "location" && <Location property={property} />}
                            {page === "master" && <Master property={property} />}
                        </Suspense>
                    </div>
                    <div style={{width: windowSize >= 800 ? "23%" : "90%", position: "relative"}}>
                        <div style={{position: "sticky", top: "120px", marginBottom: "50px", transform: windowSize <= 800 ? "scale(.7)": "translateY(-100px)", zIndex: 10}}>
                            <GetInTouch countries={countries} />
                        </div>
                    </div>
                </div>}
                {
                    MainPage === "2" && <BrochureDownload property={property} developer={developer} countries={countries} pdf={pdf} />
                }
                {recommandedProperties.length > 0 && MainPage === "1" && (
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", marginBottom: "50px", transform: windowSize <= 800 && "scale(.7)"}}>
                        <div style={{width: "100%", borderRadius: "10px"}}>
                            <div style={{textAlign: "center", padding: "0px 20px"}}>
                                <h2 style={{fontWeight: "500"}}>More Projects of <span style={{color: "orange", fontWeight: "600"}}>{developer.name}</span></h2>

                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center",  flexDirection: "column", gap: "20px", width: "100%"}}>
                                <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", width: "100%"}}>

                                {
                                    recommandedProperties.length > 0  && recommandedProperties.slice(0, 4).map((prop, index) => {
                                    return (
                                        <a key={index} href={`/Projects/${prop.title.replaceAll(" ", "-")}`} style={{width: windowSize >= 800 ? "20%" : "80%"}}>
                                            <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}} className="prop">
                                                <div  style={{display: "flex", width: "456px", alignItems: "start", border: "1px solid #ccc", boxShadow: "0 1px 8px 0 #ccc", flexDirection: "column", borderRadius: "10px", overflow: "hidden"}}>
                                                    <div style={{width: "100%", height: "212px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderRadius: "10px", overflow: "hidden"}}>
                                                        <img src={`/api/file/${JSON.parse(prop.images.replaceAll("{", "[").replaceAll("}", "]"))[0]}`} style={{objectFit: "cover"}} alt="" />
                                                        <div style={{position: "absolute", bottom: "20px", left: "0px", padding: "10px", background: "#004274", borderBottomRightRadius: "50px", borderTopRightRadius: "15px", color: "#fff"}}>
                                                            {developer.name}
                                                        </div>
                                                    </div>

                                                    <div style={{width: "100%", padding: "10px"}}>
                                                        <h3 style={{margin: "0px", padding: "0px", color:"#000"}}>{prop.title}</h3>
                                                        <p style={{fontWeight: "600", color:"#000"}}>
                                                            <i className="ri-hotel-bed-fill" style={{color: "#004274", marginRight: "5px"}}></i>
                                                            {prop.bedrooms}
                                                        </p>
                                                        <p style={{fontWeight: "600", color:"#000"}}>
                                                            <i className="ri-wallet-3-line" style={{color: "#004274", marginRight: "5px"}}></i>
                                                            {prop.payment_plan}
                                                        </p>
                                                        <p style={{fontWeight: "600", color:"#000"}}>
                                                            <i className="ri-calendar-2-fill" style={{color: "#004274", marginRight: "5px"}}></i>
                                                            {new Date(prop.handover).getMonth() + "-" + new Date(prop.handover).getFullYear()}
                                                        </p>
                                                        <div style={{borderTop: "1px solid #ccc", color:"#333", width: "80%", padding: "10px 0", position: "relative", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                                            <small>Price From</small>
                                                            <p style={{fontWeight: "600", margin: "5px"}}>{prop.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    )})
                                }
                                </div>
                                <a href={`/Developer/${developer.name.replaceAll(" ", "-")}`}><button style={{color: "#fff", background: "#004274", border: "none", borderRadius: "10px", padding: "10px 15px", fontSize: "1.1rem", cursor: "pointer"}}>View More</button></a>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
            <Footer />
        </div>
    )
}