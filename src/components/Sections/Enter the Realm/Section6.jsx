import React from "react";
import stadium from "../../../assets/home-images/std.jpg";
import { Link } from "react-router-dom";
import fanbase from "../../../assets/home-images/30.png";
import apex from "../../../assets/Service-page-images/apex-icon.png";

function Section6() {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex mt-20"
      style={{ backgroundImage: `url(${stadium})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center text-white text-center px-4 w-full max-w-5xl mx-auto">
        {/* Play button */}
        <button className="rounded-full w-26 h-26 cursor-pointer border-2 border-white mb-4 flex items-center justify-center hover:bg-white/20 transition-all">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
          <Link className="ml-2 text-[18px]">Sign Up</Link>
        </button>

        {/* Main heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase mb-4 tracking-tight">
          BECOME A SPONSOR TODAY!
        </h1>

        {/* Fanbase logo */}
        <img
          src={fanbase}
          alt="fanbase"
          className="h-auto max-w-xs sm:max-w-sm md:max-w-lg mb-8"
        />

        {/* Sponsor button */}
        <button className="bg-[#3988ED] hover:bg-[#2a76d6] text-white font-semibold px-6 py-2 md:px-10 md:py-2 text-sm md:text-base mb-4 transition-colors">
          Become a Sponsor
        </button>

        {/* Description text */}
        <p className="text-base sm:text-lg md:text-xl mb-4 max-w-3xl mx-auto leading-relaxed">
          Bringing Sponsors Into The Realm With Apex Card Services Crypto
          Rewards
        </p>

        {/* Apex logo */}
        <img
          src={apex}
          alt="apex"
          className="h-20 w-20 md:h-36 md:w-36 opacity-90"
        />
      </div>
    </div>
  );
}

export default Section6;
