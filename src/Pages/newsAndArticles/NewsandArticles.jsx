import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer";
import ArticleCompo from "../components/Article";
import "../Offplan/Offplan.css"

export default function NewsAndArticles() {
    const [articles, setArticles] = useState([])
    const [recentProperties, setRecentProperties] = useState([]);
    const [locations, setLocations] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth)
        })
    }, [])
    
    useEffect(() => {
        async function GetArticles() {
            const resp = await fetch("/api/news");
            const data = await resp.json();
            setArticles(data)
        }
        GetArticles();
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
        async function getLatestProjects() {
            const resp = await fetch("/api/RecentProperties");
            const data = await resp.json();
            setRecentProperties(data)
        }

        getLatestProjects();
    },[])
    return (
        <div>
            <NavBar page="newsandarticles"/>
            <div>
                <div className='services-title-container'>
                    <h1>News And Articles</h1>
                    <ul>
                        <li>Home</li>
                        <li>/</li>
                        <li>News And Articles</li>
                    </ul>
                </div>
                <div style={{display: "flex", alignItems: "start", justifyContent: "space-around", margin: "150px 0px", flexDirection: windowSize >= 800 ? "row" : "column"}}>
                    <div style={{width: windowSize >= 800 ? "60%" : "90%"}}>
                        <h3 style={{color: "#333"}}>News And Articles ({articles.length} Records Found)</h3>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center",justifyContent: "center", width: "100%", gap: "20px"}}>
                            {
                                articles.map((article, index) => (
                                    <div key={index} style={{width: "100%"}}>
                                        <ArticleCompo data={article} index={index}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div style={{width: windowSize >= 800 ? "25%" : "90%", marginTop: "50px"}}>
                        <div style={{position: "sticky", top: "0px", boxShadow: "0 .5rem 1rem rgb(0 0 0 / .15)", padding: "10px", borderRadius: "10px"}}>
                            <h3>Recent Projects</h3>
                            {
                                recentProperties.length > 0 && recentProperties.map((property, index) => (
                                    <a href={`/Projects/${property.title.replaceAll(" ", "-")}`}  key={index}>
                                        <div style={{display: "flex", alignItems:" center ", gap: "10px", borderBottom: index !== recentProperties.length - 1 ? "1px dashed  #ccc" : "", padding: "10px"}}>
                                            <div>
                                                <img src={`/api/file/${JSON.parse(property.images.replace("{", "[").replace("}","]"))[0]}`} width={120} height={75} alt="" style={{borderRadius: "5px"}}/>
                                            </div>
                                            <div>
                                                <h4 style={{marginBottom: "5px", marginTop: "0px", color: "#333", fontSize: ".8rem", lineClamp: "2"}}>{property.title}</h4>
                                                <span style={{display: "flex", alignItems: "center", gap: "5px", margin: "0px"}}>
                                                    <i className="ri-map-pin-line" style={{color: "#727272"}}></i>
                                                    <small>
                                                        <p style={{margin: "0px", color: "#727272"}}>{locations.length > 0 && locations.filter(location => parseInt(property.location) === location.id)[0]?.name}</p>
                                                    </small>
                                                </span>
                                                <h4 style={{color: "#004274", margin: "0px"}}>
                                                    {
                                                        property.price.includes("AED") === false && property.price !== "Call Us" && "AED" 
                                                    } {property.price}
                                                </h4>
                                            </div>
                                        </div>
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}