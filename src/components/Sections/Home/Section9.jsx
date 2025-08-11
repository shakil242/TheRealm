import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../../../assets/home-images/22.webp";
import img2 from "../../../assets/home-images/std.jpg";

function Section9() {
  const slideData = [
    {
      title: "Super Rare Sun Suit Dome",
      location: "On Marina Cove Island",
      description: "100,000 Seats Available Per Virtual Stadium | Per Event",
      status: "Coming Soon!",
      img: img1,
    },
    {
      title: "Super Rare Churchill Stadium",
      location: "On North Umbria Island",
      description: "125,000 Seats Available Per Virtual Stadium | Per Event",
      status: "Coming Soon!",
      img: img1,
    },
    {
      title: "Super Rare MonstraCard Dome",
      location: "At Commerce Center",
      description: "85,000 Seats Available Per Virtual Stadium | Per Event",
      status: "Coming Soon!",
      img: img1,
    },
    {
      title: "Super Rare Trident Bowl",
      location: "In Subversa",
      description: "150,000 Seats Available Per Virtual Stadium | Per Event",
      status: "Coming Soon!",
      img: img1,
    },
    {
      title: "Super Rare Stadium",
      location: "On Boardwalk Island",
      description: "80,000 Seats Available Per Virtual Stadium | Per Event",
      status: "Coming Soon!",
      img: img1,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return; // Pause when hovered
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slideData.length);
    }, 3500);
    return () => clearTimeout(timer);
  }, [current, paused, slideData.length]);

  const imageVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.7 } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.7 } },
  };

  const textVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.7, delay: 0.2 } },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${img2})`,
        }}
      >
        <div className="text-white flex justify-center items-center min-h-[32rem]">
          <div
            className="relative w-full max-w-xl h-96"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="absolute inset-0 rounded-lg shadow-lg overflow-hidden flex justify-center items-center"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={imageVariants}
                style={{ zIndex: 1 }}
              >
                <img
                  src={slideData[current].img}
                  alt={slideData[current].title}
                  className="max-w-full max-h-full object-contain"
                />
                <motion.div
                  className="absolute drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)] inset-0 bg-opacity-60 flex flex-col justify-center items-center text-center px-6"
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ zIndex: 2 }}
                >
                  <h3 className="text-[35px] font-semibold">
                    {slideData[current].title}
                  </h3>
                  <p className="mb-4 text-[35px] font-semibold">
                    {slideData[current].location}
                  </p>
                  <p className="mb-6 text-[17px">
                    {slideData[current].description}
                  </p>
                  <button className="border-2 py-3 px-8 border-white font-bold bg-[#7C51BE] hover:bg-transparent transition-all duration-500">
                    {slideData[current].status}
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div
        className="flex whitespace-nowrap my-8"
        style={{ animation: "marquee 20s linear infinite" }}
      >
        <h1 className="inline-block text-[10vw] md:text-[170px] font-bold uppercase leading-none text-[#7A4FF4] px-4 tracking-tight">
          virtual properties in the REALM™
        </h1>
        <h1 className="inline-block text-[10vw] md:text-[170px] font-bold uppercase leading-none text-[#7A4FF4] px-4 tracking-tight">
          virtual properties in the REALM™
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
    </>
  );
}

export default Section9;
