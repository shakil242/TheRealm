import React from "react";
import img1 from "../../../assets/home-images/logo2.png";
import img2 from "../../../assets/home-images/sec08.jpg";
import img3 from "../../../assets/home-images/22.webp";
import img4 from "../../../assets/home-images/logo.png";
import { MdEdit } from "react-icons/md";

function Section8() {
  return (
    <div
      className="relative items-center z-10 grid grid-cols-1 px-4 py-20"
      style={{
        backgroundImage: `url(${img2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center align-middle flex-col md:text-left">
          <img src={img1} alt="bed" className="w-2xl h-2xl self-center mt-24" />
        </div>
        <div className="text-center text-white mt-10 text-[14px] font-bold">
          <h6 className="mb-6">AN ENDLESS WORLD</h6>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 leading-tight">
            DISCOVER THE EXCITING OPPORTUNITY
            <br />
            OF BUYING AND RESELLING VIRTUAL
            <br />
            PROPERTIES
          </h2>
        </div>
        <div className="flex justify-center lg:justify-start">
          <button className="flex items-center justify-center gap-2 mx-auto text-sm font-semibold bg-white hover:bg-gray-200 uppercase cursor-pointer text-black py-4 px-12 transition duration-300">
            <MdEdit size={16} />
            Browse Land Titles
          </button>
        </div>
        <div className="flex justify-center items-center flex-col space-x-8 mt-10">
          <img src={img3} alt="Superrare" className="h-5/12 w-5/12" />
          <img src={img4} alt="SportsArenas" className="h-9/12 w-9/12" />
        </div>
      </div>
    </div>
  );
}

export default Section8;
