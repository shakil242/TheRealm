import React from "react";
import people from "../../../assets/home-images/23.webp";
import fanbase from "../../../assets/home-images/30.png";
import { FaArrowRight } from "react-icons/fa6";
import unrealEngine from "../../../assets/home-images/14.png";

function Section11() {
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
        <div className="bg-[#7A4FF4] absolute w-80 h-80 bottom-0 left-80 p-4 flex justify-center items-center">
          <p className="text-white text-[24px] font-bold px-12 uppercase">
            We’re building a Hyper Realistic New Multiverse.
          </p>

          <span className="bg-white rounded-full p-2 self-end">
            <FaArrowRight className="text-[#7A4FF4]" />
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
        <p className="text-gray-300 mb-6 max-w-lg text-[17px] ">
          Just Imagine Owning Commercial Property Surrounded By The Medical
          Industry. <br />
          <p className="mt-4 text-[17px]">
            Our Vision for a Hyper Realistic World built around V-Commerce is
            becoming a reality for millions of people from all walks of life. We
            are truly living in the most incredible technologically advanced
            generation on earth.
          </p>
        </p>
        <div>
          <div className="flex justify-between text-white mb-2 text-[19px] font-bold">
            <p>BUILT ON SCALABILITY</p> <span>2025</span>
          </div>
          <p className="text-gray-500">Graphic & Animation</p>
          <p className="text-gray-400 text-[17px] mt-4">
            The Unreal Engine provides scalability and infrastructure that is
            unsurpassed.
          </p>
        </div>
        <div>
          <div className="flex justify-between text-white mb-2 text-[19px] mt-8 font-bold">
            <p>OUR DEVELOPMENT TEAM</p> <span>2025</span>
          </div>
          <p className="text-gray-500 text-center mt-4">
            Iconic Scalability with Unity and Unreal Engine
          </p>
          <div className="justify-center flex items-center">
            <img
              src={unrealEngine}
              alt="unrealEngine"
              className="h-2/4 w-2/4"
            />
          </div>
          <p className="text-center text-gray-400 mt-7 text-[17px]">
            Our network of developers are not only are the best at what they do,
            they love what they do!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Section11;
