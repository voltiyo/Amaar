

export default function PropertyPageNavBar({page, setPage, logo, setMainPage}) {
    function ScrollToImageGallery() {
        setMainPage("1")
        setPage("overview")
        setTimeout(() => {
            document.getElementById("propertyImageGallery").scrollIntoView({
                behavior: "smooth"
            });
        }, 1000);
    }
    
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0px",position: "fixed", top: "30px", background: "#fff", zIndex: "30", width: "100%"}}>
            <div style={{width: "5%"}}>
                {
                    logo && <img src={`/api/file/${logo}`} alt="" style={{width: "100%"}} />
                }
            </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", fontWeight: "600", padding: "30px"}}>
                <div onClick={() => { setPage("overview"); setMainPage("1") }} style={{color: page === "overview" ? "#004274" : "#ccc", cursor: "pointer"}}>Overview</div>
                <div onClick={() => { setPage("amenities"); setMainPage("1") }} style={{color: page === "amenities" ? "#004274" : "#ccc", cursor: "pointer"}}>Amenities</div>
                <div onClick={() => { setPage("payment"); setMainPage("1") }} style={{color: page === "payment" ? "#004274" : "#ccc", cursor: "pointer"}}>Payment Plan</div>
                <div onClick={() => { setPage("floor"); setMainPage("1") }} style={{color: page === "floor" ? "#004274" : "#ccc", cursor: "pointer"}}>floor Plan</div>
                <div onClick={() => { setPage("location"); setMainPage("1") }} style={{color: page === "location" ? "#004274" : "#ccc", cursor: "pointer"}}>Location</div>
                <div onClick={() => { setPage("master"); setMainPage("1") }} style={{color: page === "master" ? "#004274" : "#ccc", cursor: "pointer"}}>Master Plan</div>
                <div onClick={() => { ScrollToImageGallery(); ScrollToImageGallery() }} style={{color: "#ccc", cursor: "pointer"}}>Gallery</div>
            </div>
        </div>
    )
}