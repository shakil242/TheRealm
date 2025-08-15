import React from "react";
import service1 from "../../../assets/Service-page-images/service-1.jpg";
import service2 from "../../../assets/Service-page-images/service-2.webp";
import service3 from "../../../assets/Service-page-images/service-3.jpg";
import service4 from "../../../assets/Service-page-images/service-4.jpg";
import { Link } from "react-router-dom";

function Section5() {
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

  return (
    <div className="bg-black text-white py-16 px-4 md:px-8">
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <p className="uppercase text-sm md:text-base tracking-wider font-semibold mb-2">
          SERVICES IN THE REALM™
        </p>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight uppercase">
          New ways to connect to <br /> real people in The Realm™
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {services.map((service) => (
          <Link
            key={service.id}
            to={service.link}
            className="relative group overflow-hidden h-80 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-full object-cover brightness-75 group-hover:brightness-50 transition-all duration-500"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
              <span className="text-6xl font-bold text-white opacity-80">
                {service.id}
              </span>
              <h4 className="text-xl font-bold text-white mt-2 text-center">
                {service.title}
              </h4>
              <p className="text-white/80 mt-1">{service.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Section5;
