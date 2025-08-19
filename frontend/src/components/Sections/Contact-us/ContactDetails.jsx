// ContactDetails.js
import React from "react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const ContactDetails = () => {
  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center mb-12 md:mb-0">
      <h5 className="text-xs sm:text-sm font-bold tracking-widest text-white mb-2">CONTACT US</h5>
      <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-3xl lg:text-5xl leading-tight mb-4">
        HAVE QUESTIONS?<br />
        GET IN TOUCH!
      </h1>
      <p className="text-gray-300 text-sm sm:text-base font-medium mb-8 max-w-lg">
        We'd love to hear from you. If you have questions, comments or suggestions, please get in touch! We want to hear them!
      </p>
      <div className="flex flex-col gap-5 text-white text-base">
        <div className="flex items-center gap-4">
          <MdLocationOn size={22} className="text-[#a275ea]" />
          <a
            href="https://www.google.com/maps?q=207+West+Plant+St+#770984+Winter+Garden+FL+34777+USA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-base hover:underline"
          >
            207 West Plant St #770984 Winter Garden FL 34777 USA
          </a>
        </div>
        <div className="flex items-center gap-4">
          <MdPhone size={22} className="text-[#a275ea]" />
          <a href="tel:+13212016865" className="font-bold text-xs sm:text-base hover:underline">
            tel:<span className="font-extrabold">+ 1 321.201.6865</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <MdEmail size={22} className="text-[#a275ea]" />
          <a href="mailto:admin@entertherealm.io" className="text-xs sm:text-base hover:underline">
            admin@entertherealm.io
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
