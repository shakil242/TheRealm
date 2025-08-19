import React from "react";
import NewsCard from "../../NewsCard";
import couple from "../../../assets/home-images/25.webp";
import pendulum from "../../../assets/home-images/26.jpg";
import beach from "../../../assets/home-images/27.jpg";

const articles = [
  // Array of article data objects (title, date, categories, image, etc.)
  {
    title: "WHEN WILL APEX CARD™ SERVICES RELEASE THEIR FIRST NFT DEBIT CARDS?",
    date: "May 13, 2025",
    categories: [
      "FANBASE",
      "APEX NFT CARD",
      "BUSINESS",
      "NEWS",
      "NFT LAND TITLES",
      "POPULAR",
      "TECHNOLOGY",
      "TRENDING",
    ],
    // Correct way to pass the imported image
    image: couple,
    source: "FANBASE",
  },
  {
    title: "NFT LAND TITLES EXPLAINED",
    date: "April 9, 2025",
    categories: [
      "FANBASE",
      "DEEP DIVE",
      "FEATURED",
      "NEWS",
      "NFT LAND TITLES",
      "PRESS RELEASES",
      "SPOTLIGHT",
      "TRENDING",
    ],
    image: pendulum,
    source: "FANBASE",
  },
  {
    title: "HOW THE REALM™ WILL BE BETTER THAN METAVERSE",
    date: "March 30, 2025",
    categories: [
      "FRONT DESK TERMINAL",
      "BUSINESS",
      "NEWS",
      "NFT LAND TITLES",
      "TECHNOLOGY",
      "TOP RATED",
      "TRENDING",
    ],
    image: beach,
    source: "FRONT DESK TERMINAL",
  },
];

function Section12() {
  return (
    <div className="container mx-auto p-4 md:p-8 mt-20 mb-20">
      <div className="text-center mb-10">
        <p className="text-[14px] uppercase tracking-widest font-bold text-white">
          OUR NEWS FORUM
        </p>
        <h2 className="text-[37px] font-bold mt-2 text-white">
          THE REALM™ VIVID NEWS
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center">
        {articles.map((article, index) => (
          <NewsCard
            key={index}
            title={article.title}
            date={article.date}
            categories={article.categories}
            image={article.image}
            source={article.source}
          />
        ))}
      </div>
    </div>
  );
}

export default Section12;
