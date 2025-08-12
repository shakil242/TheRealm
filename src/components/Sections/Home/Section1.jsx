import React from "react";
import logo2 from "../../../assets/home-images/2.png";
import sec1 from "../../../assets/home-images/01.jpg";
import sec2 from "../../../assets/home-images/3.webp";
import sec3 from "../../../assets/home-images/30.png";

function Section1() {
  return (
    <div className="bg-black text-white mt-20 px-4 sm:px-6 lg:px-8 justify-center alicn-items-center my-2">
      {/* First Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <div className="flex justify-center">
          <div className=" my-6 rounded-full border-4 border-white flex items-center justify-center w-48 h-48">
            <img
              src={logo2}
              alt="The Realm Logo"
              className="h-32 w-32 object-contain"
            />
          </div>
        </div>
        <h4 className="text-sm md:text-4xl lg:text-2xl font-bold mb-6">
          BECOME A VIRTUAL LAND TITLE OWNER <br /> IN SOME OF THE LARGEST
          PROJECTS IN CRYPTO TOKENIZED <br /> TRADING AND AUCTIONS AND GET{" "}
          <br /> 1 (ONE) FRAC FREE!
        </h4>

        <div className="flex justify-center mb-6">
          <img src={sec2} alt="" className="w-3xs" />
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col text-center items-center justify-center my-6">
        <img
          src={sec1}
          alt="NFT Collection"
          className="w-2xl my-6 h-auto object-ccontain self-center"
        />

        <div className="space-y-6">
          <h2 className="text-lg font-bold">THE ONLINE VIRTUAL MARKETPLACE</h2>
          <h1 className="md:text-5xl lg:text-8xl font-bold  text-sky-700">
            AWAITS YOU
          </h1>
          <h1 className="text-3xl lg:text-4xl font-bold">
            GET STARTED WITH FRACTIONAL OWNERSHIP OF <br /> THE REALM™
          </h1>
          <button className="bg-[#5192C4] hover:bg-sky-700 cursor-pointer text-white py-2 px-10 text-[15px] transition duration-300">
            Learn More
          </button>
          <h1 className="md:text-5xl lg:text-8xl font-bold  text-sky-700">
            RESERVE YOURS NOW!
          </h1>
          <p className="mb-4 my-4 text-3xl lg:text-4xl font-bold">
            OWN YOUR OWN TOKENIZED PIECE OF THE REALM™
          </p>
          <p className="mb-4 my-4 text-gray-300 lg:text-md">
            Think of Pre Construction Certificates as the (Building Blocks) of a
            project. Each PCC is a Tokenized Brick <br /> contributing to the
            overall project.
          </p>
          <div className="mt-8 flex justify-center flex-col ">
            <p className="text-3xl lg:text-4xl font-bold">
              BECOME A REGISTERED SPONSER IN
            </p>
            <br />
            <p className="lg:text-2xl font-bold">
              THE ONLINE VIRTUAL MARKETPLACE
            </p>
            <br />
            <p className="text-3xl lg:text-4xl font-bold">WITH</p>
            <br />
            <img src={sec3} alt="" className="w-2xl self-center" />
            <p className="mt-10 text-3xl lg:text-4xl font-bold">
              AND THE APEX NFT CRYPTO CARD MEMBERSHIP
            </p>
            <p className="text-gray-300 lg:text-sm">
              BUY | SELL | BUILD | PROMOTE | TRADE AND GET PAID ON THE WORLD'S
              FIRST NFT CRYPTO DEBIT CARD
            </p>
          </div>
          <h1 className="my-4 text-3xl lg:text-4xl font-bold">
            THE APEX™ CRYPTO GOLD CARD <br /> COLLECTION
          </h1>
          <p className="mb-4 my-4 text-gray-300 lg:text-md">
            Buy, Sell, Auction and Store Your NFT Land Titles on Your Apex NFT
            Crypto Card.
          </p>
          <button className="mt-8 bg-[#5192C4] hover:bg-sky-700 cursor-pointer text-white py-2 px-10 text-[15px]">
            Early Member Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section1;
