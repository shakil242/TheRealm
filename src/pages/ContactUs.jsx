// ContactUs.js
import React, { useState } from "react";

import ContactHeading from "../components/Sections/Contact-us/ContactHeading"
import ContactImageSection from "../components/Sections/Contact-us/ContactImageSection";
import GoogleMap from "../components/Sections/Contact-us/GoogleMap";
import ContactDetails from "../components/Sections/Contact-us/ContactDetails";
import ContactForm from "../components/Sections/Contact-us/ContactForm";

const ContactUs = () => {
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
    // API call can go here
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-[#1a1a1f] w-full min-h-screen border-t overflow-x-hidden">
      <ContactHeading />
      <ContactImageSection />
      <GoogleMap />

      <div className="max-w-7xl md:mx-auto md:px-12 lg:px-20 px-5 flex flex-col md:flex-row w-full gap-8 md:gap-5 py-32">
        <ContactDetails />
        <ContactForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ContactUs;
