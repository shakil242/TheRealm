import React from "react";
import StateBuild from "../../../assets/home-images/build.png";
import { MdEdit } from "react-icons/md";

function Section6() {
  return (
    <div className="relative mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center py-10 lg:py-0 lg:mt-20">
      {/* Image Section */}
      <div className="w-full h-full order-1 lg:order-none">
        <img
          src={StateBuild}
          alt="Hyper realistic world"
          className="w-full h-full object-cover max-h-[50vh] lg:max-h-none"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center h-full px-6 md:px-10 lg:pl-20 lg:pr-10 py-10 lg:py-0">
        <div className="flex items-center mb-2">
          <span className="uppercase text-sm font-medium text-white tracking-wider">
            What a world it is...
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight uppercase mb-4 text-white">
          We are creating a Hyper Realistic New world
        </h2>

        <p className="text-gray-300 mb-6 text-base sm:text-lg text-justify">
          Building worlds takes time and an enormous amount of dedication to get
          The Realm® not only functioning at peak performance but safe for
          everyone. That is why we are offering Brokerships, and Agents the
          ability to get the first release of properties as we continue building
          our core. With the instant craze of the announcement of the Metaverse™
          the entire world was informed of a potential online (Virtual) world
          where avatars could interact with each other in a never before seen
          way. We at Alchemy Studios™ had envisioned this world in 2012 and were
          actively building our core in 2025.
        </p>

        <div className="flex justify-center lg:justify-start">
          <button className="flex items-center gap-2 text-sm sm:text-[14px] font-semibold bg-white hover:bg-gray-200 uppercase cursor-pointer text-black py-3 px-8 sm:py-4 sm:px-10 transition duration-300">
            <MdEdit size={16} />
            Get Yours Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section6;
