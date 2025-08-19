// RightImageSection.js
import React from "react";
import personwithcard from "../../../assets/Service-page-images/PersonWithCard.jpg";
import goldmember from "../../../assets/home-images/07.webp";
import platinumcard from "../../../assets/Service-page-images/platinumcard.png";

const RightImageSection = () => {
  return (
    <div className="w-full md:w-1/2 flex flex-col items-center relative mt-10 md:mt-0">
      <div className="relative w-full max-w-[550px] flex items-center justify-center">
        <img
          alt="person with card"
          src={personwithcard}
          className="object-cover w-full h-[350px] sm:h-[450px] md:h-[600px]"
          style={{ filter: "blur(0px)" }}
        />

        <div className="absolute bottom-[-20px] left-24 md:left-auto md:lg:left-7 transform -translate-x-1/2  w-[70%] max-w-[300px] group">
          {/* Default Image */}
          <img
            alt="crypto card"
            src={goldmember}
            className="md:w-full w-[90%] transition-opacity duration-300 opacity-100 group-hover:opacity-0"
          />

          {/* Hover Image */}
          <img
            alt="crypto card hover"
            src={platinumcard}
            className="md:w-full w-[90%] absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
};

export default RightImageSection;
