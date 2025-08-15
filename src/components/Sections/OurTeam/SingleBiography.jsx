import React from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

export default function SingleBiography() {
  return (
    <div className="bg-[#14141d] text-white lg:px-0 px-16  py-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-2xl lg:text-4xl font-bold uppercase mb-8">
          Biography
        </h2>

        {/* Paragraph */}
        <p className="lg:text-lg text-left text-[#d6d6d6] w mb-10">
          Hughes was for many years prior with his position with Alchemy Studios 
          a Visual Communication Specialist and built many movie props for Harry Potter 
          in Diagon Alley. As CEO and Creative Director at ZenChip PRIME Corp, Dan has 
          now brought his experience in Design, Branding, Prototyping and Project Development 
          skills as the creator of Apex Crypto Card™ Services and The Realm™ as a Digital Artist 
          and Engineer.
        </p>

        {/* Contact Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-red-500 text-xl" />
            <span className="text-lg">admin@entertherealm.io</span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-red-500 text-xl" />
            <span className="text-lg font-semibold">+1 321.201.6865</span>
          </div>
        </div>

      </div>
    </div>
  );
}
