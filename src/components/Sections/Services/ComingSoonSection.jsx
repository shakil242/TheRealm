// ComingSoonSection.js
import React from "react";
import apexIcon from "../../../assets/Service-page-images/apex-icon.png";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import { HiPlus } from "react-icons/hi2"; // or "react-icons/hi"


const features = [
  "Frictionless Banking",
  "Endless Crypto Wallets",
  "Decentralized Banking",
  "Global Acceptance In Over 210 Countries",
  "Instant Transfers Wallet to Wallet",
  "High Limit ATM Withdrawals",
  "Instant Rewards Program",
];

const ComingSoonSection = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row justify-center px-4 lg:px-8 bg-[#232323]">
      <div>
        {/* left content */}
        <div>
          <p className="mb-2 mt-4 text-[13px] font-semibold">RESERVE YOUR CARD NOW</p>
          <h1 className="text-2xl md:text-5xl font-bold mt-5">
            OUR 2025 <br className="hidden md:block" />
            PROJECT
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center md:-ml-30 w-[100%]">
          <div className="flex justify-center mt-8">
            <img src={apexIcon} alt="Apex Icon" className="w-[70%] md:w-[60%] lg:w-[40%]" />
          </div>
          <div className="flex justify-center ">
            <button className="px-6 py-2 bg-[#1598D8]">Click Here</button>
          </div>
        </div>
      </div>

      {/* right content */}
      <div className="flex flex-col md:mt-0 mt-8 relative ">
        <div className="absolute right-0 top-0 p-2">
          <button className="flex items-center gap-2 font-semibold">
            View All{" "}
            <FaArrowRight
              className="bg-[#7a4ff4] text-white rounded-full w-8 h-8 p-2 cursor-pointer"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="text-center leading-6 mt-12">
          <h1 className="text-[26px] md:text-5xl font-bold">COMING SOON!</h1>
          <h1 className="text-[26px] md:text-5xl font-semibold">
            The Apex NFT Card™ Features
          </h1>
        </div>

        <div>
          <ul className="space-y-4 mt-8 lg:ml-[-80px] border-b">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-white text-base">
                <FaCheck className="text-[#7a4ff4] mr-4" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 lg:ml-[-80px] mt-10 lg:px-0">
          <div className="border-b">
            <div className="w-full flex justify-between items-center text-left font-bold uppercase">
              <span className="text-xl md:text-3xl text-[#1ba9ed]">
                BRAODWALK ISLAND <span className="text-gray-300 text-sm">/ ADVERTISEMENT</span>
              </span>
              <HiPlus className="size-8 text-[#2CAED9]" />
            </div>
            <div className="mt-4"></div>
          </div>

          <div className="border-b">
            <div className="w-full flex justify-between items-center text-left font-bold uppercase">
              <span className="text-xl md:text-3xl text-[#1ba9ed]">
                COMEMERCE CENTER <span className="text-gray-300 text-sm">/ ADVERTISEMENT</span>
              </span>
              <HiPlus className="size-8 text-[#2CAED9]" />
            </div>
            <div className="mt-4"></div>
          </div>

          <div className="border-b">
            <div className="w-full flex justify-between items-center text-left font-bold uppercase">
              <span className="text-xl md:text-3xl text-[#1ba9ed]">
                GRAND ISLAND{" "}
                <span className="text-gray-300 text-sm">
                  / <br className="block md:hidden" /> ADVERTISEMENT
                </span>
              </span>
              <HiPlus className="size-8 text-[#2CAED9]" />
            </div>
            <div className="mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonSection;
