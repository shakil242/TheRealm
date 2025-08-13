// ServicesGrid.js
import React from "react";
import service1 from "../../../assets/Service-page-images/service-1.jpg";
import service2 from "../../../assets/Service-page-images/service-2.webp";
import service3 from "../../../assets/Service-page-images/service-3.jpg";
import service4 from "../../../assets/Service-page-images/service-4.jpg";


const services = [
  {
    id: "01",
    title: "VIRTUAL SUPPORT",
    category: "Services",
    img: service1,
    link: "#",
  },
  {
    id: "02",
    title: "KNOWLEDGE BASE",
    category: "Services",
    img: service2,
    link: "#",
  },
  {
    id: "03",
    title: "VIRTUAL REAL ESTATE",
    category: "Services",
    img: service3,
    link: "#",
  },
  {
    id: "04",
    title: "ARCHITECTURAL SERVICES",
    category: "Services",
    img: service4,
    link: "#",
  },
];

const ServicesGrid = () => {
  return (
    <section className="bg-black text-white py-18 px-4 md:px-4">
      <div className="text-center mb-8 md:w-[70%] flex flex-col items-center justify-center mx-auto">
        <p className="uppercase text-[13px] md:text-sm tracking-wider font-bold">
          Corporate Service for Point of Sale
        </p>

        <h2 className="text-[20px] md:text-[3.25rem] font-bold leading-tight mt-2">
          WE&apos;LL EVEN HELP YOU SET UP YOUR VIRTUAL RETAIL STORE IN THE REALM™
        </h2>

        <h3 className="text-[20px] md:text-[3.25rem] font-bold mt-6">
          OUR OTHER SERVICES
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <a
            key={service.id}
            href={service.link}
            className="relative group overflow-hidden shadow-lg"
          >
           <img
  src={service.img}
  alt={service.title}
  className="w-full h-[16rem] lg:h-[20rem]   object-cover brightness-70"
/>

            <div className="absolute inset-0 group-hover:bg-black/60 transition-all duration-500"></div>
            <div className="absolute inset-0 mt-[90px] bg-opacity-40 flex flex-col items-center justify-center p-4">
              <span className="text-7xl font-bold">{service.id}</span>
              <h4 className="text-2xl font-bold mt-2 text-center">{service.title}</h4>
              <p className="text-lg">{service.category}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;
