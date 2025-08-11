import React, { useState, useEffect } from "react";
import img1 from "../../../assets/home-images/02.webp";
import img2 from "../../../assets/home-images/03.webp";
import img3 from "../../../assets/home-images/04.webp";
import img4 from "../../../assets/home-images/05.webp";
import img5 from "../../../assets/home-images/06.webp";
import img6 from "../../../assets/home-images/07.webp";

function Section2() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [imagesPerSlide, setImagesPerSlide] = useState(2);

  const allImages = [img1, img2, img3, img4, img1, img2, img5, img6];

  // Adjust images per slide based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setImagesPerSlide(1);
      } else {
        setImagesPerSlide(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Split images into slides
  const slides = [];
  for (let i = 0; i < allImages.length; i += imagesPerSlide) {
    slides.push(allImages.slice(i, i + imagesPerSlide));
  }

  const nextSlide = () => {
    setSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative max-w-7xl mx-auto my-8 overflow-hidden group">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <div className="flex flex-wrap justify-center">
              {slide.map((img, imgIndex) => (
                <img
                  key={imgIndex}
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full sm:w-1/2 md:w-1/4 p-2 object-contain h-70"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold p-2 cursor-pointer bg-black bg-opacity-30 rounded-full hover:bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold p-2 cursor-pointer bg-black bg-opacity-30 rounded-full hover:bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        onClick={nextSlide}
      >
        ❯
      </button>
    </div>
  );
}

export default Section2;
