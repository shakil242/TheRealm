import React, { useEffect, useState } from 'react';
import logo2 from "../../../assets/Our-Team-images/OurTeamlogo.png";
import OurTeamCover from '../../../assets/Our-Team-images/OurTeamCover.jpg';

export default function MainImage() {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowLogo(true), 200); // logo first
    setTimeout(() => setShowText(true), 1200); // then text
    setTimeout(() => setShowLine(true), 2200); // then line
  }, []);

  return (
    <div className="relative w-full font-sans ">
      {/* Background Image */}
      <img
        src={OurTeamCover}
        alt="Our Team Cover"
        className="w-full h-auto max-h-[95vh] object-cover"
      />

      {/* Logo */}
      <img
        src={logo2}
        alt="Logo"
        className={`
          absolute w-[82%] bottom-30 md:bottom-35 lg:bottom-11 
          left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          shadow-b-xl transition-all duration-1500 
          ${showLogo ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Text */}
      <div
        className={`
          hidden lg:block absolute bottom-37 left-1/2 -translate-x-1/2 text-center 
          uppercase font-semibold text-white text-xs md:text-sm leading-tight 
          tracking-[1.00521px] px-4 sm:px-0 max-w-[90%] 
          [text-shadow:3.5px_3.5px_5px_rgba(0,0,0,0.75)]
          transition-all duration-[2200ms] ease-out
          ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        GETTING THE MOST OUT OF YOUR fanbase SUBSCRIPTION
      </div>

      {/* Two lines */}
      <>
        <style>
          {`
            @keyframes lineGrow {
              0% { width: 0%; }
              100% { width: 100%; }
            }
            .line-grow {
              animation: lineGrow 0.5s ease-out forwards;
            }
          `}
        </style>

        <div className="absolute left-1/2 -translate-x-1/2 w-[95%] overflow-hidden md:bottom-13 lg:bottom-13 bottom-6">
          <div
            className={`md:h-[2px] h-[1.3px] bg-white mb-[2px] ${showLine ? "line-grow" : "w-0"}`}
          />
        </div>
      </>
    </div>
  );
}
