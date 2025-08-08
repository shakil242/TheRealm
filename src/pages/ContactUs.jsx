import React from "react";
import ContactImage from "../assets/ContactUs-images/1.jpg"

const ContactUs = () => {
  return (
    <div className="bg-[#111118] w-full min-h-screen border-t overflow-x-hidden">

      {/* heading */}
      <div className="flex justify-center items-center mt-[4.5rem] flex-col">
      <h1  className="text-white text-[3.2rem] font-semibold">CONTACT US</h1>
      <p className="text-white text-xs font-semibold md:text-s=xs uppercase mt-1 tracking-wide">
     <a href="/" className="hover:underline">Home</a>
     <span className="mx-2">/</span>
     Contact Us
     </p>
      </div>
      {/* contact us main image */}
      <div className="flex justify-center flex-col items-center">
      <div className="mt-[5.2rem]">
        <img src={ContactImage} alt="" />
      </div>
      <div className="mt-[3.2rem]">
        <h1 className="text-white text-[2.6rem] font-bold">ALCHEMY STUDIOS MAILING ADDRESS</h1>
      </div>
      </div>
      {/* google map */}
       <div className="w-full  bg-[#0A0A0F] border-t flex items-center justify-center mt-[3.2rem]">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13785.839075329346!2d71.4892897!3d30.25247865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1754640347756!5m2!1sen!2s"
    width="100%"
    height="550"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Google Map"
  ></iframe>
</div>
{/* contact us form */}
<div>
  {/* left-side-content */}
<div>
  
</div>
{/* right-side content */}
<div>

</div>
</div>

    </div>
  );
};

export default ContactUs;
