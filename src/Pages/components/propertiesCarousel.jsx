import { useEffect, useState } from "react"
import './propertiesCarousel.css'


export default function PropertiesCarousel({ properties, developers, locations }) {
  const [visible, setVisible] = useState([0, 1, 2])
  
  function ScrollNextThree(index) {
    const container = document.querySelector("#propsCarousel")
    const children = container?.querySelectorAll(".prop")
    if (index === 0) {
      container.scrollTo({left: 0, behavior: "smooth"})
      setVisible([0, 1, 2])
    } else if (index === 3) {
      container.scrollTo({left: 1200, behavior: "smooth"})
      setVisible([3, 4, 5])
    } else if (index === 6) {
      container.scrollTo({left: 2400, behavior: "smooth"})
      setVisible([6, 7, 8])
    }
  }
  
  function ScrollRight() {
    const container = document.querySelector("#propsCarousel")
    const child = container.querySelector("div")
    if (child) {
      const scrollAm = child.offsetWidth
      container.scrollBy({left: scrollAm, behavior: "smooth"})
    }
    
    
    setVisible(prev => prev.map(num => num += 1))
  }

  function ScrollLeft() {
    const container = document.querySelector("#propsCarousel")
    const child = container.querySelector("div")
    if (child) {
      const scrollAm = child.offsetWidth
      container.scrollBy({left: -scrollAm, behavior: "smooth"})
    }
    
    
    setVisible(prev => prev.map(num => num -= 1))
  }
  
  return (
    <div style={{width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div>
        {
          visible.indexOf(0) < 0 &&
          <div style={{position: "absolute", zIndex: "60", left: "0px", cursor: "pointer", background: "#001F3F", padding: "10px 15px", borderRadius: "5px", color: "#fff"}} onClick={ScrollLeft}>
            <i className="fa fa-caret-left"></i>
          </div>
        }
      </div>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", position: "relative"}}>

        <div style={{display: "flex", width: "100%", overflow: "scroll", gap: "10px", padding: "0 100px"}} id="propsCarousel">
            {
              properties.length > 0 && developers.length > 0 && properties.slice(0, 9).map((prop, index) => {
              return (
                <a href={`/Projects/${prop.title.replaceAll(" ", "-")}`}>

                  <div style={{width: "400px", display: "flex", alignItems: "center", justifyContent: "center"}} className="prop">
                    <div key={index} style={{display: "flex", width: "456px", alignItems: "start", border: "1px solid #ccc", boxShadow: "0 1px 8px 0 #ccc", flexDirection: "column", borderRadius: "10px", overflow: "hidden", opacity: visible.indexOf(index) >= 0 ? "1" : ".4"}}>
                      <div style={{width: "100%", height: "212px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderRadius: "10px", overflow: "hidden"}}>
                        <img src={`/api/file/${JSON.parse(prop.images.replaceAll("{", "[").replaceAll("}", "]"))[0]}`} style={{objectFit: "cover"}} alt="" />
                        <div style={{position: "absolute", bottom: "20px", left: "0px", padding: "10px", background: "#001F3F", borderBottomRightRadius: "50px", borderTopRightRadius: "15px", color: "#fff"}}>
                          {developers.filter(dev => parseInt(dev.id) === parseInt(prop.developer_id))[0].name}
                        </div>
                      </div>

                      <div style={{width: "100%", padding: "10px"}}>
                        <h3 style={{margin: "0px", padding: "0px", color:"#000"}}>{prop.title}</h3>
                        <p style={{fontWeight: "600", color:"#000"}}>
                          <i className="ri-map-pin-fill" style={{color: "#001F3F", marginRight: "5px"}}></i>
                          {locations.filter(loca => loca.id === parseInt(prop.location))[0].name}
                        </p>
                        <p style={{fontWeight: "600", color:"#000"}}>
                          <i className="ri-hotel-bed-fill" style={{color: "#001F3F", marginRight: "5px"}}></i>
                          {prop.bedrooms}
                        </p>
                        <p style={{fontWeight: "600", color:"#000"}}>
                          <i className="ri-wallet-3-line" style={{color: "#001F3F", marginRight: "5px"}}></i>
                          {prop.payment_plan}
                        </p>
                        <p style={{fontWeight: "600", color:"#000"}}>
                          <i className="ri-calendar-2-fill" style={{color: "#001F3F", marginRight: "5px"}}></i>
                          {new Date(prop.handover).getMonth() + "-" + new Date(prop.handover).getFullYear()}
                        </p>
                        <div style={{borderTop: "1px solid #ccc", color:"#333", width: "80%", padding: "10px 0", position: "relative", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                          <small>Price From</small>
                          <p style={{fontWeight: "600", margin: "5px"}}>{prop.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              )})
            }
        </div>
      </div>
      <div>
        {
          visible.indexOf(8) < 0 &&
          <div style={{position: "absolute", zIndex: "60", right: "0px", cursor: "pointer", color: "#fff", background: "#001F3F", padding: "10px 15px", borderRadius: "5px"}} onClick={ScrollRight}>
            <i className="fa fa-caret-right"></i>
          </div>
          }
      </div>
      <div style={{position: "absolute", bottom: "-50px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"}}>
        {[0, 3, 6].map((index) => {
          return (
            <div onClick={() => {ScrollNextThree(index)}} style={{width: "40px", height: "10px", border: "1px solid gray", background: visible[0] === index || visible[0] === index + 1 || visible[0] === index + 2  ? "gray" : "#fff"}} key={index}></div>
          )
        })}
      </div>
    </div>
  )
}