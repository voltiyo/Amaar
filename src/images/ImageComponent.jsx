import React from 'react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ImageShower = ({ images }) => {
  const newImages = images.map(image => "/api/file/" + image)
  const galleryImages = newImages.map((image, index) => ({
    original: image,
    thumbnail: image,
    description: String(index + 1),
  }));

  return (
    <div>
      <style>
        {
          `
            .image-gallery-slides img {
              width: 100%;
              height: 400px;
              object-fit: cover;
            }
            .image-gallery-slides {
              width: 100%;
            }
            .image-gallery {
              width: 100%;
            }
            .image-gallery-swipe {
              width: 100%;
            }
            .image-gallery-slide-wrapper {
              width: 100%;
            }
            .image-gallery-content {
              width: 100%;
              }
            #propertyImageGallery {
              width: 90%;
            }
          `
        }
      </style>
      <Gallery items={galleryImages} onScreenChange={() => { const images = document.querySelectorAll(".image-gallery-slides img"); for (const image of images) { if(image.style.height === "auto") {image.style.height = "400px"} else {image.style.height = "auto"}  } }} lazyLoad={true} disableThumbnailSwipe ={false}/>
    </div>
  );
};

export default ImageShower;
