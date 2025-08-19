// FanbaseImage.js
import React from "react";
import fanbase from "../../../assets/home-images/30.png";

const FanbaseImage = () => {
  return (
    <section className="w-full flex justify-center items-center mx-auto px-2">
      <img
        src={fanbase}
        alt="Fanbase"
        className="max-w-[39rem] w-full h-auto object-contain"
      />
    </section>
  );
};

export default FanbaseImage;
