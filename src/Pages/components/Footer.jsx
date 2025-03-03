import "./Footer.css";

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-element-1">
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <img src="/Navy-blue-logo.png" alt="" style={{width: "50%"}}/>
                </div>
                <p style={{ width: "95%", fontSize: "14px" }}>Amaar Properties is a company incorporated in the United Arab Emirates, based in Dubai, with the Objective to add transparency to the UAE Real Estate Market by delivering Unique Real Estate Knowledge and Remarkable Experience to its customers.</p>
                <div style={{ fontSize: "1.5rem", display: "flex", gap: "10px" }}>
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-linkedin"></i>
                    <i className="fa-brands fa-youtube"></i>
                    <i className="fa-brands fa-instagram"></i>
                </div>
            </div>
            <div className="footer-element-2"> 
                <h3>Quick Links</h3>
                <ul>
                    <li>
                    <i className="fa-solid fa-caret-right" style={{color: "#001F3F"}}></i>
                    <a href="/" style={{
                        color: "#ccc",
                        cursor: "pointer",
                        textDecoration: "none"
                    }}>
                        Home
                    </a></li>
                    <li>
                    <i className="fa-solid fa-caret-right" style={{color: "#001F3F"}}></i>
                    <a href="/About" style={{
                        color: "#ccc",
                        cursor: "pointer",
                        textDecoration: "none"
                    }}>
                        About
                    </a></li>
                    <li>
                    <i className="fa-solid fa-caret-right" style={{color: "#001F3F"}}></i>
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
                        <i className="fa-solid fa-location-dot" style={{color: "#001F3F"}}></i>
                        <p>3405, Marina Plaza, Al Marsa Street,<br /> Dubai Marina, UAE. </p>
                    </li>
                    <li>
                        <i className="fa-solid fa-phone" style={{color: "#001F3F"}}></i>
                        <p>+971 4 248 3400</p>
                    </li>
                    <li>
                        <i className="fa-brands fa-whatsapp" style={{color: "#001F3F"}}></i>
                        <p>+971 56 412 4891</p>
                    </li>
                    <li>
                        <i className="fa-solid fa-envelope" style={{color: "#001F3F"}}></i>
                        <a href="mailto:info@Amaarproperties.ae" style={{color: "#ccc", textDecoration: "none", cursor: "pointer"}}>Email ID</a>
                    </li>
                    <li>
                        <p>Permit No. - 40379</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}