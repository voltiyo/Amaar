import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import { useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import "../Offplan/Offplan.css"

export default function ArticlePage() {
    const { Article } = useParams();
    const [article, setArticle] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth);
        })
    }, [])
    useEffect(() => {
        async function getArticle() {
            const response = await fetch("/api/article", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({articleTitle: Article})
            })
            const data = await response.json();
            setArticle(data)
        }
        getArticle();
    }, [])
    
    return (
        <div>
            <Navbar page={"newsandarticles"}/>
            <div>
                <div className='services-title-container'>
                    <h1 style={{width: windowSize >= 800 ? "50%" : "90%", textAlign: "center"}}>{Article.replaceAll("-", " ")}</h1>
                    <ul style={{display: "flex", textWrap: "nowrap", flexWrap: "wrap", justifyContent: "center", width: windowSize >= 800 ? "50%" : "80%"}}>
                        <li>Home</li>
                        <li>/</li>
                        <li>News And Articles</li>
                        <li>/</li>
                        <li style={{textWrap: "wrap", textAlign: "center"}}>{Article.replaceAll("-", " ")}</li>
                    </ul>
                </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "30px", width: "90%", background: "#eee", borderRadius: "10px"}}>
                        <div>
                            <img src={`/api/file/${article.image}`} style={{borderRadius: "10px", width:windowSize >= 800 ? "600px" : "80%", margin: "20px"}} />
                        </div>
                        <div style={{width: windowSize >= 800 ? "70%" : "95%"}}>
                            <h2 style={{
                                color: "#333"
                            }}>{article.title}</h2>
                            {
                                article.body && <p dangerouslySetInnerHTML={{__html: article.body.replaceAll(/\n/g, "<br />").replaceAll("begin-title:", "<h4>").replaceAll("end-title", "</h4>")}}
                                style={{
                                    fontWeight: "600",
                                    color: "#727272"
                                }}></p>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}