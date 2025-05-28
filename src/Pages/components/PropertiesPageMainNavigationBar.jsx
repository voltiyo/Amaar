import { useEffect, useState } from "react"

export default function PropertiesPageMainNavigationBar(){
    const [WhatsappNum, setWhatsappNum] = useState("")
    useEffect(() => {
        async function getNum() {
            const response = await fetch('/api/optionalOptions')
            const data = await response.json()
            const whatsapp_num = data.filter(option => option.optionName === "whatsapp_number")[0]
            setWhatsappNum(whatsapp_num.optionValue)
        }
        getNum()
    }, [])
    return (
        <div style={{zIndex: "99", display: "flex", justifyContent: "space-between", color: "#fff", height: "30px", background: '#004274', position: "fixed", top: "0px", width: "100%"}}>
            <div style={{display: "flex", alignItems: "center", gap: "20px", padding: "5px 20px", fontWeight: "600", fontSize: ".8rem"}}>
                <a href="/">Home</a>
                <a href="/Offplan-Projects">Projects</a>
                <a href="/Developers">Developers</a>
                <a href="/Communities">Communities</a>
                <a href="/Locations">Locations</a>
            </div>
            <div style={{display: "flex", alignItems: "center", gap: "20px", paddingRight: "20px", fontWeight: "600"}}>
                <a href="tel:+971551623236" style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"}}>
                    <i className="fa-solid fa-phone" aria-hidden="true"></i>
                    + 971551623236
                </a>
                <a href={`https://api.whatsapp.com/send?l=en&phone=${WhatsappNum}`} style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"}}>
                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                    { WhatsappNum }
                </a>
            </div>
        </div>
    )
}