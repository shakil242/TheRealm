import { div } from "framer-motion/client";
import React from "react";

function Section10() {
  return (
    <div className="relative max-w-full mx-auto my-8 overflow-hidden">
      <div
        className="flex whitespace-nowrap my-8"
        style={{ animation: "marquee 20s linear infinite" }}
      >
        <h1 className="inline-block text-[10vw] md:text-[170px] font-bold uppercase leading-none text-[#7A4FF4] px-4 tracking-tight">
          virtual properties in the REALM™
        </h1>
        <h1 className="inline-block text-[10vw] md:text-[170px] font-bold uppercase leading-none text-[#7A4FF4] px-4 tracking-tight">
          virtual properties in the REALM™
        </h1>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export default Section10;
