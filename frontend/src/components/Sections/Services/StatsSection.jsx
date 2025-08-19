// StatsSection.js
import React from "react";
import { BsFillBuildingFill } from "react-icons/bs";
import { FaAward } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";

const stats = [
  {
    label: "Banks",
    value: "6+",
    icon: <BsFillBuildingFill className="size-8 lg:size-18" />,
  },
  {
    label: "Cards",
    value: "20+",
    icon: <FaAward className="size-8 lg:size-18" />,
  },
  {
    label: "Members",
    value: "1M",
    icon: <HiUserGroup className="size-8 lg:size-18" />,
  },
];

const StatsSection = () => {
  return (
    <div className="w-full md:w-1/2 max-w-xl">
      <div className="mb-2 text-[13px] font-semibold tracking-widest uppercase ">
        ITS A BRAVE NEW WORLD
      </div>
      <div className="mb-5 text-3xl sm:text-5xl lg:text-5xl font-semibold lg:font-bold uppercase leading-tight">
        WE ARE BUILDING A BRAND NEW
        <br />
        CRYPTO BASED WORLD!
      </div>
      <div className="mb-5 text-md text-zinc-300 max-w-xl leading-7 ">
        Client can have his / her own personal private network to facilitate
        business and personal payments are always rapidly and discretely placed.
        All accounts are high volume numbered accounts.
      </div>
      <div className="mt-8 mb-3 text-3xl lg:text-[2.5rem] font-bold uppercase tracking-wide text-center md:text-left">
        OUR TARGET MARKET
      </div>

      <div className="flex justify-center lg:justify-start space-x-8 mt-6 flex-wrap">
        {stats.map(({ label, value, icon }) => (
          <div key={label} className="flex flex-col items-center min-w-[80px]">
            <div className="text-lg text-zinc-300 font-semibold tracking-wide mb-2">
              {label}
            </div>
            <div className="mb-2">{icon}</div>
            <div className="font-extrabold text-3xl lg:text-5xl">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
