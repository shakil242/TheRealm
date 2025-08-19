import React from "react";

function Section5() {
  return (
    <div className="relative max-w-full mx-auto my-8 overflow-hidden">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 10s linear infinite" }}
      >
        <h1 className="inline-block text-[10vw] md:text-[170px] font-bold uppercase leading-none text-[#5192c4] px-4 tracking-tight">
          Community the First V Community the First V
        </h1>
        <h1 className="inline-block text-[10vw] md:text-[170px] font-bold uppercase leading-none text-[#5192c4] px-4 tracking-tight">
          Community the First V Community the First V
        </h1>
      </div>
      {/* Stats Section */}
      <div className=" max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-2 text-center mt-6 text-white ">
        <div>
          <h3 className="font-semibold text-[19px] mb-4">Land Titles Sold</h3>
          <span className="text-6xl font-bold">1100+</span>
        </div>
        <div>
          <h3 className="font-semibold text-[19px] mb-4">Title Holders</h3>
          <span className="text-6xl font-bold">1548</span>
        </div>
        <div>
          <h3 className="font-semibold text-[19px] mb-4">Land Titles Cap</h3>
          <span className="text-6xl font-bold">80M</span>
        </div>
        <div>
          <h3 className="font-semibold text-[19px] mb-4">FRACS Cap</h3>
          <span className="text-6xl font-bold">180M</span>
        </div>
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

export default Section5;
