import { useEffect, useState } from "react"

export default function Location({ property }) {
    const [nearbyPlaces, setNearbyPlaces] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth);
        })
    }, [])

    useEffect(() => {
        const Places = property.nearby_places?.split(",").map(place => place.trim())
        setNearbyPlaces(Places)
    }, [property])
    return (
        <div style={{padding: "20px", margin: "20px", borderRadius: "10px", border: "1px solid #eee", width: "100%"}}>
            <h2 style={{color: "#333"}}>Location</h2>
            <div style={{display: "flex", alignItems: windowSize >= 800 ? "start" : "center", justifyContent: "space-around", width: "100%", flexDirection: windowSize >= 800 ? "row": "column"}}>
                <div style={{width: "48%"}}>
                    <img src={`/api/file/${property.location_map}`} style={{width: "100%", borderRadius: "10px"}} />
                </div>
                <div style={{width: "48%"}}>
                    <p style={{color: "#727272"}} dangerouslySetInnerHTML={{__html: property.location_description?.replaceAll(/\n/g, "<br />")}}></p>
                    <br />
                    <span style={{color: "#333", fontWeight: "600"}}><br /> Nearby Places : </span>
                    <ul>
                        {
                            nearbyPlaces.map((place , index) => (
                                <li key={index} style={{fontWeight: "550", fontSize: ".85rem", marginLeft: "20px"}}>
                                    {place}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}