import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Property from "../components/Property"

export default function Developer() {
    const { Developer } = useParams()
    const [developer, setDeveloper] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth);
        })
    }, [])
    useEffect(() => {
        async function GetDeveloper() {
            const response = await fetch("/api/developer", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({developer_name: Developer}),
            })
            const data = await response.json();
            setDeveloper(data);
        }
        GetDeveloper();
    },[])


    return (
        <div>
            <NavBar />
            <div>
                <div className='services-title-container' style={{backgroundImage: `url("/api/file/${developer.banner}")`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "450px"}}>
                    <h1>{developer.name}</h1>
                    <ul>
                        <li>Home</li>
                        <li>/</li>
                        <li>{developer.name}</li>
                    </ul>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "50px 0px"}}> 
                    <h2 style={{color: "#333"}}>About {developer.name}</h2>
                    {
                        developer.description && <p style={{width: "870px", textAlign: "center", color: "#727272"}} dangerouslySetInnerHTML={{ __html: developer.description.replaceAll(/\n/g, "<br />") }} ></p>
                    }
                        
                </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "50px 0px"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", padding: "20px", border: "1px solid #ccc", width: "fit-content"}}>
                        <div>
                            <img src={`/api/file/${developer.logo}`} width="120" />
                        </div>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                            <h3 style={{color: "#333", marginBottom: "3px", textAlign: "center", marginTop: "0px"}}>{developer.projects  && developer.projects.length}+</h3>
                            <p style={{color: "#727272", margin: "0px"}}>Projects</p>
                        </div>
                        <div>
                            <h3 style={{color: "#333", marginBottom: "3px", textAlign: "center", marginTop: "0px"}}>20 +</h3>
                            <p style={{color: "#727272", margin: "0px"}}>Communities</p>
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(248, 249, 250)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                    <h2 style={{textAlign: "center", color: "#333", marginBottom: "0px"}}>{developer.name} Projects</h2>
                    <h4 style={{fontWeight: "500", textAlign: "center", width: windowSize >= 800 ? "50%" : "90%", color: "#727272", marginTop: "10px"}}>Take a look at the new off-plan developments in and around Dubai Take a look at some of the attractive investment offers.</h4>

                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", transform: windowSize <= 800 && "scale(.7)" }}>
                        {
                            developer.projects && developer.projects.slice(0, 6).map((project, index) => (
                                <div key={index}>
                                    <Property data={project}  />
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