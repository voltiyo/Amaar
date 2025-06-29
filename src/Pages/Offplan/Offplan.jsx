import "./Offplan.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Filter from "../components/Filter"
import { useEffect, useState } from "react";
import Search from "../components/Search";
import Property from "../components/Property";
import { useParams } from "react-router-dom";




export default function Offplan() {
    const [sortBy, setSortBy] = useState("")
    const [properties, setProperties] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const { country, q, type } = useParams();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const itemsPerPage = 10;
    const [totalPages, setTotalPages] = useState(Math.ceil(properties.length / itemsPerPage))
    const [paginatedProperties, setPaginatedProperties] = useState(properties.slice(0, 0 + itemsPerPage))
    const [searchTerm, setSearchTerm] = useState(q ? q.replaceAll("-", " ").toLowerCase() : "")

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
        async function GetPropertiesByType() {
            const response = await fetch("/api/properties");
            const data = await response.json();
            const typeProps = data.filter(prop => prop.type === type.replaceAll("-", " "))
            setProperties( typeProps );
        }


        if (country) {
            GetPropertiesByCity()
        }  else if (type) {
            GetPropertiesByType()
        }else {
            GetProperties()
        }
    },[])

    useEffect(() => {
        window.scrollTo({ top: 300, behavior: "smooth" });
    },[currentPage])
    

    useEffect(() => {
        if (properties.length > 0) {
            const filteredCommunity = properties?.filter(prop =>
                prop.title.toLowerCase().includes(searchTerm)
            );
            const newTotalPages = Math.ceil(filteredCommunity.length / itemsPerPage);
            const newStartIndex = (currentPage - 1) * itemsPerPage;
            const paginated = filteredCommunity.slice(newStartIndex, newStartIndex + itemsPerPage);
            
            setTotalPages(newTotalPages);
            setPaginatedProperties(paginated);
        }
    }, [properties, currentPage, searchTerm]);


    useEffect(() => {
        if (sortBy === "Newest") {
            setProperties([...properties].sort((a,b) => new Date(b.created_at) - new Date(a.created_at)))
            setCurrentPage(1)
        } else if (sortBy === "Oldest") {
            setProperties([...properties].sort((a,b) => new Date(a.created_at) - new Date(b.created_at)))
            setCurrentPage(1)
        } else if (sortBy === "Price High to Low") {
            setProperties([...properties].sort((a,b) => parseInt(b.price.replaceAll(",", "").replace("AED", "").replace("Call Us", "0")) - parseInt(a.price.replaceAll(",", "").replace("AED", "").replace("Call Us", "0"))))
            setCurrentPage(1)
        } else if (sortBy === "Price Low to High") {
            setProperties([...properties].sort((a,b) => parseInt(a.price.replaceAll(",", "").replace("AED", "").replace("Call Us", "0")) - parseInt(b.price.replaceAll(",", "").replace("AED", "").replace("Call Us", "0"))))
            setCurrentPage(1)
        }
    }, [sortBy])

    return (
        <div>
            <NavBar page={"offplan"}/>
            <div>
                <div className='services-title-container'>
                    <h1>Off Plan Projects {country ? `in ${country.replaceAll("-", " ")}` : ""}</h1>
                    <ul>
                        <li>Home</li>
                        <li>/</li>
                        <li>Off Plan Projects</li>
                    </ul>
                </div>
                <div style={{display: "flex", justifyContent: "center", padding: "2rem", gap: "1rem", flexWrap: "wrap"}}>
                    <div className="section-redirect active" style={{color: "#004274", display: "flex", flexDirection: "column", alignItems: "center", background: "white", padding: "1rem 1.5rem",borderRadius: "25px" , border: "1px solid #004274", cursor: "pointer"}}>
                        <i className="ri-building-line" style={{fontSize: "3rem"}}></i>
                        <p style={{fontSize: "1.25rem", fontWeight: "600", margin: "0px"}}>Projects</p>
                    </div>
                    <div className="section-redirect" style={{color: "#004274", display: "flex", flexDirection: "column", alignItems: "center", background: "white", padding: "1rem 1.5rem",borderRadius: "25px" , border: "1px solid #004274", cursor: "pointer"}}  onClick={() => window.location.href = "/Developers"}>
                        <i className="ri-building-4-line" style={{fontSize: "3rem"}}></i>
                        <p style={{fontSize: "1.25rem", fontWeight: "600", margin: "0px"}}>Developers</p>
                    </div>
                    <div className="section-redirect" style={{color: "#004274", display: "flex", flexDirection: "column", alignItems: "center", background: "white", padding: "1rem 1.5rem",borderRadius: "25px" , border: "1px solid #004274", cursor: "pointer"}}  onClick={() => window.location.href = "/Communities"}>
                        <i className="ri-community-line" style={{fontSize: "3rem"}}></i>
                        <p style={{fontSize: "1.25rem", fontWeight: "600", margin: "0px"}}>Community</p>
                    </div>
                    <div className="section-redirect" style={{color: "#004274", display: "flex", flexDirection: "column", alignItems: "center", background: "white", padding: "1rem 1.5rem",borderRadius: "25px" , border: "1px solid #004274", cursor: "pointer"}}  onClick={() => window.location.href = "/Locations"}>
                        <i className="ri-map-pin-line" style={{fontSize: "3rem"}}></i>
                        <p style={{fontSize: "1.25rem", fontWeight: "600", margin: "0px"}}>Location</p>
                    </div>
                </div>


                <div style={{display: "flex", justifyContent: "center", padding: screenWidth >= 800 ? "2rem" : ".5rem", gap: "3rem", flexDirection: screenWidth >= 800 ? "row" : "column"}} >
                    
                    <div style={{width: screenWidth >= 800 ? "25%" : "100%", transform: screenWidth <= 800 && "scale(.8)"}}>
                        <Filter setProps={setProperties}  />
                    </div>
                    <div style={{width: screenWidth >= 800 ? "60%" : "100%", transform: screenWidth <= 800 && "scale(.8)", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start"}}>
                        <h4>Off Plan Properties ({properties.length})</h4>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(248,249,250) ", border: "1px solid #dee2e6", padding: "20px ", borderRadius: "10px"}}>
                            <div >
                                <select defaultValue={"Sort By"} value={sortBy} onChange={(e) => { setSortBy(e.target.value) }} style={{outline: "none", border: "1px solid #dee2e6", cursor: "pointer", padding: "10px", fontSize: "1rem", borderRadius: "5px"}}>
                                    <option value="Sort By" hidden>Sort By</option>
                                    <option value="Newest">Newest</option>
                                    <option value="Oldest">Oldest</option>
                                    <option value="Price High to Low">Price High to Low</option>
                                    <option value="Price Low to High">Price Low to High</option>
                                </select>
                            </div>
                            <Search value={q} data={properties} onchange={(e) => { setSearchTerm(e.target.value.toLowerCase()); setCurrentPage(1) }}/>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px", marginTop: "50px", width: "100%"}}>
                            {
                                paginatedProperties.length > 0 ? paginatedProperties.map((property, index) => {
                                    return(
                                        <Property data={property} key={index}/>
                                    )
                                })
                                :
                                (
                                    <p>
                                        No Property Found
                                    </p>
                                )
                            }
                            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                                <button disabled={currentPage === 1} onClick={() => {setCurrentPage(currentPage - 1)}}>
                                    Previous
                                </button>
                                <p>Page <span className="pageIndex">{currentPage}</span> of {totalPages}</p>
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