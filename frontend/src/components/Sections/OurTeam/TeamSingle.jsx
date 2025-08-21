import React, { useEffect, useState } from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import team1 from "../../../assets/Our-Team-images/TeamMember1.jpg";
import { Link } from "react-router-dom";

export default function TeamSingle() {
  const danHughes = {
    name: 'DAN HUGHES',
    title: 'Creative Director',
    bio1: 'an has Co developed all of ZenChip™ PRIME’s Concepts, Artwork, Patents, Branding, Infrastructure, Financial ecosystems, Crypto Framework, Function and System Components for Online Conversion and many Currency Exchange processes used in the industry today despite banks hesitance of Crypto adoption. Hughes was for many years, prior within his position at Alchemy Studios ',
    bio2: 'and ZenChip PRIME Corp. a Visual Communication Specialist and built many movie props for Harry Potter in Diagon Alley. With Alchemy Studios and Zenchip PRIME Corp., He has now brought his experience in Design, Branding, Financial Experience, Prototyping and Project Development skills to Apex Card Services and The Realm™ as a Digital Artist, Developer and Engineer.',
    image: team1,
    skills: [
      { name: 'Creative Director', value: 100 },
      { name: 'Financial Platforms', value: 90 },
      { name: 'Web Development', value: 100 }
    ],
    socials: [
      { url: 'https://twitter.com/Entertherealm/', icon: <FaTwitter size={19} /> },
      { url: 'https://www.instagram.com/Entertherealm/', icon: <FaInstagram size={19} /> },
      { url: 'https://linkedin.com/Entertherealm/', icon: <FaLinkedin size={19} /> },
    ]
  };

  const projects = [
    {
      id: 1,
      title: "Asclepia Key",
      categories: ["Asclepia Key", "The Realm"],
      link: "https://therealmblox.io/portfolio/asclepia-key/",
      img: "https://therealmblox.io/wp-content/uploads/2024/11/Asclepia-main-island-hm-44-scaled.webp",
    },
    {
      id: 2,
      title: "Boardwalk Island",
      categories: ["Boardwalk Island", "The Realm"],
      link: "https://therealmblox.io/portfolio/boardwalk-island/",
      img: "https://therealmblox.io/wp-content/uploads/2024/10/boardwalk-2-scaled.jpg",
    },
    {
      id: 3,
      title: "Grand Island",
      categories: ["Grand Island", "The Realm"],
      link: "https://therealmblox.io/portfolio/grand-island/",
      img: "https://therealmblox.io/wp-content/uploads/2020/10/grand-island-casino1-1.jpg",
    },
  ];
 const [animatedValues, setAnimatedValues] = useState(
  danHughes.skills.map(() => 0) // start all at 0
);

useEffect(() => {
  const timeout = setTimeout(() => {
    setAnimatedValues(danHughes.skills.map(skill => skill.value));
  }, 200); // small delay so it's smooth

  return () => clearTimeout(timeout);
}, []);

  return (
    <>
      {/* Main Profile Section */}
      <div className="bg-black text-white min-h-screen  py-8 font-sans antialiased">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          {/* Name */}
          <h2 className='text-start mb-5 uppercase text-xs md:text-sm font-semibold'>
            {danHughes.title}
          </h2>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 uppercase">
            {danHughes.name}
          </h2>

          <div className="relative">
            {/* Image + Skills */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Image & Socials */}
              <div className="w-full flex flex-col items-start">
                <div className="relative flex justify-center w-full overflow-hidden">
                  <img
                    src={danHughes.image}
                    alt={danHughes.name}
                    className="w-full max-w-[700px] object-cover"
                  />
                </div>
                <div className="flex space-x-4 mt-8 text-gray-400">
                  {danHughes.socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:-translate-y-1.5 hover:scale-105 transition-all duration-500 ease-in-out text-white p-3 rounded-full bg-[#14141d]"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="w-full flex flex-col">
  <div className="space-y-6 mb-8 mt-10 lg:mt-0">
    {danHughes.skills.map((skill, index) => (
      <div key={index} className="flex flex-col">
        <span className="text-lg font-bold mb-1">{skill.name}</span>
        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#6434eb] h-1.5 transition-all duration-1000 ease-out"
            style={{ width: `${animatedValues[index]}%` }}
          ></div>
        </div>
      </div>
    ))}
  </div>
</div>
            </div>

            {/* Bio Section */}
            <div
              className="
                bg-white p-6 md:p-8 lg:p-10  
                lg:absolute lg:top-60 lg:left-[35%] lg:w-[60%] lg:h-[85%]
                flex flex-col justify-center md:flex-row lg:gap-10
                mt-10 lg:mt-0
              "
            >
              <p className="lg:text-[17px] text-base md:text-lg leading-8 text-left md:w-1/2 text-[#6f7275]">
                <span className="text-5xl font-bold float-left mr-2 leading-none text-[#0b0b0b]">D</span>
                {danHughes.bio1}
              </p>
              <p className="lg:text-[17px] text-[#6f7275] text-base md:text-lg leading-8 text-left md:w-1/2 mt-4 md:mt-0">
                {danHughes.bio2}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className=" mt-20 lg:mt-[300px] flex items-center justify-center">
          <div className="container  mx-auto px-4 max-w-6xl">
            <hr className="border-t border-gray-600" />
          </div>
        </div>
      </div>

      {/* Team Member Projects */}
<section className="team_member_projects py-10 bg-black text-white">
  <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
    <h3 className="section_title text-3xl md:text-4xl lg:text-5xl font-bold mb-10 mt-10">
      Projects by {danHughes.name}
    </h3>

   
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {projects.map((project) => (
    <div
      key={project.id}
      className="relative group overflow-hidden"
    >
      {/* Project Image */}
      <img
        src={project.img}
        alt={project.title}
        className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Sliding Info Box */}
      <div className="absolute left-0 bottom-10 w-[75%] p-4 bg-[#0c0c11] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out">
        <h5 className="text-lg font-bold text-white">
          <Link to={`/single-project-detail/${encodeURIComponent(project.title)}`}>
            {project.title}
          </Link>
        </h5>
        <div className="text-sm text-gray-300">
          {project.categories.join(", ")}
        </div>
      </div>

      {/* Clickable Full Link */}
      <Link
        to={`/single-project-detail/${encodeURIComponent(project.title)}`}
        className="absolute inset-0"
      ></Link>
    </div>
  ))}
</div>
  </div>
</section>


      {/* Biography Section */}
      <div className="bg-[#14141d] text-white py-16">
        <div className="container mx-auto px-6 md:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase mb-8">
            Biography
          </h2>
          <p className="text-base md:text-lg text-left text-[#d6d6d6] mb-10 leading-relaxed">
            Hughes was for many years prior with his position with Alchemy Studios 
            a Visual Communication Specialist and built many movie props for Harry Potter 
            in Diagon Alley. As CEO and Creative Director at ZenChip PRIME Corp, Dan has 
            now brought his experience in Design, Branding, Prototyping and Project Development 
            skills as the creator of Apex Crypto Card™ Services and The Realm™ as a Digital Artist 
            and Engineer.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-red-500 text-xl" />
              <span className="text-md hover:underline">admin@entertherealm.io</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-red-500 text-xl" />
              <span className="text-md font-semibold">+1 321.201.6865</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
