import React from "react";
import img1 from "../../../assets/home-images/11.png";
import img2 from "../../../assets/home-images/12.png";
import img3 from "../../../assets/home-images/13.png";
import img4 from "../../../assets/home-images/14.png";
import img5 from "../../../assets/home-images/15.png";
import img6 from "../../../assets/home-images/16.png";
import img7 from "../../../assets/home-images/17.png";
import img8 from "../../../assets/home-images/18.png";
import img9 from "../../../assets/home-images/19.png";
import img11 from "../../../assets/home-images/21.png";

const logos = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img11];

function Section7() {
  return (
    <div className="py-12 px-4">
      <h2 className="text-2xl md:text-3xl text-white font-bold text-center mb-8">
        OUR TECHNOLOGY PARTNERS AND INTEGRATED PLATFORMS
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex justify-center items-center p-4 rounded-lg transition-all duration-300 group"
          >
            <img
              src={logo}
              alt={`Partner Logo ${index + 1}`}
              className="h-16 object-contain opacity-50 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section7;
