import React from "react";
import MainImage from "../components/Sections/OurTeam/MainImage";
import Team from "../components/Sections/OurTeam/TeamMembers";
import PopularArticles from "../components/Sections/OurTeam/PopularArticles";

const OurTeam = () => {
  return (
    <div className="page-container  ">
     <MainImage/>
     <Team/>
     <PopularArticles/>
    </div>
  );
};

export default OurTeam;
