import React from "react";
import sliderlogo from "../../../assets/Service-page-images/sliderlogo.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

export default function Slider() {
const testimonials = [
  {
    quote:
      "The Realm is fantastic! I hope to see more social interaction like online meeting and possibly dating. It would be so cool to meet someone face to face in The Realm and get to know them by exploring it with them.",
    name: "Natalie Jones",
    title: "Social Media Influencer",
    rating: 5,
  },
  {
    quote:
      "The Realm is fantastic! I hope to see more social interaction like online meeting and possibly dating. It would be so cool to meet someone face to face in The Realm .",
    name: "Natalie Jones",
    title: "Social Media Influencer",
    rating: 5,
  },

  {
    quote:
      "The Realm looks amazing and has so many opportunities for businesses to engage with millions of others online.!",
    name: "Nicholas Jennings",
    title: "Game Developer",
    rating: 5,
  },
 


  {
    quote: "The Hyper Realm looks breathtaking! If you're a developer, I'm waiting for you!",
    name: "Matthew Porter",
    title: "Gamer | 3D Artist",
    rating: 5,
  },
  {
    quote:
      "I’m in Belfast Ireland and my friend sent me your link. I just bought my commercial Land Title on Hyperion Island, so cool! I also just registered for an Apex NFT Gold Card with Fanbase.",
    name: "Sonya O’Neil",
    title: "Retail Store Owner",
    rating: 4,
  },
];

  const StarRating = ({ rating }) => (
    <div className="flex space-x-1 mt-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-[#6434eb]" : "text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.373 4.232a1 1 0 00.95.691h4.453c.969 0 1.371 1.24.588 1.81l-3.6 2.62a1 1 0 00-.364 1.118l1.374 4.232c.3.921-.755 1.688-1.539 1.118l-3.6-2.62a1 1 0 00-1.175 0l-3.6 2.62c-.784.57-1.838-.197-1.539-1.118l1.374-4.232a1 1 0 00-.364-1.118l-3.6-2.62c-.783-.57-.38-1.81.588-1.81h4.453a1 1 0 00.95-.691l1.373-4.232z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen font-sans px-4 sm:px-8 md:px-16 lg:px-24 py-8">
      {/* Header Section */}
      <header className="text-center mb-12 w-full mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.353rem] font-bold mb-5 sm:mb-7 tracking-wide leading-tight">
          EARLY ADOPTION AND TESTIMONIALS
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-[2.059rem] font-bold mb-8 text-white">
          WHAT PEOPLE ARE SAYING ABOUT OUR WORLD
        </p>
        <div className="flex justify-center">
          <img
            src={sliderlogo}
            alt="Slider Logo"
            className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-[45%] object-contain"
          />
        </div>
      </header>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={32}
        slidesPerView={"auto"}
        speed={900}
        loop={true}
        centeredSlides={false}
        className="pb-12"
        style={{ paddingLeft: "14px", paddingRight: "14px" }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: "auto",
            spaceBetween: 32,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide
            key={index}
            
           className="!flex-shrink-0 lg:mb-18 mb-10 max-w-[380px] sm:max-w-[350px] md:max-w-[400px]"

          >
            <div className="p-6 sm:p-8 bg-[#14141d] shadow-lg transition-transform h-full flex flex-col">
              <div className="text-7xl sm:text-8xl mt-3 sm:mt-5 text-[#ff3b53] font-serif">&rdquo;</div>
              <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed mb-5 flex-grow">
                {testimonial.quote}
              </p>
              <div className="pt-2">
                <p className="font-semibold text-white text-lg sm:text-xl">{testimonial.name}</p>
                <p className="text-sm sm:text-base text-gray-400">{testimonial.title}</p>
                <StarRating rating={testimonial.rating} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Styling */}
      <style>{`
        .swiper-pagination {
          margin-top: 3.5rem !important;
          bottom: 0 !important;
          text-align: center;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: transparent;
          border: 2px solid #888888;
          margin: 0 6px !important;
          opacity: 1;
          transition: background-color 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #6434eb;
          border-color: #6434eb;
          opacity: 1;
        }

        @media (max-width: 1023px) {
          .swiper-pagination {
            margin-top: 2rem !important;
          }
          .swiper-pagination-bullet {
            width: 10px !important;
            height: 10px !important;
            border-width: 1.5px !important;
            margin: 0 4px !important;
          }
        }

        @media (max-width: 640px) {
          .swiper-pagination {
            margin-top: 1.5rem !important;
          }
          .swiper-pagination-bullet {
            width: 8px !important;
            height: 8px !important;
            border-width: 1.2px !important;
            margin: 0 3px !important;
          }
        }
      `}</style>
    </div>
  );
}
