import React from "react";
import people from "../../../assets/home-images/23.webp";
import fanbase from "../../../assets/home-images/30.png";
import { FaArrowRight } from "react-icons/fa6";

function Section10() {
  return (
    <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center z-10 mt-20">
      <div className="flex justify-center align-middle flex-col md:text-left">
        <img
          src={fanbase}
          alt="fanbase"
          className="w-full h-full self-center"
        />
        <img
          src={people}
          alt="people"
          className="w-full h-full pr-32 self-center"
        />
        <div className="bg-[#7A4AA4] ">
          <p className="text-white font-bold">
            We’re building a Hyper Realistic New Multiverse.
          </p>
          <span className="bg-white rounded-full">
            <FaArrowRight />
          </span>
        </div>
      </div>
      <div className="flex justify-center align-middle flex-col md:text-left pl-24">
        <div className="flex items-center mb-2">
          <span className="uppercase text-sm font text-white tracking-wider">
            9 Island locations
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold leading-tight uppercase mb-4 text-white">
          V-COMMERCE
        </h2>
        <p className="text-gray-300 mb-6 max-w-lg ">
          Just Imagine Owning Commercial Property Surrounded By The Medical
          Industry. Our Vision for a Hyper Realistic World built around
          V-Commerce is becoming a reality for millions of people from all walks
          of life. We are truly living in the most incredible technologically
          advanced generation on earth.
        </p>
        <div>
          <div className="flex justify-between text-white mb-2">
            <p>BUILT ON SCALABILITY</p> <span>2025</span>
          </div>
          <p>Graphic & Animation</p>
          <p>
            The Unreal Engine provides scalability and infrastructure that is
            unsurpassed.
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Section10;
