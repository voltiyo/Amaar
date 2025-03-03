import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import "./Team.css"


export default function Team() {
    return (
        <div>
            <NavBar />
            <div>
                <div className='services-title-container'>
                    <h1>Our Team</h1>
                    <ul>
                        <li>Home</li>
                        <li>/</li>
                        <li>Our Team</li>
                    </ul>
                </div>
                <div style={{maxWidth: "1140px", display: "flex", justifyContent: "center", margin: "auto", flexDirection: "column"}}>
                    <h2 style={{marginBottom: "0px", color: "#2b3b3a", marginTop: "50px"}}>Meet Our Team</h2>
                    <p style={{color: "#757575"}}>
                    Together with our sales and marketing team in Dubai, we aim to present our customers with options to explore. The team is entrusted with the task to look at all the factors, so as to help those who are interested in buying and selling of property in the UAE.
                    </p>
                </div>
            </div>
        </div>
    )
}