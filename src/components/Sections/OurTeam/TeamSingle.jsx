import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import team1 from "../../../assets/Our-Team-images/TeamMember1.jpg";
import TeamMemberProjects from './TeamMemberProjects';
import SingleBiography from './SingleBiography';

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

  return (
    <>
    <div className="bg-black  text-white min-h-screen lg:mt-10  mt-20   p-8 lg:p-30  md:p-15 font-sans antialiased ">
      <div className="max-w-6xl mx-auto">
        
        {/* Name */}
        <h2 className='text-start mb-5 uppercase lg:text-sm text-[12px] md:text-[15px] font-semibold'>{danHughes.title}</h2>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8   uppercase">
          {danHughes.name}
        </h2>

        <div className="relative">
          {/* Image + Skills */}
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Image & Socials */}
            <div className="w-full flex flex-col items-start">
              <div className="relative flex justify-center w-full h-auto overflow-hidden">
                <img
                  src={danHughes.image}
                  alt={danHughes.name}
                  className="w-full max-w-[700px] md:w-full lg:w-[100%]  h-auto object-cover"
                />
              </div>
              <div className="flex  space-x-4 mt-8 text-gray-400">
                {danHughes.socials.map((social, index) => (
                <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:-translate-y-1.5 hover:scale-105 transition-all duration-500 ease-in-out text-white   p-3 rounded-full bg-[#14141d]"
                    >
                    {social.icon}
                    </a>

                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="w-full lg:w-1/1 flex flex-col">
              <div className="space-y-6 mb-8 mt-10 lg:mt-0">
                {danHughes.skills.map((skill, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-lg font-bold mb-1">{skill.name}</span>
                    <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#6434eb] h-1.5 transition-all duration-1000"
                        style={{ width: `${skill.value}%` }}
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
              bg-white p-8 lg:p-10  
              lg:absolute lg:top-60 lg:left-[35%] lg:w-[60%] lg:h-[85%]
              
              flex flex-col justify-center md:flex-row lg:gap-10
              mt-10 lg:mt-0
            "
          >
            <p className="lg:text-[17px] text-lg leading-8 text-left md:w-1/2 text-[#6f7275]  ">
              <span className="text-5xl font-bold float-left mr-2 leading-none text-[#0b0b0b]">D</span>
              {danHughes.bio1}
            </p>
            <p className="lg:text-[17px] text-[#6f7275] text-lg leading-8 text-left md:w-1/2">
              {danHughes.bio2}
            </p>
          </div>
        </div>
      </div>
       <div className="bg-[#0b0b0f] mt-[100px] lg:mt-[300px] flex items-center justify-center">
      <div className="w-full max-w-6xl">
        {/* Divider Line */}
        <hr className="border-t border-gray-600" />
      </div>
    </div>
    <TeamMemberProjects />
    
    </div>
    
    <SingleBiography/>
    </>
  );
}
