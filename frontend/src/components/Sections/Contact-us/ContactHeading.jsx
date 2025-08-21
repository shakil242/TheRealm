// ContactHeading.js
import React from "react";

const ContactHeading = () => {
  return (
    <div className="flex justify-center items-center mt-10   flex-col  ">
      <h1 className="text-white text-[25px] sm:text-3xl lg:text-[3.2rem]  font-semibold">
        CONTACT US
      </h1>
      <div className="text-white text-[0.7rem] font-semibold md:text-xs uppercase lg:mt-1 sm:mt-3 tracking-wide">
        <a href="/" className="hover:underline">Home</a>
        <span className="mx-2">/</span>
        Contact Us
      </div>
    </div>
  );
};

export default ContactHeading;
