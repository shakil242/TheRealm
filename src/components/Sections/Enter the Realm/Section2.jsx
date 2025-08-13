import React from "react";
import {
  TbAugmentedReality,
  TbAugmentedReality2,
  TbHexagon3D,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import { motion } from "framer-motion";

function Section2() {
  const dataportion = [
    {
      title: "ENDLESS HYPER REALITY",
      subtitle:
        "A world so real you won't believe your own eyes. Meet people and interact with them.",
      icon: TbAugmentedReality,
      link: "/endless-hyper-reality",
    },
    {
      title: "AN AUGMENTED WORLD",
      subtitle:
        "Using The Unreal Engine and Luna pre rendering, the impossible becomes the possible.",
      icon: TbAugmentedReality2,
      link: "/an-augmented-world",
    },
    {
      title: "VIRTUAL TRANSPORT",
      subtitle:
        "In The Realm, you can take a scenic view on a train or teleport instantly to your destination.",
      icon: TbHexagon3D,
      link: "/virtual-transport",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-16">
      {dataportion.map((item, index) => (
        <motion.div
          key={index}
          className="service-card p-8 transition-all duration-300 flex"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          {/* Icon + Title */}
          <div>
            <item.icon className="text-white text-4xl" />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold uppercase text-white tracking-tight">
                {item.title}
              </h3>
            </div>

            {/* Subtitle */}
            <p className="text-gray-300 mb-6">{item.subtitle}</p>

            {/* Arrow Icon - only visible on hover */}
            <Link
              to={item.link}
              className="group inline-flex items-center text-[#7c51be] hover:text-white transition-colors"
            >
              <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Read More
              </span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">
                <FaArrowCircleRight className="text-2xl" />
              </span>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default Section2;
