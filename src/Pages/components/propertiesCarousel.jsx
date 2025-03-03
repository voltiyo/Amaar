import { useEffect, useState } from "react";
import "./propertiesCarousel.css"


function ScrollRight() {
  const container = document.querySelector("#properties-carousel-container");
  
  if (!container) return; // Ensure the element exists

  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  if (container.scrollLeft >= maxScrollLeft) {
    // Reset to the start when reaching the end
    container.scrollTo({ left: 0, behavior: "smooth" });
  } else {
    // Move right by 290px
    container.scrollBy({ left: 280, behavior: "smooth" });
  }
}

function ScrollLeft() {
  const container = document.querySelector("#properties-carousel-container");

  if (!container) return;

  if (container.scrollLeft <= 0) {
    // Go to the max scroll when reaching the start
    container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
  } else {
    // Move left by 290px
    container.scrollBy({ left: -280, behavior: "smooth" });
  }
}


export default function PropertiesCarousel() {
  const [elements, setElements] = useState([])

  useEffect(() => {
    async function GetProperties() {
      const response = await fetch("/api/properties");
      const data = await response.json();
      setElements(data);
    }
    GetProperties();
  }, [])
  
  
  useEffect(() => {
    setInterval(ScrollRight, 5000);
  }, [])
  
  return (
    <div style={{ width: "80%",height: "250px", display: "flex", justifyContent: "center", alignItems: "center"}} >
      <div style={{cursor: "pointer", background: "#001F3F", padding: "10px 15px", borderRadius: "5px"}} onClick={ScrollLeft}>
        <i className="fa-solid fa-arrow-left" style={{color: "#fff"}}></i>
      </div>
      
      <div id="properties-carousel-container" style={{display: "flex",margin: "0px 15px", alignItems: "center", position: "relative", justifyContent: "center", overflow: "scroll", gap: "10px", width: "40%", paddingLeft: "950px", paddingRight: "50px", scrollbarWidth: "none", msOverflowStyle: "none"}}>
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {
          elements.map( (element, index) => {
            return (
              <a
                key={index}
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent), url(/api/file/${JSON.parse(element.images.replace("{", "[").replace("}", "]"))[0]})`,
                  width: "265px",
                  height: "229px",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  flexDirection: "column",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  flexShrink: 0,
                  borderRadius: "10px",
                }}
                href={`/Projects/${element.title.replaceAll(" ", "-")}`}
                >
                <h3 style={{ color: "#fff", margin: "0px", fontWeight: "600" }}>
                  {element.title}
                </h3>
                <h5 style={{ color: "#fff", margin: "0px", fontWeight: "400" }}>{element.status}</h5>
                <h2 style={{ color: "#fff", margin: "0px", fontWeight: "600", padding: "10px" }}>{element.price}</h2>
              </a>

            )
          })
        }
      </div>
      <div style={{ cursor: "pointer", background: "#001F3F", padding: "10px 15px", borderRadius: "5px"}} onClick={ScrollRight}>
        <i className="fa-solid fa-arrow-right" style={{color: "#fff"}}></i>
      </div>
      <div></div>
    </div>
  )
}