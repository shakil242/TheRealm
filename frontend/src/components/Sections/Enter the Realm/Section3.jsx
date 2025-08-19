import React from "react";

function Section3() {
  return (
    <div className="relative max-w-full mx-auto overflow-hidden">
      <div
        className="flex whitespace-nowrap my-8 text-[17px]"
        style={{ animation: "marquee 20s linear infinite" }}
      >
        <h1 className="inline-block text-[10vw] md:text-[170px] tracking-tighter font-bold uppercase leading-none text-[#7A4FF4] px-4">
          Enter the REALM™
        </h1>
        <h1 className="inline-block text-[10vw] md:text-[170px] font-bold tracking-tighter uppercase leading-none text-[#7A4FF4] px-4">
          enter The REALM™
        </h1>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default Section3;
