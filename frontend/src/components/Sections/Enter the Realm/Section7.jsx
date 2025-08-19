import React, { useState } from "react";
import earth from "../../../assets/home-images/29.png";
import roundR from "../../../assets/home-images/2.png";
import vshw from "../../../assets/Enter-the-realm-images/lt-V-shw.png";
import { img } from "framer-motion/client";

function Section7() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-start mt-40 mb-10">
      {/* Left Image */}
      <div className="flex justify-center flex-col items-center h-full">
        <h1 className="text-white font-bold text-[42px] text-center uppercase leading-[47px] mb-8">
          We can help you discover <br /> properties in <br /> The Realm™
        </h1>
        <p className="text-[#C6C6CE] text-center mb-6 max-w-96 mt-6">
          We sell you the land blocks to build anything you want within the
          Zoning you Purchased. Then you can re-sell them if you wish and YOU
          keep the profits in your Apex Crypto Wallet Account!
        </p>
        <button className="flex items-center gap-2 text-sm sm:text-[14px] font-semibold bg-[#7A4FF4] hover:bg-[#5d2ae9]  uppercase cursor-pointer text-white py-3 px-8 sm:py-4 sm:px-10 transition duration-300">
          About Us
        </button>
      </div>

      {/* Right Form */}
      <div className="flex flex-col items-center md:items-center text-center">
        <div
          className="relative w-4/5 h-4/5 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={earth}
            alt="The Realm Globe"
            className={`w-full h-full object-contain transition-opacity duration-1000 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`absolute inset-0 flex justify-center items-center border-2 border-white rounded-full p-2 transition-opacity duration-1000 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={roundR}
              alt="The Realm Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section7;
