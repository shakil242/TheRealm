import React from "react";

function NewsCard({ title, date, categories, image, source }) {
  return (
    <div className="flex-1 min-w-[300px] bg-[#14141d] shadow-lg rounded-lg overflow-hidden cursor-pointer">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-9">
        <div className="text-sm text-white mb-2">
          <span className="uppercase text-[#7A4FF4] hover:text-white">
            {source}
          </span>
          <span className="mx-2">•</span>
          <br />
          {categories.map((cat, index) => (
            <span key={index} className="hover:text-[#7A4FF4] cursor-pointer">
              {cat}
              {index < categories.length - 1 && ", "}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-500 mb-2">{date}</div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
    </div>
  );
}

export default NewsCard;
