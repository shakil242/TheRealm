import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaArrowUp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import earth from "../assets/home-images/29.png";
import roundR from "../assets/home-images/2.png";
import fanbase from "../assets/home-images/18.png";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Footer() {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Track scroll to toggle button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#000011] text-white py-8 px-4">
      {/* Logo with hover effect */}
      <div className="flex justify-center mb-8">
        <div
          className="relative w-1/12 h-1/12 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={earth}
            alt="The Realm Globe"
            className={`w-full h-full object-contain transition-opacity duration-1000 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`absolute inset-0 flex justify-center items-center border-2 border-white rounded-full p-2 transition-opacity duration-1000 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={roundR}
              alt="The Realm Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Centered HR */}
      <div className="flex justify-center mb-8">
        <hr className="border-t-2 border-purple-600 w-7xl" />
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center mb-8">
        <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { path: "/", name: "Home" },
            { path: "/contacts", name: "Contact Us" },
            { path: "/card-services", name: "Our Services" },
            { path: "/the-realm-core", name: "The Realm Core" },
            { path: "/legal-archives", name: "Legal Archives" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-white hover:text-purple-400 transition-colors duration-300 pb-1 ${
                location.pathname === item.path
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Social Icons with Fanbase label */}
      <div className="flex flex-col items-center mb-8">
        <img src={fanbase} alt="" className="w-1/4 h-1/4" />
        <div className="flex gap-6">
          <a
            href="#"
            className="text-white hover:text-purple-400 transition-colors duration-300"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="#"
            className="text-white hover:text-purple-400 transition-colors duration-300"
          >
            <FaXTwitter size={20} />
          </a>
          <a
            href="#"
            className="text-white hover:text-purple-400 transition-colors duration-300"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>

      {/* Copyright Text */}
      <div className="text-center text-[17px] text-white">
        <p>
          © Copyright The Realm™ 2025 | All Rights Reserved | ZenChip PRIME
          Corp. | Alchemy Studios, LLC.
        </p>
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

export default Footer;
