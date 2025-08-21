// VideoSection.js
import React, { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import thumbnail from "../../../assets/Service-page-images/servive-video-thumbnail.jpg";

import alchemylogo from "../../../assets/Service-page-images/alchemylogo.png";

const VideoSection = () => {
  const playerRef = useRef(null);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [showSourceInfo, setShowSourceInfo] = useState(false);

  useEffect(() => {
    const player = new Player(playerRef.current);

    player.on("play", () => {
      setShowThumbnail(false);
      setShowSourceInfo(false);
    });

    player.on("pause", () => {
      if (!showThumbnail) {
        setShowSourceInfo(true);
      }
    });

    player.on("ended", () => {
      setShowSourceInfo(true);
    });
  }, [showThumbnail]);

  return (
    <section
      className="relative w-full  overflow-x-hidden"
      style={{ paddingTop: "56.25%" }}
    >
      <iframe
        ref={playerRef}
        src="https://player.vimeo.com/video/1055755772?badge=0&autopause=0&player_id=0&app_id=58479"
        allow="autoplay;"
        className="absolute top-0 left-0 w-full h-full"
        title="Apex-Card-infomercial-2025"
      ></iframe>

      {showThumbnail && (
        <div
          className="absolute inset-0 bg-center bg-cover flex items-center justify-center cursor-pointer"
          style={{ backgroundImage: `url(${thumbnail})` }}
          onClick={() => {
            setShowThumbnail(false);
            setShowSourceInfo(true);
          }}
        >
          <div className="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center">
            <svg
              aria-hidden="true"
              className="w-12 h-12 fill-white"
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M438 392V642L642 517 438 392Z"></path>
            </svg>
          </div>
        </div>
      )}

      {showSourceInfo && (
        <div className="absolute top-0 left-0 animate-fadeIn p-3">
          <div className="flex items-center space-x-3 rounded-lg">
            <a
              href="https://vimeo.com/zcprime"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img
                src={alchemylogo}
                alt="Alchemy Studios"
                className="lg:w-15 lg:h-15 lg:block hidden rounded-full border-2 border-black hover:border-blue-500"
              />
            </a>
            <div className="flex flex-col space-y-1">
              <div className="bg-black px-2 py-1 rounded hover:bg-blue-500">
                <a
                  href="https://vimeo.com/1055755772"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.8rem] lg:text-2xl font-bold text-white"
                >
                  Apex-Card-infomercial-2025
                </a>
              </div>
              <div className="bg-black px-2 py-1 w-fit rounded hover:bg-blue-500">
                <a
                  href="https://vimeo.com/zcprime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.8rem] lg:text-md font-semibold text-white"
                >
                  Alchemy Studios
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
