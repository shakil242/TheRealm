import React from "react";
import { MdEdit } from "react-icons/md";

function Section13() {
  return (
    <div>
      <div className="relative max-w-full mx-auto my-4 overflow-hidden">
        <div
          className="flex whitespace-nowrap text-[17px]"
          style={{ animation: "marquee 20s linear infinite" }}
        >
          <h1 className="inline-block text-[10vw] md:text-[170px] font-bold uppercase leading-none text-[#5192c4] px-4 tracking-tight">
            join us today
          </h1>
          <h1 className="inline-block text-[10vw] md:text-[170px] font-bold uppercase leading-none text-[#5192c4] px-4 tracking-tight">
            join us today
          </h1>
        </div>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
      <div>
        <div className="flex justify-center lg:justify-center">
          <button className="flex items-center gap-2 font-bold text-[13px] mb-2 py-4 px-8 bg-white hover:bg-gray-200 uppercase cursor-pointer text-black transition duration-300">
            <MdEdit size={14} />
            Become A Sponcer
          </button>
        </div>
        <div className="text-center text-white font-bold text-4xl mt-10 uppercase">
          <p>
            Athletes | promoters | groups | celebrities <br />
            performers | writers | artists
          </p>
        </div>
      </div>
    </div>
  );
}

export default Section13;
