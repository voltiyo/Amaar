export default function PropertiesPageMainNavigationBar(){
    return (
        <div style={{zIndex: "99", display: "flex", justifyContent: "space-between", color: "#fff", height: "30px", background: 'rgb(0, 31, 63)', position: "fixed", top: "0px", width: "100%"}}>
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
                <a href="https://api.whatsapp.com/send?l=en&phone=971551623236&text=I%20want%20more%20information%20on%20Reportage%20Vista%203" style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"}}>
                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                    + 971551623236
                </a>
            </div>
        </div>
    )
}