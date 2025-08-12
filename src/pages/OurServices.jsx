// OurServices.js
import React from "react";


import FanbaseImage from "../components/Sections/Services/FanbaseImage";
import HeaderMarquee from "../components/Sections/Services/HeaderMarquee";
import StatsSection from "../components/Sections/Services/StatsSection";
import RightImageSection from "../components/Sections/Services/RightImageSection";
import ServicesGrid from "../components/Sections/Services/ServicesGrid";
import ComingSoonSection from "../components/Sections/Services/ComingSoonSection";


import apexIcon from "../assets/Service-page-images/apex-icon.png";
import VideoSection from "../components/Sections/Services/VideoSection";
import Slider from "../components/Sections/Services/Slider";

const OurServices = () => {
  return (
    <main className="bg-[#020204] text-white min-h-screen overflow-x-hidden">
    <VideoSection/>
      <FanbaseImage/>

      <div className="min-h-screen bg-[#232323] text-white font-sans overflow-x-hidden">
        <div>
          <img src={apexIcon} alt="" className="w-[15%] mx-auto mt-8" />
        </div>
        <HeaderMarquee/>

        <main className="w-full flex flex-col md:flex-row items-center justify-center pt-8 pb-20 px-7 md:px-10 gap-6 md:gap-10 lg:gap-16 max-w-[1440px] mx-auto">
          <StatsSection />
          <RightImageSection />
        </main>
      </div>

      <ServicesGrid />
      <ComingSoonSection />
      <Slider/>
    </main>
  );
};

export default OurServices;
