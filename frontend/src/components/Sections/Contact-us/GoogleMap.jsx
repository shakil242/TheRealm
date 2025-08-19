// GoogleMap.js
import React from "react";

const GoogleMap = () => {
  return (
    <div className="w-full bg-[#0A0A0F] border-t flex items-center justify-center mt-9 lg:mt-[3.2rem]">
      <div className="w-full sm:w-[90%] md:w-[100%] h-[400px] sm:h-[400px] md:h-[550px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.1338087739764!2d-81.59062042450162!3d28.565744375701264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e7836e6f2f9b79%3A0xd20c7b9ac7342c18!2s207%20W%20Plant%20St%2C%20Winter%20Garden%2C%20FL%2034787%2C%20USA!5e0!3m2!1sen!2s!4v1754652001096!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleMap;
