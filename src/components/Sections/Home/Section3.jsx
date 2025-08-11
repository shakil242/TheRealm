import React from "react";
import subBg from "../../../assets/home-images/sub.jpg";
import bed1 from "../../../assets/home-images/08.png";
function Section3() {
  return (
    <div
      className="relative w-full text-white py-20 px-6"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), url(${subBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        <div className="flex justify-center align-middle flex-col md:text-left">
          <img src={bed1} alt="bed" className="w-72 self-center" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center">
            SUBSCRIBE FOR EXCLUSIVE CONTENT AND VIP FANBASE™ PROPERTY REWARDS!
          </h2>
        </div>

        {/* Right Form */}
        <div className="bg-opacity-40 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white text-center">
            SUBSCRIBE
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="bg-white/30 backdrop-blur-none w-full p-3 rounded bg-opacity-10 border border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-white/30 backdrop-blur-none w-full p-3 rounded border border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="bg-white/30 backdrop-blur-none w-full p-3 rounded bg-opacity-10 border border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition duration-300"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Section3;
