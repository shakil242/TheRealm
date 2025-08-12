import React from "react";
import fanbase from "../../../assets/home-images/30.png";
import { useState } from "react";

function Section1() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-start mt-20 mb-10">
      {/* Left Image */}
      <div className="flex justify-center flex-col items-center p-8">
        <video
          src="https://therealmblox.io/wp-content/uploads/2022/09/Pexels-Videos-2759479.mp4"
          autoPlay
          muted
          loop
          className="w-5/6 h-5/6 object-contain"
        />
        <img
          src={fanbase}
          alt="people"
          className="w-2/3 h-2/3 object-contain"
        />
      </div>

      {/* Right Form */}
      <div className="flex flex-col items-center md:items-center text-center">
        <h2 className="text-[43px] font-bold uppercase leading-[45px] text-white mb-10 ">
          Get early access to the <br /> realm and be the first to <br /> enter
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4 text-[12px]">
          <input
            type="text"
            value={formData.name}
            placeholder="Your Name"
            name="name"
            onChange={handleChange}
            className="w-full bg-[#2B2B2B] backdrop-blur-sm border border-gray-400 focus:border-[#a275ea] focus:placeholder:text-white text-white px-4 py-2 rounded-sm outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#2B2B2B] backdrop-blur-sm border border-gray-400 focus:border-[#a275ea] focus:placeholder:text-white text-white px-4 py-2 rounded-sm outline-none"
          />
          <textarea
            placeholder="Your Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full bg-[#2B2B2B] backdrop-blur-sm border border-gray-400 focus:border-[#a275ea] focus:placeholder:text-white text-white px-4 py-2 rounded-sm outline-none resize-none"
          ></textarea>

          <div className="pt-2 flex justify-center">
            <button
              type="submit"
              className="bg-[#128FD3] hover:bg-[#0f77af] cursor-pointer uppercase text-white font-bold py-2 px-6 rounded-sm transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Section1;
