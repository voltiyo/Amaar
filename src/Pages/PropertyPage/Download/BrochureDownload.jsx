import { useEffect, useState } from "react"
async function Download( pdf, title ) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
    document.querySelector(".message").textContent = "";
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const code = document.querySelector("#phone_code").value;
    const phone_num = document.querySelector("#phonenum").value;
    const identity = document.querySelector("#identity").value;
    if (!name.length > 0) return document.querySelector(".message").textContent = "Please enter a valid name"
    if (!emailRegex.test(email)) return document.querySelector(".message").textContent = "Please enter a valid email"
    if (!phoneRegex.test(code + phone_num)) return document.querySelector(".message").textContent = "Please enter a valid phone number"

    const body = {
        name,
        email,
        phone_number: code + phone_num,
        identity,
        prop: title,
        pdf: pdf
    }
    const response = await fetch("/api/PDFEmail", {
        method: "POST",
        headers : {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    if (data.success) {
        document.querySelector(".message").style.color = "green";
        document.querySelector(".message").textContent = "An email has been sent to one of our agents, check your inbox soon !";
    } else {
        document.querySelector(".message").style.color = "red";
        document.querySelector(".message").textContent = "Error Sending Message !";
    }
}


export default function BrochureDownload({ property, developer, countries, pdf }) {
    const [community, setCommunity] = useState([])
    const [PDF, setPdf] = useState(pdf)
    useEffect(() => {
        async function getCom() {
            const response = await fetch(`/api/communities`)
            const data = await response.json()
            setCommunity(data.filter(com => com.id === property.community_id)[0])
        }
        getCom()
    }, [property])
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", marginTop: "10vh", height: "90vh", backgroundImage: property.images && `url(/api/file/${JSON.parse(property.images?.replace("{", '[').replace("}", "]"))[0]})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "5rem", width: "70%", background: "#fff", border: "1px solid #ccc", padding: "20px", borderRadius: "10px"}}>
                <div style={{width: "50%"}}>
                    <ul style={{width: "100%"}}>
                        <style>{`
                            ul li{
                                padding: 10px 0;
                            }
                            ul li:not(:last-child){
                                border-bottom: 1px solid #ccc;
                            }
                        `}</style>
                        <li style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <h2>
                                {property.title}
                            </h2>
                            <div style={{textAlign: "center", fontWeight: "600", margin: "20px", padding: "10px", borderRadius: "10px", border: "1px solid #ccc", textWrap: "nowrap"}}>Starting From <br /> <span style={{color: "orange"}}>{property.price}</span></div>
                        </li>
                        <li  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"}}>
                                <i className="fa-solid fa-building"></i>
                                Developer: 
                            </div>
                            <div>
                                {developer.name}
                            </div>
                        </li>
                        <li  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"}}>
                                <i className="fa-solid fa-location-dot"></i>
                                Community: 
                            </div>
                            <div>
                                {community.name}
                            </div>
                        </li>
                        <li  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"}}>
                                <i className="fa-regular fa-building"></i>
                                Property Type: 
                            </div>
                            <div>
                                {property.type}
                            </div>
                        </li>
                        <li  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"}}>
                                <i className="fa-solid fa-bed"></i>
                                Accomodation: 
                            </div>
                            <div>
                                {property.bedrooms}
                            </div>
                        </li>
                        <li  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"}}>
                                <i className="fa-solid fa-chart-area"></i>
                                Size: 
                            </div>
                            <div>
                                {property.size}
                            </div>
                        </li>
                        <li  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"}}>
                                <i className="fa-solid fa-percent"></i>
                                Payment Plan: 
                            </div>
                            <div>
                                {property.payment_plan}
                            </div>
                        </li>
                        <li  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"}}>
                                <i className="fa-solid fa-calendar-check"></i>
                                Handover: 
                            </div>
                            <div>
                                {new Date(property.handover).getFullYear()}
                            </div>
                        </li>
                    </ul>
                </div>
                <div style={{width: "50%"}}>
                    <h2 style={{display: "flex", alignItems: "center", justifyContent: "start", gap: "1rem", borderBottom: "1px solid #004274"}}>
                        <i className="fa-solid fa-download"></i>
                        Download {PDF === "floor" ? "Floor Plan" : "Payment Plan"}
                    </h2>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", marginBottom: "2rem"}}>
                        <button
                         onClick={() => {
                            setPdf("floor")
                         }}
                         style={{display: "flex", cursor: "pointer", alignItems: "center", justifyContent: "center", color: "#fff", gap: ".5rem", padding: "10px 15px", borderRadius: "10px", background: PDF === "floor" ? "rgb(0, 66, 116, 1)" : "rgb(0, 66, 116, .5)", border: "none", outline: "none"}}>
                            <i className="fa-solid fa-object-group"></i>
                            Floor Plan
                        </button>
                        <button
                         onClick={() => {
                            setPdf("payment")
                         }}
                         style={{display: "flex", cursor: "pointer", alignItems: "center", justifyContent: "center", color: "#fff", gap: ".5rem", padding: "10px 15px", borderRadius: "10px", background: PDF === "payment" ? "rgb(0, 66, 116, 1)" : "rgb(0, 66, 116, .5)", border: "none", outline: "none"}}>
                            <i className="fa-solid fa-money-bill"></i>
                            Payment Plan
                        </button>
                    </div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem"}}>
                        <p className="message"></p>
                        <input type="text" id="name" placeholder="Name*"  style={{width: "95%", outline: "0", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", color: "#727272"}}/>
                        <input type="text" id="email" placeholder="Email*"  style={{width: "95%", outline: "0", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", color: "#727272"}}/>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                            <select defaultValue={"code"} id="phone_code" style={{width: "45%", height: "100%", padding: "10px 0px", outline: "none", borderRadius: "10px 0 0 10px", border: "1px solid #ccc", color: "#727272"}}>
                                {
                                    countries.length > 0 &&
                                    countries.map((country, index) => (
                                        <option value={country.dial_code} key={index}>{country.name} - {country.dial_code}</option>
                                    ))
                                }
                            </select>
                            <input type="text" placeholder="Contact No*" id="phonenum" style={{outline: "none", color: "#727272", border: "1px solid #ccc", padding: "10px", width: "100%", borderRadius: "0 8px 8px 0", transition: "all .5s"}} />
                        </div>
                        <select defaultValue={"I am"} id="identity" style={{outline: "none", color: "#727272", border: "1px solid #ccc", padding: "10px", width: "100%", borderRadius: "8px", transition: "all .5s"}}>
                            <option value="Individual">Individual</option>
                            <option value="Agent">Agent</option>
                            <option value="Investor">Investor</option>
                            <option value="Do not want to disclose">Do not want to disclose</option>
                            <option value="Other" >Other</option>
                        </select>
                        <button onClick={() => { Download(PDF, property.title) }} style={{outline: "none", background: "#000", color: "#fff", fontSize: ".9rem", border: "none", width: "100%", padding: "10px", borderRadius: "10px", cursor: "pointer"}}>Download Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}