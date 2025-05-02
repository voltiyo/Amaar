import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Property from "../components/Property"
import "../Offplan/Offplan.css"

export default function CommunityPage() {
    const { Community } = useParams()
    const [community, setcommunity] = useState("")
    const [coms, setComs] = useState([])
    
    
    useEffect(() => {
        async function Getcommunity() {
            const response = await fetch("/api/community", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({community_name: Community}),
            })
            const data = await response.json(); 
            setcommunity(data);
        }
        Getcommunity();
    },[])

    
    useEffect(() => {
        async function Getcommunities() {
            const response = await fetch("/api/communities")
            const data = await response.json();
            setComs(data);
        }
        Getcommunities();
    },[])

    return (
        <div>
            <NavBar />
            <div>
                <div className='services-title-container' style={{backgroundImage: `url("/api/file/${community.image}")`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "450px"}}>
                    <h1>{community.name}</h1>
                    <ul>
                        <li>Home</li>
                        <li>/</li>
                        <li>{community.name}</li>
                    </ul>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "50px 0px"}}> 
                    <h2 style={{color: "#333"}}>About {community.name}</h2>
                    {
                        community.description && <p style={{width: "870px", textAlign: "center", color: "#727272"}} dangerouslySetInnerHTML={{ __html: community.description.replaceAll(/\n/g, "<br />") }} ></p>
                    }
                        
                </div>
                {( community &&  community.projects.length > 0 ) && <div style={{background: "rgb(248, 249, 250)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", margin: "50px 0px"}}>
                    <h2 style={{textAlign: "center", color: "#333", marginBottom: "0px"}}>Available Projects</h2>
                    <h4 style={{fontWeight: "500", textAlign: "center", width: "50%", color: "#727272", marginTop: "10px"}}>Take a look at the new off-plan developments in and around Dubai Take a look at some of the attractive investment offers.</h4>

                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%", gap: "3rem"}}>
                        {
                            community.projects && community.projects.slice(0, 6).map((project, index) => (
                                <div key={index}>
                                    <Property data={project}  />
                                </div>
                            ))
                        }
                    </div>

                </div>}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", margin: "50px 0px"}}>
                    <h2 style={{textAlign: "center", color: "#333", marginBottom: "0px"}}>Other Communities</h2>
                    <h4 style={{fontWeight: "500", textAlign: "center", width: "50%", color: "#727272", marginTop: "10px"}}>Take a look at the new off-plan developments in and around Dubai Take a look at some of the attractive investment offers.</h4>

                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", width: "80%", flexWrap: "wrap", gap: "1rem"}}>
                        {
                            coms.length > 0 && coms.sort(() => 0.5 - Math.random()).slice(0, 4).map((com, index) => (
                                <a key={index} href={`/Community/${com.name.replaceAll(" ", "-")}`} style={{color: "#333"}}>
                                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid #ccc", padding: "10px", width: "200px", borderRadius: "10px"}}>
                                        <div>
                                            <img src={`/api/file/${com.image}`} width="150" style={{borderRadius: "10px", margin : "10px"}}/>
                                        </div>
                                        <h4 style={{textAlign: "center", margin: "0px"}}>{com.name}</h4>
                                        <div>{com.projects.length} Projects</div>
                                    </div>
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}