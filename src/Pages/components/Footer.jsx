import "./Footer.css";

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-element-1">
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <img src="/2.png" alt="" style={{width: "70%"}}/>
                </div>
                <p style={{ width: "95%", fontSize: "14px" }}>At the helm of real estate innovation, my strategic acumen and sales mastery shine. Overseeing business strategy and operational excellence, I harness a unique blend of market knowledge and negotiation prowess to steer our organization towards sustained growth and industry leadership. Our team's collaborative efforts have cultivated robust client relationships and propelled us to the forefront of real estate trends.</p>
                <div style={{ fontSize: "1.5rem", display: "flex", gap: "10px", alignItems: "center", justifyContent: "center"}}>
                    <a href="https://www.facebook.com/amaar.realtor/"><i className="fa-brands fa-facebook"></i></a>
                    <a href="https://x.com/amaarrealtor/"><i className="fa-brands fa-x-twitter"></i></a>
                    <a href="https://www.tiktok.com/@amaar.realtor"><i className="fa-brands fa-tiktok"></i></a>
                    <a href="https://www.linkedin.com/in/asaadammar/?originalSubdomain=ae"><i className="fa-brands fa-linkedin"></i></a>
                    <a href="https://www.instagram.com/amaar.realtor/"><i className="fa-brands fa-instagram"></i></a>
                </div>
            </div>
            <div className="footer-element-2"> 
                <h3>Quick Links</h3>
                <ul>
                    <li>
                    <i className="fa-solid fa-caret-right" style={{color: "orange"}}></i>
                    <a href="/" style={{
                        color: "#ccc",
                        cursor: "pointer",
                        textDecoration: "none"
                    }}>
                        Home
                    </a></li>
                    <li>
                    <i className="fa-solid fa-caret-right" style={{color: "orange"}}></i>
                    <a href="/About" style={{
                        color: "#ccc",
                        cursor: "pointer",
                        textDecoration: "none"
                    }}>
                        About
                    </a></li>
                    <li>
                    <i className="fa-solid fa-caret-right" style={{color: "orange"}}></i>
                    <a href="/Privacy-Policy" style={{
                        color: "#ccc",
                        cursor: "pointer",
                        textDecoration: "none"
                    }}>
                        Privacy Policy
                    </a></li>
                </ul>
            </div>


            <div className="footer-element-3">
                <h3>Contacts Info</h3>
                <ul>
                    <li>
                        <i className="fa-solid fa-location-dot" style={{color: "orange"}}></i>
                        <p>3110, Tamouh Tower, Marina Square, Reem Island,<br /> Abu Dhabi, United Arab Emirates</p>
                    </li>
                    <li>
                        <i className="fa-solid fa-phone" style={{color: "orange"}}></i>
                        <p>+971 2 883 5711</p>
                    </li>
                    <li>
                        <i className="fa-brands fa-whatsapp" style={{color: "orange"}}></i>
                        <p>+971 58 5196155</p>
                    </li>
                    <li>
                        <i className="fa-solid fa-envelope" style={{color: "orange"}}></i>
                        <a href="mailto:ammar@dimensionuae.com" style={{color: "#ccc", textDecoration: "none", cursor: "pointer"}}>ammar@dimensionuae.com</a>
                    </li>
                    <li>
                        <p>Permit No. - LN20240000364644</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}