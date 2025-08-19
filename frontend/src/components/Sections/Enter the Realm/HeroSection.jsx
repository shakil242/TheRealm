import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../../../assets/Service-page-images/servive-video-thumbnail.jpg";
import img2 from "../../../assets/Enter-the-realm-images/hero2.jpg";

function HeroSection() {
  const slideData = [
    {
      title: "building technology",
      subtitle: "that frees people",
      btn2: "tokenization",
      btn1: "DISCOVER THE REALM",
      img: img1,
    },
    {
      title: "building technology",
      subtitle: "that frees people",
      btn2: "tokenization",
      btn1: "DISCOVER THE REALM",
      img: img1,
    },
    {
      title: "purchase your land title",
      subtitle: "today and own it",
      btn1: "get your fracs",
      btn2: "our core projects",
      img: img2,
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
      <div className="relative z-20 flex flex-col justify-between h-full w-full max-w-full pl-24 py-12">
        <div className="flex-1 flex flex-col justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="text-left"
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.8, delay: 0.2 },
              }}
              exit={{ y: -30, opacity: 0, transition: { duration: 0.5 } }}
              variants={textVariants}
            >
              <h1 className="text-[80px] font-bold tracking-[6px] leading-[25px] uppercase mb-2 text-white">
                {slideData[current].title}
              </h1>
              <h2 className="text-[80px] font-bold tracking-[6px] uppercase mb-8 text-white">
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
