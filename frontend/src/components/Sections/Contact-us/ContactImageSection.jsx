// ContactImageSection.js
import React from "react";
import ContactImage from "../../../assets/ContactUs-images/1.jpg";


const ContactImageSection = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="mt-14 lg:mt-[5.2rem]">
        <img src={ContactImage} alt="Contact" />
      </div>
      <div className="mt-9 lg:mt-[3.2rem]">
        <h1 className="text-white text-[22px] text-center sm:text-2xl md:text-2xl lg:text-[2.6rem] font-bold">
          ALCHEMY STUDIOS MAILING ADDRESS
        </h1>
      </div>
    </div>
  );
};

export default ContactImageSection;
