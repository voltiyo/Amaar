import { useEffect, useState } from "react";
import "./propertiesCarousel.css"


function ScrollRight() {
  const container = document.querySelector("#type-carousel-container");
  
  if (!container) return; // Ensure the element exists

  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  if (container.scrollLeft >= maxScrollLeft) {
    container.scrollTo({ left: 0, behavior: "smooth" });
  } else {
    container.scrollBy({ left: container.querySelector("a").offsetWidth + 10, behavior: "smooth" });
  }
}

function ScrollLeft() {
  const container = document.querySelector("#type-carousel-container");

  if (!container) return;

  if (container.scrollLeft <= 0) {
    container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
  } else {
    container.scrollBy({ left: -(container.querySelector("a").offsetWidth + 10), behavior: "smooth" });
  }
}


export default function Carousel({ elements }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
        setWindowSize(window.innerWidth);
    })
  }, [])
  return (
    <div style={{ width: "100%",height: "250px", display: "flex", justifyContent: "center", alignItems: "center"}} >
      <div style={{cursor: "pointer", background: "#004274", padding: "10px 15px", borderRadius: "5px"}} onClick={ScrollLeft}>
        <i className="fa-solid fa-arrow-left" style={{color: "#fff"}}></i>
      </div>
      
      <div id="type-carousel-container" style={{display: "flex",margin: "0px 15px", alignItems: "center", position: "relative", justifyContent: "start", overflow: "scroll", gap: "10px", scrollbarWidth: "none", msOverflowStyle: "none"}}>
       
        {
          elements.length > 0 && elements.slice(0, 20).map( (element, index) => {
            return (
              <a
                key={index}
                style={{
                  width: windowSize >= 800 ? "300px" : "90%",
                  height: "229px",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  flexDirection: "column",
                  flexShrink: 0,
                  borderRadius: "10px",
                  border: "1px solid #eee"
                }}
                href={`/Offplan-Projects/type/${element[0].replaceAll(" ", "-")}`}
                >
                <div style={{width: "100%", height: "70%", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px 10px 0px 0px", overflow: "hidden"}}>
                  <img src={`/api/file/${JSON.parse(element[1][0].images.replace("{", "[").replace("}", "]"))[0]}`} style={{width: "100%", height: "100%"}}/>
                </div>
                <h3 style={{ color: "#000", margin: "0px", fontWeight: "600" }}>
                  {element[0]}
                </h3>
                <h4 style={{ color: "#333", paddingBottom: "5px", fontWeight: "600", margin: "0px" }}>{element[1].length} properties</h4>
              </a>

            )
          })
        }
      </div>
      <div style={{ cursor: "pointer", background: "#004274", padding: "10px 15px", borderRadius: "5px"}} onClick={ScrollRight}>
        <i className="fa-solid fa-arrow-right" style={{color: "#fff"}}></i>
      </div>
      <div></div>
    </div>
  )
}