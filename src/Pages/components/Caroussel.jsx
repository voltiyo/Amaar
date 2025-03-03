import React, { useState } from 'react';
import './Caroussel.css'; // Ensure to include the corresponding CSS


const CarouselLeftArrow = ({ onClick }) => (
  <a href="#" className="carousel__arrow carousel__arrow--left" onClick={onClick}>
    <span className="fa fa-2x fa-angle-left" />
  </a>
);

const CarouselRightArrow = ({ onClick }) => (
  <a href="#" className="carousel__arrow carousel__arrow--right" onClick={onClick}>
    <span className="fa fa-2x fa-angle-right" />
  </a>
);

const CarouselIndicator = ({ index, activeIndex, onClick }) => (
  <li>
    <a
      className={index === activeIndex ? "carousel__indicator carousel__indicator--active" : "carousel__indicator"}
      onClick={() => onClick(index)}
    />
  </li>
);


const Carousel = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const goToSlide = (index) => {
    setActiveIndex(index);
  };
  
  const goToPrevSlide = (e) => {
    document.querySelector(".carousel__slides").scrollBy({ left: -450, behavior: "smooth" });
    e.preventDefault();
    setActiveIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };
  
  const goToNextSlide = (e) => {
    document.querySelector(".carousel__slides").scrollBy({ left: 450, behavior: "smooth" });
    e.preventDefault();
    setActiveIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel" style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", paddingBottom: "20px"}}>
      <CarouselLeftArrow onClick={goToPrevSlide} />
      <ul className="carousel__slides" style={{display: "flex", gap: "30px", overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none", width: "95%"}}>  
          <style>{`
        ul::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        {slides.map((slide, index) =>{
          return (
            <li key={index} className={index === activeIndex ? "carousel__slide carousel__slide--active" : "carousel__slide"} style={{height: "fit-content", width: "fit-content", borderRadius: "10px", boxShadow: "0px 5px 5px 5px #0000001a", marginBottom: "50px"}}>
            <div style={{height: "461px", width: "408px"}}>
              <div style={{position: "relative", width: "408px", height: "212px"}}>
                <img src={`/api/file/${JSON.parse(slide.images.replace("{","[").replace("}", "]"))}`} alt="" style={{width: "408px", borderRadius: "10px"}} />
                <div style={{position: "absolute"}} className='featured-img-span'>
                  <p>{slide.name}</p>
                </div>
              </div>
              <div style={{padding: "20px"}}>
                <h2 style={{color: "#2b3b3a", textAlign: "left", margin: "0px"}}>{slide.name}</h2>
                <ul style={{display: "flex", flexDirection: "column", gap: "0px", borderBottom: ".5px solid #757575"}}>  
                  <li style={{display: "flex", alignItems: "center", gap: "5px", height: "30px", justifyContent: "center"}}>
                    <p style={{color: "#757575", fontSize: "1.5rem", textAlign: "center"}}>{slide.title}</p>
                  </li>
                  <li style={{display: "flex", alignItems: "center", gap: "5px", height: "30px"}}>
                    <i className="fa-solid fa-bed" style={{color: "#001F3F"}}></i>
                    <p style={{color: "#757575"}}>{slide.bedrooms} bedrooms</p>
                  </li>
                  <li style={{display: "flex", alignItems: "center", gap: "5px", height: "30px"}}>
                    <i className="fa-solid fa-toilet" style={{color: "#001F3F"}}></i>
                    <p style={{color: "#757575"}}>{slide.bathrooms} bathrooms</p>
                  </li>
                  <li style={{display: "flex", alignItems: "center", gap: "5px", height: "30px"}}>
                    <i className="fa-solid fa-ruler" style={{color: "#001F3F"}}></i>
                    <p style={{color: "#757575"}}>{slide.size}</p>
                  </li>
                </ul>
                <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                  <p style={{marginBottom: "0px", fontSize: "0.75rem", color: "#757575"}}>Price From</p>
                  <p style={{margin: "0px", fontSize: "1.5rem", color: "#757575"}}>{slide.price}</p>
                </div>
              </div>
            </div>
          </li>

          )
        } 
        )}
      </ul>
      <CarouselRightArrow onClick={goToNextSlide} />
      
    </div>
  );
};

export default Carousel;
