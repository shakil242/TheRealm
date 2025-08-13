// HeaderMarquee.js
import React from "react";

const HeaderMarquee = () => {
  return (
    <header className=" px-2 sm:px-12 overflow-hidden relative">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee 20s linear infinite",
        }}
      >
        <h1 className="text-[10vw] md:text-[170px] font-bold uppercase leading-none text-[#1895f5] tracking-tight mx-8">
          APEX CARD SERVICE INSIDE THE REALM™
        </h1>
        <h1 className="text-[10vw] md:text-[170px] font-bold uppercase leading-none text-[#1895f5] tracking-tight mx-8">
          APEX CARD SERVICE INSIDE THE REALM™
        </h1>
      </div>

      <style >{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </header>
  );
};

export default HeaderMarquee;
