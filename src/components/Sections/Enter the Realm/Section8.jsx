import React from "react";
import beach from "../../../assets/Enter-the-realm-images/beech.jpg";
import goldbars from "../../../assets/Enter-the-realm-images/goldbars.jpg";
import resort from "../../../assets/Enter-the-realm-images/resort.jpg";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Section8() {
  const newsItems = [
    {
      id: 1,
      title: "WHAT ISLAND PROPERTIES ARE MOST LIKELY TO BE IN DEMAND?",
      date: "February 9, 2025",
      categories: [
        "Asclepia Key",
        "Commerce Center",
        "Grand Island",
        "NFT Land Titles",
        "Popular",
        "Press Releases",
        "Subversa",
        "Trending",
        "VR Games",
        "White Horse Key",
      ],
      image: beach,
      comments: 1,
    },
    {
      id: 2,
      title: "HOW TOKENIZATION OF PROPERTIES IN THE REALM™ CREATE VALUE",
      date: "April 15, 2025",
      categories: ["Hyperion Island", "NFT Land Titles", "VR Games"],
      image: goldbars,
      comments: 0,
    },
    {
      id: 3,
      title: "WHY BUYING LAND TITLES ON THIS ISLAND MAY SUIT YOU",
      date: "April 16, 2025",
      categories: ["Business", "Grand Island", "The Realm Sports"],
      image: resort,
      comments: 0,
    },
  ];

  return (
    <div className="bg-black mx-auto max-w-7xl flex flex-col items-center justify-center py-16 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="block text-sm uppercase tracking-wider text-white mb-2">
          THE DIGITAL NEWS FORUM
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          LATEST IN THE REALM™ NEWS
        </h1>
      </div>

      {/* Grid */}
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 md:h-[600px]">
          {/* Left big image */}
          <div className="relative group overflow-hidden h-full">
            <img
              src={newsItems[0].image}
              alt={newsItems[0].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Compact text container with opacity transition */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 m-10">
              <h2 className="text-lg font-bold text-white uppercase line-clamp-2">
                {newsItems[0].title}
              </h2>
              <p className="text-xs text-gray-300 mt-1">
                {newsItems[0].categories.join(", ")}
              </p>
              <div className="flex text-xs text-gray-300 mt-1">
                <span>{newsItems[0].date}</span> &nbsp; {" • "} &nbsp;
                <span>
                  {newsItems[0].comments} Comment
                  {newsItems[0].comments !== 1 ? "s" : ""}
                </span>
              </div>
              <Link className="group inline-flex items-center mt-4">
                <span className="mr-2 opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300">
                  Read More
                </span>
                <span className="group-hover:translate-x-2 transition-transform duration-300 text-[#7c51be]">
                  <FaArrowCircleRight className="text-2xl" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right column (two stacked) */}
          <div className="flex flex-col">
            {newsItems.slice(1).map((item) => (
              <div
                key={item.id}
                className="relative group overflow-hidden h-full"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Compact text container with opacity transition */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500  m-10">
                  <h2 className="text-md font-bold text-white uppercase line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                    {item.categories.join(", ")}
                  </p>
                  <div className="flex text-xs text-gray-300 mt-1">
                    <span>{item.date}</span> &nbsp; {" • "} &nbsp;
                    <span>
                      {item.comments} Comment{item.comments !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <Link className="group inline-flex items-center mt-4">
                    <span className="mr-2 opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300">
                      Read More
                    </span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300 text-[#7c51be]">
                      <FaArrowCircleRight className="text-2xl" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section8;
