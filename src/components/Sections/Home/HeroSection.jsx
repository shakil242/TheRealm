import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../../../assets/home-images/hero1.jpg";
import img2 from "../../../assets/home-images/hero2.png";
import img3 from "../../../assets/home-images/hero3.jpg";
import img4 from "../../../assets/home-images/hero4.jpg";
import { FaArrowUp } from "react-icons/fa6";

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
  const [paused, setPaused] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (paused) return;
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
  }, [paused, slideData.length]);

  // Track scroll to toggle button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${slideData[current].img})` }}
          initial={{ scale: 1 }}
          animate={{ scale: 1.2 }}
          exit={{ scale: 1.2 }}
          transition={{ duration: 4, ease: "easeIn" }}
          variants={imageVariants}
        />
      </AnimatePresence>

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

      {/* Go to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2 text-white cursor-pointer"
            whileHover={{
              scale: 1.1,
              color: "blue",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FaArrowUp className="m-4 mb-5" />
            <span className="text-sm font-medium transform rotate-90 origin-center">
              Go to Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroSection;
