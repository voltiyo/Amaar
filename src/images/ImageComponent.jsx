// ImageShower.tsx
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ImageShower = forwardRef(({ images, onFullScreenChange, startIndex = 0 }, ref) => {
  const galleryRef = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const newImages = images.map(image => "/api/file/" + image);
  const galleryImages = newImages.map((image, index) => ({
    original: image,
    thumbnail: image,
    description: String(index + 1),
  }));

  useImperativeHandle(ref, () => ({
    toggleFullScreen: () => galleryRef.current?.fullScreen(),
    slideTo: (index) => galleryRef.current?.slideToIndex(index),
    isFullScreen,
  }), [isFullScreen]);

  return (
    <div>
      <style>{`
        .image-gallery-slides img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }
        .image-gallery-slides,
        .image-gallery,
        .image-gallery-swipe,
        .image-gallery-slide-wrapper,
        .image-gallery-content {
          width: 100%;
        }
        #propertyImageGallery {
          width: 90%;
        }
      `}</style>

      <Gallery
        ref={galleryRef}
        items={galleryImages}
        startIndex={startIndex}
        lazyLoad={true}
        disableThumbnailSwipe={false}
        onScreenChange={(fullScreen) => {
          setIsFullScreen(fullScreen);
          onFullScreenChange?.(fullScreen);
          const images = document.querySelectorAll(".image-gallery-slides img");
          for (const image of images) {
            image.style.height = fullScreen ? "auto" : "400px";
          }
        }}
      />
    </div>
  );
});

export default ImageShower;
