import { useState, useEffect } from "react";


export default function GetInTouch( { countries }) {
    
    
    
    async function SendMessage() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
        document.querySelector(".message").textContent = "";
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const code = document.querySelector("#phone_code").value;
        const phone_num = document.querySelector("#phonenum").value;
        const identity = document.querySelector("#identity").value;
        const message = document.querySelector("#message").value;
        if (!name.length > 0) return document.querySelector(".message").textContent = "Please enter a valid name"
        if (!emailRegex.test(email)) return document.querySelector(".message").textContent = "Please enter a valid email"
        if (!phoneRegex.test(code + phone_num)) return document.querySelector(".message").textContent = "Please enter a valid phone number"
        if (message.length < 100) return document.querySelector(".message").textContent = "Your message should contain at least 100 character"
        const body = {
            name,
            email,
            code,
            phone_num,
            identity,
            message,
        }
        const response = await fetch("/api/getInTouch", {
            method: "POST",
            headers : {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (data.success) {
            document.querySelector(".message").style.color = "Green";
            document.querySelector(".message").textContent = "Message Sent !";
        } else {
            document.querySelector(".message").style.color = "red";
            document.querySelector(".message").textContent = "Error Sending Message !";
        }


    }

    
    return (
        <div style={{ border: "1px solid #ccc",width: "100%", borderRadius: "10px",overflow: "hidden", margin: "50px 0px", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{background: "#004274", color: "#fff", padding: "1px 10px", width: "100%"}}>
                <h2 style={{textAlign: "center"}}>GET IN TOUCH</h2>
                <p className="message" style={{textAlign: "center"}}></p>
            </div>

            <div style={{display: "flex", alignItems: "center", justifyContent: "center",padding: "20px", gap: "15px", flexDirection: "column", width: "85%",}} onFocus={(e) => { e.target.style.color = "#333"; e.target.style.borderColor = "#333" }} onBlur={(e) => { e.target.style.color = "#727272"; e.target.style.borderColor = "#ccc" }}>
                <input type="text" id="name" placeholder="Name" style={{outline: "none", color: "#727272", border: "1px solid #ccc", padding: "10px", width: "100%", borderRadius: "8px", transition: "all .5s"}} />
                <input type="text" id="email" placeholder="Email" style={{outline: "none", color: "#727272", border: "1px solid #ccc", padding: "10px", width: "100%", borderRadius: "8px", transition: "all .5s"}} />
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "104%"}}>
                    <select defaultValue={"code"} id="phone_code" style={{width: "45%", height: "100%", padding: "10px 0px", outline: "none", borderRadius: "10px"}}>
                        {
                            countries.length > 0 &&
                            countries.map((country, index) => (
                                <option value={country.dial_code} key={index}>{country.name} - {country.dial_code}</option>
                            ))
                        }
                    </select>
                    <input type="text" placeholder="Phone Number" id="phonenum" style={{outline: "none", color: "#727272", border: "1px solid #ccc", padding: "10px", width: "40%", borderRadius: "8px", transition: "all .5s"}} />
                </div>
                <select defaultValue={"I am"} id="identity" style={{outline: "none", color: "#727272", border: "1px solid #ccc", padding: "10px", width: "104%", borderRadius: "8px", transition: "all .5s"}}>
                    <option value="Individual">Individual</option>
                    <option value="Agent">Agent</option>
                    <option value="Investor">Investor</option>
                    <option value="Do not want to disclose">Do not want to disclose</option>
                    <option value="Other" >Other</option>
                </select>
                <textarea id="message" minLength={100} maxLength={200} style={{width: "100%", borderRadius: "10px", border: "1px solid #ccc", resize: "none", height: "100px", padding: "10px", outline: "none", transition: "all .5s"}} placeholder="Message ..."></textarea>
                <button onClick={SendMessage} style={{outline: "none", background: "#000", color: "#fff", fontSize: ".9rem", border: "none", width: "100%", padding: "10px", borderRadius: "10px", cursor: "pointer"}}>SEND MESSAGE</button>
                <div style={{display: "flex", alignItems: "center", gap: "1.2rem"}}>
                    <i className="fa fa-map-marker"></i>3110, Tamouh Tower, Marina Square, Reem Island,<br />Abu Dhabi, United Arab Emirates
                </div>
            </div>
            
        </div>
    )
}