import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import "../Offplan/Offplan.css"


export default function AboutUs() {
    return (
        <div>
            <NavBar page={"about"} />
            <div>
                <div className='services-title-container'>
                    <h1>About Us</h1>
                    <ul>
                        <li>Home</li>
                        <li>/</li>
                        <li>About</li>
                    </ul>
                </div>
                <div className='services-container' style={{width: "100%"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%"}}>
                        <div style={{width: "50%", textWrap: "wrap"}}>
                            <h1>About Me</h1>
                            <p>At the helm of real estate innovation, my strategic acumen and sales mastery shine. Overseeing business strategy and operational excellence, I harness a unique blend of market knowledge and negotiation prowess to steer our organization towards sustained growth and industry leadership. Our team's collaborative efforts have cultivated robust client relationships and propelled us to the forefront of real estate trends.</p>
                            <p>With a focus on comprehensive market analysis and process optimization, I am dedicated to ensuring our operations adhere to the highest regulatory standards while fostering an environment ripe for skill development. My commitment to transparency and efficiency underpins our success, as we empower our clients with informed decision-making and seamless transaction experiences. Finally add all the contact info and a form to submit by clients or candidates who wish to join my operation </p>
                        </div>
                        <div style={{width: "20%"}}>
                            <img src="/me.png" style={{width: "100%", objectFit: "cover"}} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}