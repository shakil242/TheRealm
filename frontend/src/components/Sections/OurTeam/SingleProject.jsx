import React from 'react';
import broadwalk from "../../../assets/Enter-the-realm-images/boardwalk-2-scaled.jpg";
import { FaTwitter, FaFacebookF, FaEnvelope, FaLink } from "react-icons/fa";
import { div } from 'framer-motion/client';

// Tailwind animation
const marqueeStyle = `
@keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }}
`;

function SingleProject() {
  return (
    
    <>
    <div className='overflow-hidden'>

    
      {/* Inject marquee keyframes */}
      <style>{marqueeStyle}</style>

      {/* Main container */}
      <div className="min-h-screen bg-[#0c0c11] max-w-7xl mx-auto px-4 ">
        {/* Main Title */}
        <h1 className="lg:text-[2.7rem] text-2xl ml-3 font-bold uppercase text-white p-7 mb-5">
          Boardwalk Island
        </h1>

        {/* Content Wrapper */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mt-8">
          {/* Left Section */}
          <div className="lg:w-1/3 w-full lg:sticky lg:top-28 h-fit text-white p-6 px-12">
            <p className="text-[#bfbebe] leading-7">
              Boardwalk Island is a theme park related island location mashup of all of Sea World, Universal Studios, Busch Gardens and Disneyland combined with Water Parks, Zoos, Safaris, Rodeos and Rollercoasters.
            </p>

            {/* Info Section */}
            <div className="mt-10 lg:pr-23 space-y-3 text-base">
              <div className="flex justify-between pb-2">
                <span className="font-semibold">Location</span>
                <span className="text-[#bfbebe]">Boardwalk Island</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-semibold">Date</span>
                <span className="text-[#bfbebe]">January, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Author</span>
                <span className="text-[#bfbebe]">Randy Gruber</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 mt-8 text-lg">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <FaEnvelope />
              </a>
              <a href="#" className="hover:text-gray-400 transition-colors">
                <FaLink />
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 flex flex-col text-white space-y-6 lg:mt-7 mt-0">
            <img
              src={broadwalk}
              alt="Boardwalk Island"
              className="w-full h-full"
            />
            
            
          </div>
        </div>
       {/* Full-width marquee inside same section flow */}

<div className="relative -mx-[calc((100vw-100%)/2)] overflow-hidden py-6">
  <p
    className=" font-extrabold uppercase  inline-block"
    style={{
      animation: "marquee 140s linear infinite",
      paddingRight: "100%",
      whiteSpace: "nowrap",
    }}
  >
   <span className="text-[10rem] font-bold uppercase text-[#2dbe20]">
      Boardwalk Island of Adventure • Boardwalk Island of Adventure •
    </span>
   
   
  </p>
  
</div>



      </div>

     
</div>
    </>
  );
}

export default SingleProject;