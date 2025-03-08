import "./Offplan.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Filter from "../components/Filter"
import { useEffect, useState } from "react";
import Search from "../components/Search";
import Property from "../components/Property";
import { useParams } from "react-router-dom";




export default function Offplan() {
    const [properties, setProperties] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const { country } = useParams()
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const itemsPerPage = 10;

    const totalPages = Math.ceil(properties.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProperties = properties.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.innerWidth)
        })
    }, [])


    useEffect(() => {
        
        async function GetProperties() {
            const response = await fetch("/api/properties");
            const data = await response.json();
            setProperties( data );
        }
        async function GetPropertiesByCity() {
            const response = await fetch("/api/propertiesIn/" + country);
            const data = await response.json();
            setProperties( data );
        }


        if (country) {
            GetPropertiesByCity()
        } else {
            GetProperties()
        }
    },[])

    useEffect(() => {
        window.scrollTo({ top: 300, behavior: "smooth" });
    },[currentPage])
    
    return (
        <div>
            <NavBar page={"offplan"}/>
            <div>
                <div className='services-title-container'>
                    <h1>Offplan Projects {country ? `in ${country}` : ""}</h1>
                    <ul>
                        <li>Home</li>
                        <li>/</li>
                        <li>Offplan Projects</li>
                    </ul>
                </div>
                <div style={{display: "flex", justifyContent: "center", padding: "2rem", gap: "1rem", flexWrap: "wrap"}}>
                    <div className="section-redirect active" style={{color: "#001F3F", display: "flex", flexDirection: "column", alignItems: "center", background: "white", padding: "1rem 1.5rem",borderRadius: "25px" , border: "1px solid #001F3F", cursor: "pointer"}}>
                        <i className="ri-building-line" style={{fontSize: "3rem"}}></i>
                        <p style={{fontSize: "1.25rem", fontWeight: "600", margin: "0px"}}>Projects</p>
                    </div>
                    <div className="section-redirect" style={{color: "#001F3F", display: "flex", flexDirection: "column", alignItems: "center", background: "white", padding: "1rem 1.5rem",borderRadius: "25px" , border: "1px solid #001F3F", cursor: "pointer"}}  onClick={() => window.location.href = "/Developers"}>
                        <i className="ri-building-4-line" style={{fontSize: "3rem"}}></i>
                        <p style={{fontSize: "1.25rem", fontWeight: "600", margin: "0px"}}>Developers</p>
                    </div>
                    <div className="section-redirect" style={{color: "#001F3F", display: "flex", flexDirection: "column", alignItems: "center", background: "white", padding: "1rem 1.5rem",borderRadius: "25px" , border: "1px solid #001F3F", cursor: "pointer"}}  onClick={() => window.location.href = "/Communities"}>
                        <i className="ri-community-line" style={{fontSize: "3rem"}}></i>
                        <p style={{fontSize: "1.25rem", fontWeight: "600", margin: "0px"}}>Community</p>
                    </div>
                    <div className="section-redirect" style={{color: "#001F3F", display: "flex", flexDirection: "column", alignItems: "center", background: "white", padding: "1rem 1.5rem",borderRadius: "25px" , border: "1px solid #001F3F", cursor: "pointer"}}  onClick={() => window.location.href = "/Locations"}>
                        <i className="ri-map-pin-line" style={{fontSize: "3rem"}}></i>
                        <p style={{fontSize: "1.25rem", fontWeight: "600", margin: "0px"}}>Location</p>
                    </div>
                </div>


                <div style={{display: "flex", justifyContent: "center", padding: screenWidth >= 800 ? "2rem" : ".5rem", gap: "3rem", flexDirection: screenWidth >= 800 ? "row" : "column"}} >
                    
                    <div style={{width: screenWidth >= 800 ? "25%" : "100%", transform: screenWidth <= 800 && "scale(.8)"}}>
                        <Filter />
                    </div>
                    <div style={{width: screenWidth >= 800 ? "60%" : "100%", transform: screenWidth <= 800 && "scale(.8)", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start"}}>
                        <h4>Offplan Properties ({properties.length})</h4>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(248,249,250) ", border: "1px solid #dee2e6", padding: "20px ", borderRadius: "10px"}}>
                            <div >
                                <select defaultValue={"Sort By"} style={{outline: "none", border: "1px solid #dee2e6", cursor: "pointer", padding: "10px", fontSize: "1rem", borderRadius: "5px"}}>
                                    <option value="Sort By">Sort By</option>
                                    <option value="Newest">Newest</option>
                                    <option value="Oldest">Oldest</option>
                                    <option value="Price High to Low">Price High to Low</option>
                                    <option value="Price Low to High">Price Low to High</option>
                                </select>
                            </div>
                            <Search data={properties}/>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px", marginTop: "50px", width: "100%"}}>
                            {
                                paginatedProperties && paginatedProperties.map((property, index) => {
                                    return(
                                        <Property data={property} key={index}/>
                                    )
                                })
                            }
                            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                                <button disabled={currentPage === 1} onClick={() => {setCurrentPage(currentPage - 1)}}>
                                    Previous
                                </button>
                                <span>Page {currentPage} of {totalPages}</span>
                                <button disabled={currentPage === totalPages} onClick={() => {setCurrentPage(currentPage + 1);}}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}