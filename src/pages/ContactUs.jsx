import React, { useState } from "react";
import ContactImage from "../assets/ContactUs-images/1.jpg"
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const ContactUs = () => {

 let [formData,setformData]=useState({
    name: "",
    email: "",
    message: "",

 })
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
   const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can add your API call here

    // Optionally reset form
    setformData({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <div className="bg-[#1a1a1f] w-full min-h-screen border-t overflow-x-hidden">

      {/* heading */}
      <div className="flex justify-center items-center mt-6 lg:mt-[4.5rem] flex-col">
     <h1 className="text-white text-[25px] sm:text-3xl lg:text-[3.2rem] font-semibold">
  CONTACT US
</h1>


      <div className="text-white text-[0.7rem] font-semibold md:text-xs uppercase lg:mt-1 sm:mt-3 tracking-wide">
     <a href="/" className="hover:underline">Home</a>
     <span className="mx-2">/</span>
     Contact Us
     </div>
      </div>
      {/* contact us main image */}
      <div className="flex justify-center flex-col items-center">
      <div className=" mt-14 lg:mt-[5.2rem]">
        <img src={ContactImage} alt="" />
      </div>
      <div className=" mt-9 lg:mt-[3.2rem]">
       <h1 className="text-white text-[22px] text-center sm:text-2xl md:text-2xl lg:text-[2.6rem] font-bold">
  ALCHEMY STUDIOS MAILING ADDRESS
</h1>

      </div>
      </div>
      {/* google map */}
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
{/* contact us form */}

       <div className="  max-w-7xl md:mx-auto   md:px-12 lg::px-20 px-5 flex flex-col md:flex-row w-full gap-8 md:gap-5  py-32">
        {/* Left Panel */}
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
  {/* Address */}
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

  {/* Phone */}
  <div className="flex items-center gap-4">
    <MdPhone size={22} className="text-[#a275ea]" />
    <a
      href="tel:+13212016865"
      className="font-bold text-xs sm:text-base hover:underline"
    >
      tel:<span className="font-extrabold">+ 1 321.201.6865</span>
    </a>
  </div>

  {/* Email */}
  <div className="flex items-center gap-4">
    <MdEmail size={22} className="text-[#a275ea]" />
    <a
      href="mailto:admin@entertherealm.io"
      className="text-xs sm:text-base hover:underline"
    >
      admin@entertherealm.io
    </a>
  </div>
</div>

        </div>

        {/* Right Panel: Contact Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={formData.name}
              placeholder="Your Name"
              name="name"
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-400 focus:border-[#a275ea] text-white px-4 py-2 text-sm md:text-base outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              
          onChange={handleChange}
              className="w-full bg-transparent border border-gray-400 focus:border-[#a275ea] text-white px-4 py-2 text-sm md:text-base outline-none"
            />
            <textarea
              placeholder="Your Message"
              name="message"
              value={formData.message}
             
              onChange={handleChange}
              rows={4}
              className="w-full bg-transparent border border-gray-400 focus:border-[#a275ea] text-white px-4 py-2 text-sm md:text-base outline-none resize-none"
            ></textarea>
           <div className="pt-2 flex justify-center">
           <button
                type="submit"
                className="w-32 bg-[#a275ea] hover:bg-[#bb95f3] text-white font-bold py-2 rounded-none transition"
             >
              SEND
              </button>
               </div>

          </form>
        </div>
      </div>
    
  

    </div>
  );
};

export default ContactUs;
