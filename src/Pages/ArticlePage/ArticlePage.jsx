import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import { useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";

export default function ArticlePage() {
    const { Article } = useParams();
    const [article, setArticle] = useState([])

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
                    <h1 style={{width: "50%", textAlign: "center"}}>{Article.replaceAll("-", " ")}</h1>
                    <ul>
                        <li>Home</li>
                        <li>/</li>
                        <li>News And Articles</li>
                        <li>/</li>
                        <li>{Article.replaceAll("-", " ")}</li>
                    </ul>
                </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", padding: "50px 0px"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "30px", width: "90%", background: "#eee", borderRadius: "10px"}}>
                        <div>
                            <img src={`/api/file/${article.image}`} style={{borderRadius: "10px", width: "600px", margin: "20px"}} />
                        </div>
                        <div style={{width: "70%"}}>
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