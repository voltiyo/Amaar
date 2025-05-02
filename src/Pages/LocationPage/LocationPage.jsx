import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import "../Offplan/Offplan.css"
import { useEffect, useState } from "react";
import Property from "../components/Property";

export default function LocationPage() {
    const { loca } = useParams();
    const [location, setLocation] = useState([])

    useEffect(() => {
        async function getLoca() {
            const response = await fetch("/api/location", {
                method: "POST", 
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({location: loca}),
            });
            const data = await response.json();
            setLocation(data);
        }
        getLoca();
    }, [])
    
    
    return (
        <div>
            <Navbar />
            <div>
                <div className='services-title-container'>
                    <h1>{location.name}</h1>
                    <ul>
                        <li>Home</li>
                        <li>/</li>
                        <li>{location.name}</li>
                    </ul>
                </div>
                <div  style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "3rem", margin: "50px 0px"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem"}}>
                        <i className="ri-fullscreen-line" style={{fontSize: "1.5rem"}}></i>
                        <div  style={{display: "flex", alignItems: "start", justifyContent: "center", flexDirection: "column", gap: "0px"}}>
                            <small style={{textAlign: "center", color: "#727272", margin: "0px"}}>AREA</small>
                            {location.area}
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem"}}>
                        <i className="ri-aspect-ratio-line" style={{fontSize: "1.5rem"}}></i>
                        <div  style={{display: "flex", alignItems: "start", justifyContent: "center", flexDirection: "column", gap: "0px"}}>
                            <small style={{textAlign: "center", color: "#727272", margin: "0px"}}>Density</small>
                            {location.density}
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem"}}>
                        <i className="ri-team-line" style={{fontSize: "1.5rem"}}></i>
                        <div  style={{display: "flex", alignItems: "start", justifyContent: "center", flexDirection: "column", gap: "0px"}}>
                            <small style={{textAlign: "center", color: "#727272", margin: "0px"}}>Population</small>
                            {location.population}
                        </div>
                    </div>
                </div>

                <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                    <h2 style={{color: "#333"}}>About {location.name}</h2>
                    {location.description && <p style={{width: "60%", textAlign: "center", color: "#727272"}} dangerouslySetInnerHTML={{__html: location.description.replaceAll(/\n/g, "<br />")}}></p>}
                </div>

                
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                    <h2 style={{textAlign: "center", color: "#333", marginBottom: "0px"}}>{location.name} Projects</h2>
                    <h4 style={{fontWeight: "500", textAlign: "center", width: "50%", color: "#727272", marginTop: "10px"}}>Take a look at the new off-plan developments in and around {location.name} Take a look at some of the attractive investment offers.</h4>

                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-around",flexDirection: "column", gap: "3rem", width: "80%", marginBottom: "50px"}}>
                        {
                            location.projects && location.projects.slice(0, 4).map((project, index) => (
                                <div key={index}>
                                    <Property data={project}/>
                                </div>
                            ))
                        }
                    </div>
                    
                </div>

            </div>
            <Footer />
        </div>
    )
}