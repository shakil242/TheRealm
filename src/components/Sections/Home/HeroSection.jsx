import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../../../assets/home-images/hero1.jpg";
import img2 from "../../../assets/home-images/hero2.png";
import img3 from "../../../assets/home-images/hero3.jpg";
import img4 from "../../../assets/home-images/hero4.jpg";
import { FaArrowUp } from "react-icons/fa6";
import particlesConfig from "../../../assets/particlesjs-config.json";

function HeroSection() {
  const slideData = [
    {
      title: "lets build a a new world",
      subtitle: (
        <>
          togerther that frees <br /> people financilly
        </>
      ),
      btn1: "visit our locations",
      btn2: "get pre construction blox",
      img: img3,
    },
    {
      title: "VIRTUAL REALESTATE",
      subtitle: "THAT'S TRULY TOKENIZED",
      btn1: "RARE COLLECTIBLES",
      btn2: "GET YOUR VIRTUAL WALLET",
      img: img4,
    },
    {
      title: "BE YOURSELF",
      subtitle: (
        <>
          AND CREATE A <br /> digital legacy
        </>
      ),
      btn2: "the core project",
      btn1: "DISCOVER THE REALM",
      img: img1,
    },
    {
      title: "COULD THE",
      subtitle: (
        <>
          REALM BE THE <br /> Next digital <br /> Evolution?
        </>
      ),
      btn2: "News feed",
      btn1: "DISCOVER THE REALM",
      img: img2,
    },
    {
      title: "VIRTUAL REALESTATE",
      subtitle: "THAT'S TRULY TOKENIZED",
      btn1: "RARE COLLECTIBLES",
      btn2: "GET YOUR VIRTUAL WALLET",
      img: img4,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const particlesRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((prev) => (prev + 1) % slideData.length);
          return 0;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [slideData.length]);

  useEffect(() => {
    if (window.particlesJS && particlesRef.current) {
      particlesRef.current.innerHTML = ""; // clear old particles
      window.particlesJS("particles-js", particlesConfig);
    }
  }, [current]); // re-run when slide changes

  const imageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const textVariants = {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.8 } },
    exit: { x: -50, opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          // id="particles-js"
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${slideData[current].img})` }}
          initial={{ scale: 1 }}
          animate={{ scale: 1.2 }}
          exit={{ scale: 1.2 }}
          transition={{ duration: 5, ease: "easeIn" }}
          variants={imageVariants}
        />
      </AnimatePresence>
      <div
        id="particles-js"
        ref={particlesRef}
        className="absolute inset-0 z-10"
      />

      {/* Text content */}
      <div className="relative z-20 flex flex-col justify-between h-full w-full max-w-6xl pl-20 py-12">
        <div className="flex-1 flex flex-col justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="text-left drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]"
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.8, delay: 0.2 },
              }}
              exit={{ y: -30, opacity: 0, transition: { duration: 0.5 } }}
              variants={textVariants}
            >
              <h1 className="text-[80px] font-bold uppercase mb-2 tracking-tighter leading-tight text-white">
                {slideData[current].title}
              </h1>
              <h2 className="text-[80px] font-bold uppercase mb-8 tracking-tighter leading-tight text-white">
                {slideData[current].subtitle}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom section */}
        <div className="max-w-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="flex flex-row gap-2 mb-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.8, delay: 0.2 },
              }}
              exit={{ y: -30, opacity: 0, transition: { duration: 0.5 } }}
              variants={textVariants}
            >
              <div className="flex flex-row gap-2 mb-4">
                <button className="px-6 py-2 bg-white cursor-pointer text-black font-bold uppercase hover:bg-black hover:text-white transition-all">
                  {slideData[current].btn2}
                </button>
                <button className="px-6 py-2 border-2 cursor-pointer border-white text-white font-bold uppercase hover:bg-white hover:text-black transition-all">
                  {slideData[current].btn1}
                </button>
              </div>
              <div className="relative h-1 bg-white bg-opacity-30 max-w-md mx-auto">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
