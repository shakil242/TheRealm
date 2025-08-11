// ContactForm.js
import React from "react";

const ContactForm = ({ formData, handleChange, handleSubmit }) => {
  return (
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
  );
};

export default ContactForm;
