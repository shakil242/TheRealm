import React from "react";
import coastergirl from "../../../assets/Enter-the-realm-images/boardwalk-2-scaled.jpg";
import fanbase from "../../../assets/home-images/30.png";

function Section4() {
  return (
    <div className="relative mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center py-10 lg:py-0 lg:mt-20">
      {/* Image Section */}
      <div className="w-full h-full">
        <img
          src={coastergirl}
          alt="Hyper realistic world"
          className="w-full h-full object-cover max-h-[50vh] lg:max-h-none"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center h-full p-26">
        <div className="flex items-center mb-4">
          <span className="uppercase text-sm font-bold text-white tracking-wider">
            enter the realm
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight uppercase mb-4 text-white">
          and Discover <br /> Hyper-Realism
        </h2>
        <h4 className="text-[14px] leading-tight uppercase mb-4 text-white">
          No matter what age group you fall into, you can <br /> create your
          digital self.
        </h4>

        <p className="text-[#D6D6DE] mb-6 text-base sm:text-lg text-justify pl-10 border-l-2 border-l-[#DCCD1C]">
          Boardwalk Island, nestled within The Realm, is a vibrant escape where
          adventure meets relaxation. Stroll along the scenic boardwalk, lined
          with charming shops and eateries, or dive into thrilling waterfront
          activities. Whether you're soaking up the sun on pristine beaches,
          exploring local entertainment, or indulging in fresh coastal cuisine,
          Boardwalk Island offers a perfect blend of excitement and tranquility.
        </p>
        <img src={fanbase} alt="fanbase" className="mb-10" />

        <div className="flex justify-center">
          <button className="flex items-center gap-2 text-sm sm:text-[14px] font-semibold bg-[#7A4FF4] hover:bg-[#5d2ae9]  uppercase cursor-pointer text-white py-3 px-8 sm:py-4 sm:px-10 transition duration-300">
            About Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section4;
