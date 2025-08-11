import React, { useState, useEffect } from "react";
import img1 from "../../../assets/home-images/02.webp";
import img2 from "../../../assets/home-images/03.webp";
import img3 from "../../../assets/home-images/04.webp";
import img4 from "../../../assets/home-images/05.webp";
import img5 from "../../../assets/home-images/06.webp";
import img6 from "../../../assets/home-images/07.webp";

function Section2() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const slides = [
    [img1, img2, img3, img4],
    [img3, img4, img5, img6],
  ];

  const nextSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Touch handling for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      nextSlide();
    } else if (touchStart - touchEnd < -100) {
      prevSlide();
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto my-8 overflow-hidden group">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <div className="flex flex-wrap justify-center">
              {slide.map((img, imgIndex) => (
                <img
                  key={imgIndex}
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full sm:w-1/2 md:w-1/4 p-2 object-cover h-64"
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
