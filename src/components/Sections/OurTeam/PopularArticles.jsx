import React from 'react';
import AsclepiaKey from "../../../assets/Our-Team-images/AsclepiaKey.webp"
import ApexPrime from "../../../assets/Our-Team-images/Apex-Prime.webp"
import cuple from "../../../assets/Our-Team-images/cuple.jpg"

export default function PopularArticles() {
  const articles = [
    {
      image: AsclepiaKey,
      title: "ASCLEPIA KEY",
      category: "Asclepia Key, Island Gallery, Trending"
    },
    {
      image: ApexPrime,
      title: "WHEN WILL APEX CARD™ SERVICES RELEASE THEIR FIRST NFT DEBIT CARDS?",
      category: "Apex NFT Card, Business, News, NFT Land Titles, Popular, Spotlight, Technology, Trending"
    },
    {
      image: cuple,
      title: "A PLACE WITHOUT BOUNDARIES WHERE CRYPTO RULES SUPREME",
      category: "Business, Press Releases, Trending"
    }
  ];

  return (
    <div className="text-white p-8 lg:p-24 font-sans">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-[13px] font-bold uppercase tracking-widest mb-2">BY OUR AUTHORS</h3>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-12 md:mb-16">
          POPULAR ARTICLES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="flex flex-col bg-[#14141d]  overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden  ">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full cursor-pointer object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-lg md:text-[22px] hover:text-[#7a4ff4] cursor-pointer transition-colors duration-300 font-bold uppercase leading-snug ">
                  {article.title}
                </h3>
                <p className="text-[16px] text-gray-400 w-[90%]">{article.category}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <button className="bg-[#0C83DD] text-white text-base py-4 px-10 cursor-pointer rounded">
            More News
          </button>
        </div>
      </div>
    </div>
  );
}
