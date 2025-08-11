import React, { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import alchemylogo from "../assets/Service-page-images/alchemylogo.png";
import thumbnail from "../assets/Service-page-images/servive-video-thumbnail.jpg";
import fanbase from "../assets/home-images/30.png";
import goldmember from "../assets/home-images/07.webp";
import personwithcard from "../assets/Service-page-images/PersonWithCard.jpg";
import platinumcard from "../assets/Service-page-images/platinumcard.png";
import apexIcon from "../assets/Service-page-images/apex-icon.png";
import service1 from "../assets/Service-page-images/service-1.jpg";
import service2 from "../assets/Service-page-images/service-2.webp";
import service3 from "../assets/Service-page-images/service-3.jpg";
import service4 from "../assets/Service-page-images/service-4.jpg";
import { HiUserGroup } from "react-icons/hi2";
import { BsFillBuildingFill } from "react-icons/bs";
import { FaAward } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { HiPlus } from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa";




const OurServices = () => {
  
  const playerRef = useRef(null);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [showSourceInfo, setShowSourceInfo] = useState(false);
  const [openAd, setOpenAd] = useState(null);
   const features = [
    "Frictionless Banking",
    "Endless Crypto Wallets",
    "Decentralized Banking",
    "Global Acceptance In Over 210 Countries",
    "Instant Transfers Wallet to Wallet",
    "High Limit ATM Withdrawals",
    "Instant Rewards Program",
  ];


// object for icons
  const stats = [
    {
      label: "Banks",
      value: "6+",
      icon: <BsFillBuildingFill  className="size-8 lg:size-18" />,
    },
    {
      label: "Cards",
      value: "20+",
      icon: <FaAward className="size-8 lg:size-18"  />,
    },
    {
      label: "Members",
      value: "1M",
      icon: <HiUserGroup  className="size-8 lg:size-18" />,
    },
  ];
  // object for service card


const services = [
  {
    id: "01",
    title: "VIRTUAL SUPPORT",
    category: "Services",
    img: service1,
    link: "#",
  },
  {
    id: "02",
    title: "KNOWLEDGE BASE",
    category: "Services",
    img: service2,
    link: "#",
  },
  {
    id: "03",
    title: "VIRTUAL REAL ESTATE",
    category: "Services",
    img: service3,
    link: "#",
  },
  {
    id: "04",
    title: "ARCHITECTURAL SERVICES",
    category: "Services",
    img: service4,
    link: "#",
  },
];


  useEffect(() => {
    const player = new Player(playerRef.current);

    player.on("play", () => {
      setShowThumbnail(false);
      setShowSourceInfo(false);
    });

    player.on("pause", () => {
      if (!showThumbnail) {
        setShowSourceInfo(true);
      }
    });

    player.on("ended", () => {
      setShowSourceInfo(true);
    });
  }, [showThumbnail]);

  return (
    <main className="bg-[#020204] text-white min-h-screen overflow-x-hidden">
      {/* ===== Video Section ===== */}
      <section
        className="relative w-full overflow-x-hidden"
        style={{ paddingTop: "56.25%" }}
      >
        <iframe
          ref={playerRef}
          src="https://player.vimeo.com/video/1055755772?badge=0&autopause=0&player_id=0&app_id=58479"
          allow="autoplay;"
          className="absolute top-0 left-0 w-full h-full"
          title="Apex-Card-infomercial-2025"
        ></iframe>

        {showThumbnail && (
          <div
            className="absolute inset-0 bg-center bg-cover flex items-center justify-center cursor-pointer"
            style={{ backgroundImage: `url(${thumbnail})` }}
            onClick={() => {
              setShowThumbnail(false);
              setShowSourceInfo(true);
            }}
          >
            <div className="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-12 h-12 fill-white"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M438 392V642L642 517 438 392Z"></path>
              </svg>
            </div>
          </div>
        )}

        {showSourceInfo && (
          <div className="absolute top-0 left-0 animate-fadeIn p-3">
            <div className="flex items-center space-x-3 rounded-lg">
              <a
                href="https://vimeo.com/zcprime"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <img
                  src={alchemylogo}
                  alt="Alchemy Studios"
                  className="lg:w-15 lg:h-15 lg:block hidden rounded-full border-2 border-black hover:border-blue-500"
                />
              </a>
              <div className="flex flex-col space-y-1">
                <div className="bg-black px-2 py-1 rounded hover:bg-blue-500">
                  <a
                    href="https://vimeo.com/1055755772"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.8rem] lg:text-2xl font-bold text-white"
                  >
                    Apex-Card-infomercial-2025
                  </a>
                </div>
                <div className="bg-black px-2 py-1 w-fit rounded hover:bg-blue-500">
                  <a
                    href="https://vimeo.com/zcprime"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.8rem] lg:text-md font-semibold text-white"
                  >
                    Alchemy Studios
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Fanbase image */}
      <section className="w-full flex justify-center items-center mx-auto px-2">
        <img
          src={fanbase}
          alt=""
          className="max-w-[39rem] w-full h-auto object-contain"
        />
      </section>

      <div className="min-h-screen bg-[#232323] text-white font-sans overflow-x-hidden">
        <div>
          <img src={apexIcon} alt="" className="w-[15%] mx-auto mt-8" />
        </div>
        {/* Massive Blue Header */}
       <header className="pt-10 px-2 sm:px-12 overflow-hidden relative">
  <div
    className="flex whitespace-nowrap"
    style={{
      animation: "marquee 20s linear infinite",
    }}
  >
    <h1 className="text-[10vw] md:text-[170px] font-bold uppercase leading-none text-[#1895f5] tracking-tight mx-8">
      APEX CARD SERVICE INSIDE THE REALM™
    </h1>
    <h1 className="text-[10vw] md:text-[170px] font-bold uppercase leading-none text-[#1895f5] tracking-tight mx-8">
      APEX CARD SERVICE INSIDE THE REALM™
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
</header>


        {/* 2-column main section */}
      <main className="w-full flex flex-col md:flex-row items-center justify-center pt-8 pb-20 px-7 md:px-10 gap-6 md:gap-10 lg:gap-16 max-w-[1440px] mx-auto">

          {/* Left content */}
          <div className="w-full md:w-1/2 max-w-xl">
            <div className="mb-2 text-[13px] font-semibold  tracking-widest uppercase ">
              ITS A BRAVE NEW WORLD
            </div>
            <div className="mb-5 text-3xl sm:text-5xl  lg:text-5xl font-semibold lg:font-bold uppercase leading-tight">
              WE ARE BUILDING A BRAND NEW
              CRYPTO
              
              BASED WORLD!
            </div>
            <div className="mb-5 text-md text-zinc-300 max-w-xl leading-7 ">
              Client can have his / her own personal private network to
              facilitate business and personal payments are always rapidly and
              discretely placed. All accounts are high volume numbered accounts.
            </div>
            <div className="mt-8 mb-3 text-3xl lg:text-[2.5rem] font-bold uppercase tracking-wide text-center md:text-left">
  OUR TARGET MARKET
</div>

            <div className="flex justify-center lg:justify-start space-x-8 mt-6 flex-wrap">
              {stats.map(({ label, value, icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center min-w-[80px]"
                >
                  <div className="text-lg text-zinc-300 font-semibold tracking-wide mb-2">
                    {label}
                  </div>
                  <div className="mb-2">{icon}</div>
                  <div className="font-extrabold text-3xl lg:text-5xl">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image/content */}
         <div className="w-full md:w-1/2 flex flex-col items-center relative mt-10 md:mt-0">
  <div className="relative w-full max-w-[550px] flex items-center justify-center">
    <img
      alt="person with card"
      src={personwithcard}
      className="object-cover w-full h-[350px] sm:h-[450px] md:h-[600px]"
      style={{ filter: "blur(0px)" }}
    />

    <div className="absolute bottom-[-20px] left-24 md:left-auto md:lg:left-7 transform -translate-x-1/2  w-[70%] max-w-[300px] group">
      {/* Default Image */}
      <img
        alt="crypto card"
        src={goldmember}
        className="md:w-full w-[90%] transition-opacity duration-300 opacity-100 group-hover:opacity-0"
      />

      {/* Hover Image */}
      <img
        alt="crypto card hover"
        src={platinumcard}
        className="md:w-full w-[90%] absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
      />
    </div>
  </div>
</div>

        </main>
      </div>
        <section className="bg-black text-white py-18 px-4 md:px-4">
      <div className="text-center mb-8 md:w-[70%]  flex flex-col items-center justify-center mx-auto">
  <p className="uppercase text-[13px] md:text-sm tracking-wider font-bold">
    Corporate Service for Point of Sale
  </p>
  
  <h2 className="text-[20px] md:text-[3.25rem] font-bold leading-tight mt-2">
    WE&apos;LL EVEN HELP YOU SET UP YOUR VIRTUAL RETAIL STORE IN THE REALM™
  </h2>
  
  <h3 className="text-[20px] md:text-[3.25rem] font-bold mt-6">
    OUR OTHER SERVICES
  </h3>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <a
            key={service.id}
            href={service.link}
            className="relative group overflow-hidden  shadow-lg"
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-[28rem] object-cover  brightness-70"
            />
              <div className="absolute inset-0  group-hover:bg-black/60 transition-all duration-500"></div>
            <div className="absolute inset-0 mt-[230px] bg-opacity-40 flex flex-col items-center justify-center p-4">
              <span className="text-7xl font-bold">{service.id}</span>
              <h4 className="text-2xl font-bold mt-2 text-center">{service.title}</h4>
              <p className="text-lg">{service.category}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
    {/* coming soon section */}
 <div className="w-full flex flex-col lg:flex-row justify-center px-4 lg:px-8 bg-[#232323]">
      <div>
      {/* left content */}
      <div>
        <p className="mb-2 mt-4 text-[13px] font-semibold">RESERVE YOUR CARD NOW</p>
        <h1 className="text-2xl md:text-5xl font-bold mt-5" >OUR 2025 <br  className="hidden md:block"/>PROJECT</h1>
      </div>
     <div className="flex flex-col justify-center items-center md:-ml-30  w-[100%]">
  <div className="flex justify-center mt-8">
    <img src={apexIcon} alt="Apex Icon" className=" w-[70%] md:w-[60%] lg:w-[40%]" />
  </div>
  <div className="flex justify-center ">
    <button className="px-6 py-2 bg-[#1598D8]">
      Click Here
    </button>
  </div>
</div>


    </div>
    {/* right content */}
    <div className="flex flex-col md:mt-0 mt-8 relative ">
   <div className="absolute right-0 top-0 p-2">
  <button className="flex items-center gap-2 font-semibold  ">
    View All 
    <FaArrowRight 
      className="bg-[#7a4ff4] ] text-white rounded-full w-8 h-8 p-2 cursor-pointer" 
      aria-hidden="true"
    />
  </button>
</div>


      <div className=" text-center leading-6 mt-12">
      <h1 className="text-[26px] md:text-5xl font-bold"> COMING SOON! </h1>
<h1 className="text-[26px] md:text-5xl font-semibold">The Apex NFT Card™ Features </h1>
</div>
<div className="">
      <ul className="space-y-4  mt-8 lg:ml-[-80px] border-b ">
        
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center text-white text-base"
          >
            <FaCheck className="text-[#7a4ff4] mr-4" />
            {feature}
          </li>
          
        ))}
      
      </ul>
    </div>
    <div className="space-y-4  lg:ml-[-80px] mt-10    lg:px-0  ">
  <div className="border-b ">
    <div className="w-full flex justify-between items-center text-left  font-bold uppercase">
      <span className="  text-xl md:text-3xl text-[#1ba9ed]">
        BRAODWALK ISLAND{" "}
        <span className="text-gray-300 text-sm">/ {""}ADVERTISEMENT</span>
      </span>
     <HiPlus  className="size-8 text-[#2CAED9]"/>
    </div>
    <div className="mt-4 "></div>
  </div>

  <div className="border-b ">
    <div className="w-full flex justify-between items-center text-left  font-bold uppercase">
      <span className=" text-xl md:text-3xl text-[#1ba9ed]">
        COMEMERCE CENTER{" "}
        <span className="text-gray-300 text-sm ">/ {""}ADVERTISEMENT</span>
      </span>
  <HiPlus  className="size-8 text-[#2CAED9]"/>

    </div>
    <div className="mt-4 "></div>
  </div>

  <div className="border-b ">
    <div className="w-full flex justify-between items-center text-left  font-bold uppercase">
       <span className=" text-xl md:text-3xl text-[#1ba9ed]">
        GRAND ISLAND{" "}
        <span className="text-gray-300 text-sm ">/ <br className="block md:hidden"/> {""} ADVERTISEMENT</span>
      </span>
      <HiPlus  className="size-8 text-[#2CAED9]"/>

    </div>
    <div className="mt-4 "></div>
  </div>

</div>



    </div>
    </div>
    {/* slider */}
    
    
    </main>
  );
};

export default OurServices;
