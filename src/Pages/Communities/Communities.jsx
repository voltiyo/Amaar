import NavBar from "../components/NavBar"
import { useState, useEffect } from "react";
import Search from "../components/Search";
import CommunityComp from "../components/CommunityComp";
import Footer from "../components/Footer";
import "../Offplan/Offplan.css"

export default function Communities() {
    const [Community, setCommunity] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recentProperties, setRecentProperties] = useState([]);
    const [SortBy, setSortBy] = useState("Sort By")
    const itemsPerPage = 10;
    const [totalPages, setTotalPages] = useState(Math.ceil(Community.length / itemsPerPage));
    const [startIndex, setStartIndex] = useState((currentPage - 1) * itemsPerPage);
    const [paginatedCommunity, setPaginatedCommunity] = useState(Community.slice(startIndex, startIndex + itemsPerPage));
    const [searchTerm, setSearchTerm] = useState("");
    const [locations, setLocations] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth)
        })
    }, [])

    
    useEffect(() => {
        async function GetLocations() {
            const resp = await fetch("/api/locations");
            const data = await resp.json();
            setLocations(data)
        }
        GetLocations();
    }, [])
    useEffect(() => {
        if (Community.length > 0) {
            const filteredCommunity = Community?.filter(com =>
                com.name.toLowerCase().includes(searchTerm)
            );
            const newTotalPages = Math.ceil(filteredCommunity.length / itemsPerPage);
            const newStartIndex = (currentPage - 1) * itemsPerPage;
            const paginated = filteredCommunity.slice(newStartIndex, newStartIndex + itemsPerPage);
            
            setTotalPages(newTotalPages);
            setPaginatedCommunity(paginated);
        }
    }, [Community, currentPage, searchTerm]);


    useEffect(() => {
        async function GetCommunity() {
            const response = await fetch("/api/communities");
            const data = await response.json();
            setCommunity( data );
        }
        GetCommunity()
    },[])

    useEffect(() => {
        window.scrollTo({ top: 300, behavior: "smooth" });
    },[currentPage])


    useEffect(() => {
        async function getLatestProjects() {
            const resp = await fetch("/api/RecentProperties");
            const data = await resp.json();
            setRecentProperties(data)
        }

        getLatestProjects();
    },[])

    useEffect(() => {
        if (SortBy == "Name") {
            setCommunity([...Community].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())))
            setCurrentPage(1)
        }
        else if (SortBy === "Properties") {
            setCommunity([...Community].sort((a, b) => b.projects.length - a.projects.length))
            setCurrentPage(1)
        }
        
        
    }, [SortBy])
    
    return (
        <div>
            <NavBar page={"offplan"}/>
            <div>
                <div className='services-title-container'>
                    <h1>Communities</h1>
                    <ul>
                        <li>Home</li>
                        <li>/</li>
                        <li>Communities</li>
                    </ul>
                </div>
                <div style={{display: "flex", justifyContent: "center", padding: "2rem", gap: "1rem", flexWrap: "wrap"}}>
                    <div className="section-redirect " style={{color: "#004274", display: "flex", flexDirection: "column", alignItems: "center", background: "white", padding: "1rem 1.5rem",borderRadius: "25px" , border: "1px solid #004274", cursor: "pointer"}} onClick={() => window.location.href = "/Offplan-Projects"}>
                        <i className="ri-building-line" style={{fontSize: "3rem"}}></i>
                        <p style={{fontSize: "1.25rem", fontWeight: "600", margin: "0px"}}>Projects</p>
                    </div>
                    <div className="section-redirect " style={{color: "#004274", display: "flex", flexDirection: "column", alignItems: "center", background: "white", padding: "1rem 1.5rem",borderRadius: "25px" , border: "1px solid #004274", cursor: "pointer"}}  onClick={() => window.location.href = "/Developers"}>
                        <i className="ri-building-4-line" style={{fontSize: "3rem"}}></i>
                        <p style={{fontSize: "1.25rem", fontWeight: "600", margin: "0px"}}>Developers</p>
                    </div>
                    <div className="section-redirect active" style={{color: "#004274", display: "flex", flexDirection: "column", alignItems: "center", background: "white", padding: "1rem 1.5rem",borderRadius: "25px" , border: "1px solid #004274", cursor: "pointer"}}>
                        <i className="ri-community-line" style={{fontSize: "3rem"}}></i>
                        <p style={{fontSize: "1.25rem", fontWeight: "600", margin: "0px"}}>Community</p>
                    </div>
                    <div className="section-redirect" style={{color: "#004274", display: "flex", flexDirection: "column", alignItems: "center", background: "white", padding: "1rem 1.5rem",borderRadius: "25px" , border: "1px solid #004274", cursor: "pointer"}}  onClick={() => window.location.href = "/Locations"}>
                        <i className="ri-map-pin-line" style={{fontSize: "3rem"}}></i>
                        <p style={{fontSize: "1.25rem", fontWeight: "600", margin: "0px"}}>Location</p>
                    </div>
                </div>


                <div style={{display: "flex", justifyContent: "center", padding: windowSize >= 800 ? "2rem": "10px", gap: "4rem", flexDirection : windowSize >= 800 ? "row" : "column"}} >
                    
                    <div style={{width: windowSize >= 800 ? "25%" : "100%", }}>
                        <div style={{position: "sticky", top: "0px", boxShadow: "0 .5rem 1rem rgb(0 0 0 / .15)", padding: "10px", borderRadius: "10px"}}>
                            <h3>Recent Projects</h3>
                            {
                                recentProperties.length > 0 && recentProperties.map((property, index) => (
                                    <a href={`/Projects/${property.title.replaceAll(" ", "-")}`} key={index} style={{color: "#727272",display: "flex", alignItems:" center ", gap: "10px", borderBottom: index !== recentProperties.length - 1 ? "1px dashed  #ccc" : "", padding: "10px"}}>
                                        <div>
                                            <img src={`/api/file/${JSON.parse(property.images.replace("{", "[").replace("}","]"))[0]}`} width={120} height={75} alt="" style={{borderRadius: "5px"}}/>
                                        </div>
                                        <div>
                                            <h4 style={{marginBottom: "5px", marginTop: "0px", color: "#333", fontSize: ".8rem", lineClamp: "2"}}>{property.title}</h4>
                                            <span style={{display: "flex", alignItems: "center", gap: "5px", margin: "0px"}}>
                                                <i className="ri-map-pin-line"></i>
                                                <small>
                                                    <p style={{margin: "0px", color: "#727272"}}>{locations.filter(location => parseInt(property.location) === location.id)[0]?.name}</p>
                                                </small>
                                            </span>
                                            <h4 style={{color: "#004274", margin: "0px"}}>
                                                {
                                                    property.price.includes("AED") === false && property.price !== "Call Us" && "AED" 
                                                } {property.price}
                                            </h4>
                                        </div>
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                    <div style={{width: windowSize >= 800 ? "60%": "100%"}}>
                        <h4>Communities ({Community.length})</h4>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(248,249,250) ", border: "1px solid #dee2e6", padding: "20px ", borderRadius: "10px"}}>
                            <div >
                                <select style={{outline: "none", border: "1px solid #dee2e6", cursor: "pointer", padding: "10px", fontSize: "1rem", borderRadius: "5px"}} value={SortBy} onChange={(e) => { setSortBy(e.target.value) }}>
                                    <option value="Sort By" hidden>Sort By</option>
                                    <option value="Name">Name</option>
                                    <option value="Properties">Properties</option>
                                </select>
                            </div>
                            <Search data={Community} onchange={(e) => { setSearchTerm(e.target.value.toLowerCase()); setCurrentPage(1) }}/>
                        </div>

                        <div style={{display: "flex", width: "100%",flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px", marginTop: "50px"}}>
                            {
                                paginatedCommunity && paginatedCommunity.map((property, index) => {
                                    return(
                                        <div key={index} style={{width: "100%"}}>
                                            <CommunityComp data={property} index={index}/>
                                        </div>
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