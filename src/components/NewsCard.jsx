import React from "react";

function NewsCard({ title, date, categories, image, source }) {
  return (
    <div className="flex-1 min-w-[300px] bg-cyan-950 shadow-lg rounded-lg overflow-hidden cursor-pointer">
      <div className="relative h-64 md:h-80">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain hover:scale-0 transition-all duration-200"
        />
      </div>
      <div className="p-6">
        <div className="text-sm font-semibold text-white mb-2">
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
        <div className="text-sm text-gray-500 mb-4">{date}</div>
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      </div>
    </div>
  );
}

export default NewsCard;
