import { useEffect, useState } from "react";

export default function Amenities({property}) {
    const [propertyFeatues, setPropertyFeatures] = useState([])


    useEffect(() => {
        async function GetFeatures() {
            const resp = await fetch("/api/features");
            const data = await resp.json();
            setPropertyFeatures(data.filter(feat => parseInt(feat.property) === parseInt(property.id)))
        }
        GetFeatures();

    },[property])
    return (
        <div style={{padding: "20px", margin: "20px", borderRadius: "10px", border: "1px solid #eee"}}>
            <h2 style={{color: "#333"}}>Features And Amenities</h2>
            <p style={{color: "#727272"}} dangerouslySetInnerHTML={{__html: property.features_description.replaceAll(/\n/g, "<br />")}}></p>
            
            <span style={{color: "#333", fontWeight: "600"}}><br /> Key Facilities : </span>
            <ul>
                {
                    propertyFeatues.map((feature, index) => (
                        
                        <li key={index}>
                            <span style={{margin: "0px", fontWeight: "500", fontSize: ".8rem", color: "#727272", marginLeft: "10px"}}>{feature.name}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}