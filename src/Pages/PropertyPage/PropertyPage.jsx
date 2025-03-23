import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import PropertyPageNavBar from "../components/PropertyPageNavBar";
import Overview from "./Overview/Overview";
import Amenities from "./Amenities/Amenities";
import Payment from "./Payment/Payment";
import Floor from "./Floor/Floor";
import Location from "./Location/Location";
import Master from "./Master/Master"
import GetInTouch from "./GetInTouch/GetInTouch";
import Property from "../components/Property";
import PropertiesPageMainNavigationBar from "../components/PropertiesPageMainNavigationBar";
function ShowMenu() {
    if (document.querySelector("#propMobileMenu").style.transform === "translateY(-250px)") {
        document.querySelector("#propMobileMenu").style.transform = "translateX(0px)"
    } else {
        document.querySelector("#propMobileMenu").style.transform = "translateY(-250px)"
    }
}

export default function PropertyPage() {
    const  propertyTitle  = useParams().propertyTitle;
    const [property, setProperty] = useState([])
    const [page, setPage] = useState("overview")
    const [developer, setDeveloper] = useState([]);
    const [recommandedProperties, setRecommandedProperties] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth);

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
        window.scrollTo({ top: "0" })
    }, [page])
    
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
        <div style={{overflowX: "hidden", width: "100%"}}>
            <div style={{scrollBehavior: "smooth", overflow: "hidden", width: "100%"}}>
                {
                    windowSize >= 800 && <PropertiesPageMainNavigationBar />
                }
                { windowSize >= 800 && <PropertyPageNavBar page={page} setPage={setPage} logo={developer.logo} />}
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
                { property.images !== undefined && 
                    <div className='services-title-container' style={{backgroundImage: `url(/api/file/${JSON.parse(property.images.replace("{", "[").replace("}","]"))[0]})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "600px" }}>
                        <h1 style={{textWrap: "wrap", width: "80%", textAlign: "center"}}>{property.title} - {developer.name}</h1>
                        <ul>
                            <li>Home</li>
                            <li>/</li>
                            <li>{property.title}</li>
                        </ul>
                    </div>
                }
                <div style={{display: "flex",flexDirection: windowSize >= 800 ? "row": "column", alignItems: windowSize >= 800 ? "stretch" : "center", justifyContent: "space-around", scrollBehavior: "smooth", width: "100%"}}>
                    <div style={{width: windowSize >= 800 ? "75%" : "100%", scrollBehavior: "smooth"}}>
                        { page === "overview" && <Overview property={property} developer={developer}/> }
                        { page === "amenities" && <Amenities property={property} /> }
                        { page === "payment" && <Payment property={property} /> }
                        { page === "floor" && <Floor property={property} /> }
                        { page === "location" && <Location property={property} /> }
                        { page === "master" && <Master property={property} /> }
                    </div>
                    <div style={{width: windowSize >= 800 ? "23%" : "90%", position: "relative"}}>
                        <div style={{position: "sticky", top: "120px", marginBottom: "50px", transform: windowSize <= 800 ? "scale(.7)": "translateY(-100px)", zIndex: 10}}>
                            <GetInTouch />
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "50px", transform: windowSize <= 800 && "scale(.7)"}}>
                    <fieldset style={{width: "95%", border: "1px solid #ccc", borderRadius: "10px"}}>
                        <legend style={{textAlign: "center", padding: "0px 20px"}}>
                            <h2 style={{fontWeight: "500"}}>More Projects of <span style={{color: "#bb9f00", fontWeight: "600"}}>{developer.name}</span></h2>

                        </legend>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "3rem"}}>
                            {
                                recommandedProperties.slice(0, 4).map((prop, index) => (
                                    <div key={index}>
                                        <Property data={prop}/>
                                    </div>
                                ))
                            }
                        </div>
                    </fieldset>
                </div>
            </div>
            <Footer />
        </div>
    )
}