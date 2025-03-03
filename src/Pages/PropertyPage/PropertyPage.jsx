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
        <div>
            <div style={{scrollBehavior: "smooth"}}>
                <PropertyPageNavBar page={page} setPage={setPage} logo={developer.logo} />
                { property.images !== undefined && 
                    <div className='services-title-container' style={{backgroundImage: `url(/api/file/${JSON.parse(property.images.replace("{", "[").replace("}","]"))[0]})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "450px" }}>
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
                        <div style={{position: "sticky", top: "120px", marginBottom: "50px"}}>
                            <GetInTouch />
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "50px"}}>
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