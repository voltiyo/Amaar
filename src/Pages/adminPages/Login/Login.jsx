import { useState, useEffect } from "react";

async function Login() {
    document.querySelector(".Error").textContent = ""
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const body = {
        email, password
    };

    const response = await fetch("/api/VerifyAdmin", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data.success) {
        sessionStorage.setItem("AdminLoginEmail",email)
        sessionStorage.setItem("AdminLoginPassword",password)
        window.location.href = "/Admin"
        
    } else {
        document.querySelector(".Error").textContent = "Invalid Email Or Password"
    }
}


export default function AdminLogin() {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth);
        })
    }, [])
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#001F3F"}}>
            <div style={{width: windowSize >= 800 ? "40%" : "90%", height: windowSize >= 800 ? "50%" : "40%", overflow: "scroll", display: "flex", alignItems: "center",flexDirection: "column", justifyContent: "center", background: "#003569", borderRadius: "10px", boxShadow: "0px 0px 46px -3px #000"}}>
                <div style={{width: "50%",display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexDirection: "column"}} onFocus={(e) => { e.target.style.borderColor = "#fff" }} onBlur={(e) => { e.target.style.borderColor = "#003569" }}>
                    <h2 style={{margin: "0px", color: "#fff", fontSize: "2rem", textWrap: "nowrap"}}>Admin Login</h2>
                    <p className="Error" style={{textAlign: "center", color: "red"}}></p>
                    <input type="text" placeholder="Email" id="email" style={{width: "100%", borderRadius: "7px", outline: "none", border: "2px solid #003569", color: "#727272", fontSize: "1rem", fontWeight: "600", padding: "5px 10px", transition: "all .5s"}} />
                    <input type="password" placeholder="Password" id="password" style={{width: "100%", borderRadius: "7px", outline: "none", border: "2px solid #003569", color: "#727272", fontSize: "1rem", fontWeight: "600", padding: "5px 10px", transition: "all .5s"}} />
                </div>
                <button style={{width: "54%", marginTop: "10px", outline: "none", border: "1px solid #fff", borderRadius: "10px", padding: "7px", background: "green", fontWeight: "600", color: "#fff", fontSize: "1rem", cursor: "pointer"}} onClick={Login}>Login</button>
            </div>
        </div>
    )
}