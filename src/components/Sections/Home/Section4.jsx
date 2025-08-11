import React from "react";
import building from "../../../assets/home-images/10.png";
import building2 from "../../../assets/home-images/09.png";

function Section4() {
  return (
    <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center z-10 mt-20">
      <div className="flex justify-center align-middle flex-col md:text-left">
        <img src={building} alt="bed" className="w-full h-full self-center" />
      </div>
      <div className="flex justify-center align-middle flex-col md:text-left pl-24">
        <img src={building2} alt="" className="w-72 self-center h-72" />
        <div className="flex items-center mb-2">
          <div className="w-8 border-b-2 border-purple-600 mr-3"></div>
          <span className="uppercase text-sm font text-white tracking-wider">
            Fractional ownership begins here
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold leading-tight uppercase mb-4 text-white">
          We Can Help You Discover Our World
        </h2>
        <p className="text-gray-300 mb-6 max-w-lg ">
          The Realm® is a stand-alone Multiverse that is not only hyper
          realistic but allows users to have a totally immersive experience and
          the ability to thrive financially in a decentralized alternate
          reality.
        </p>
        <div className="flex justify-center">
          <button className="text-[14px] bg-[#5192C4] hover:bg-sky-700 cursor-pointer text-white py-2 px-11 transition duration-300">
            See Location
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section4;
