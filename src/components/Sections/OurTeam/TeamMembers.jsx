import React, { useEffect, useState } from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import team1 from "../../../assets/Our-Team-images/TeamMember1.jpg";
import team2 from "../../../assets/Our-Team-images/TeamMember2.jpg";
import team3 from "../../../assets/Our-Team-images/TeamMember3.png";
import team4 from "../../../assets/Our-Team-images/TeamMember4.png";
import { Link } from 'react-router-dom';

export default function Team() {
    // State for the typing animation
  const strings = ["trust", "inspiration", "pride"];
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenWords = 1500;


  useEffect(() => {
    const timer = setTimeout(() => {
      if (isTyping) {
        if (charIndex < strings[wordIndex].length) {
          setCurrentText(strings[wordIndex].substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setIsTyping(false);
        }
      } else { // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsTyping(true);
          setCharIndex(0); // This line was added to reset the charIndex
          setWordIndex((prevIndex) => (prevIndex + 1) % strings.length);
        }
      }
    }, isTyping ? typingSpeed : (currentText.length === 0 ? delayBetweenWords : deletingSpeed));

    return () => clearTimeout(timer);
  }, [currentText, isTyping, charIndex, wordIndex]);
  const teamMembers = [
    {
      name: 'Dan Hughes',
      title: 'Creative Director',
      bio: 'Dan has Co developed all of ZenChip™ PRIME’s Concepts, Artwork, Patents, Branding, Infrastructure, Financial ecosystems, Crypto Framework, Function and System Components for online Conversion and many Currency Exchange processes used in the industry today despite banks hesitance of crypto adoption.',
      socials: [
        { url: 'https://twitter.com/Entertherealm/', icon: <FaTwitter size={17} /> },
        { url: 'https://www.instagram.com/Entertherealm/', icon: <FaInstagram size={17} /> },
        { url: 'https://linkedin.com/Entertherealm/', icon: <FaLinkedin size={17}/> },
      ],
      image: team1
    },
    {
      name: 'Randy Gruber',
      title: 'Compliance Director',
      bio: 'Randy Gruber brings 35 years experience in Corporate Management, Sales, Marketing and Technical Operations. Randy spent 23 years with Home Shopping Network.',
      socials: [
        { url: 'https://facebook.com/Entertherealm/', icon: <FaFacebook size={17} /> },
        { url: 'https://twitter.com//Entertherealm/', icon: <FaTwitter size={17} /> },
        { url: 'https://www.instagram.com/Entertherealm/', icon: <FaLinkedin size={17} /> },
      ],
      image: team2
    },
    {
      name: 'Val McCleod',
      title: 'Royal Ambassador',
      bio: 'Val McCleod is a visionary leader, international speaker, and transformational strategist whose influence spans both the physical and digital realms. As the Official Royal Ambassador of The Realm, she embodies grace, innovation, and empowerment, championing the advancement of women in business and the evolving frontier of digital asset tokenization.',
      socials: [
        { url: 'https://twitter.com/Entertherealm/', icon: <FaTwitter size={17}/> },
        { url: 'https://www.instagram.com/Entertherealm/', icon: <FaInstagram size={17} /> },
      ],
      image: team3
    },
    {
      name: 'Shakeel Multan',
      title: 'Infrastructure Developer',
      bio: 'Shakeel Multan is the powerhouse behind The Realm’s digital infrastructure. As our full stack developer and engineer, Shakeel masterfully orchestrates a wide array of technological domains, including security, IT, coding, cryptocurrency applications, and backend development. With an unwavering commitment to excellence, he ensures that our platform remains secure, responsive, and at the forefront of technological innovation.',
      socials: [
        { url: 'https://twitter.com/Entertherealm/', icon: <FaTwitter size={18} /> },
        { url: 'https://www.instagram.com/Entertherealm/', icon: <FaInstagram size={17} /> },
        { url: 'https://linkedin.com/Entertherealm/', icon: <FaLinkedin size={17} /> },
      ],
      image: team4
    },
  ];
   const danHughes = {
    name: 'DAN HUGHES',
    title: 'Creative Director',
    image: team1
  };

  

  return (
    <div className="bg-[#0C0C11] md:p-8 lg:p-8 p-4 font-sans antialiased text-white  ">
        <div className="flex flex-col items-center justify-center text-center">
           <h1 className="lg:text-[42px] md:text-[30px] text-[18.5px] font-semibold mt-3 ">AND THE CREATIVE MINDS BEHIND IT</h1>
           <p className="md:text-[17px] lg:text-[16px] text-[14px]  text-[#d6d6d6] mt-4 mb-12">V-COMMERCE VIRTUAL WORLD</p>
         </div>

      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative flex flex-col lg:flex-row overflow-hidden bg-[#14141d] shadow-lg hover:shadow-xl transition-all duration-300 h-auto min-h-[490px] w-full"
            >
              {/* Profile Image */}
  

                <Link
                  to={`/our-team/${member.name.replace(/\s+/g, '-').toLowerCase()}`}
                  className="w-full lg:w-1/2 h-80 lg:h-full bg-cover bg-center transition-transform duration-500 hover:scale-105 block"
                  style={{ backgroundImage: `url('${member.image}')` }}
                >
                  {/* no inner content needed since image is background */}
                </Link>


                              {/* Content */}
                              <div className="p-6 lg:p-10 flex flex-col justify-center w-full lg:w-1/2">
                                {/* Name & Title */}
                                <div>
                                <h4 className="text-[24px] font-bold text-white mb-1 uppercase">
                                <Link to={`/our-team/${member.name.replace(/\s+/g, '-').toLowerCase()}`}>
                  {member.name}
                </Link>
                </h4>

                  <div className="text-[16px] font-medium text-[#a9a9b1]">{member.title}</div>
                </div>

                {/* Bio */}
                <div className="text-gray-300 text-[17px] mt-4 leading-relaxed">
                  <p>{member.bio}</p>
                </div>

                {/* Socials */}
               <div className="flex space-x-4 mt-6">
  {member.socials.map((social, i) => (
                <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#32323E] rounded-full p-3 hover:text-[#7a4ff4] hover:-translate-y-1 transition-all duration-200"
                >
                {social.icon}
                </a>
            ))}
              </div>

              </div>

              {/* Optional: If you still want card clickable */}
              {/* <a href={`#${member.name.replace(/\s/g, '-')}`} className="absolute inset-0 z-10"></a> */}
            </div>
          ))}
        </div>
      </div>
       <div className="flex flex-col items-center justify-center text-white font-sans antialiased relative p-8">
     

      {/* Main Content */}
    <div className="max-w-[120rem] text-center  py-10 sm:px-8 md:px-12 lg:p-14">
  {/* Sub-heading */}
  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-4">
    What We Do
  </h3>

  {/* Main Heading with dynamic text */}
  <h1 className="text-[16px] sm:text-2xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight mb-10 md:mb-16 w-full md:w-[95%] mx-auto">
    Virtual worlds, v-communities and digital experiences, created with ambition, innovation and <span>{currentText}</span>.
  </h1>

  {/* Team Member Card */}
  <div className="flex flex-col items-center justify-center mt-8 md:mt-12">
    {/* Profile Image */}
    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-70 lg:h-70 rounded-full overflow-hidden mb-4 md:mb-6">
      <img
        src={danHughes.image}
        alt={danHughes.name}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Name and Title */}
    <div className="text-center">
      <h4 className="text-lg sm:text-xl md:text-[16px] font-bold uppercase tracking-wide mb-1">
        {danHughes.name}
      </h4>
      <div className="text-sm sm:text-base md:text-[17px] text-gray-400 font-medium">
        {danHughes.title}
      </div>
    </div>
  </div>
</div>

    </div>
    </div>
  );
}
