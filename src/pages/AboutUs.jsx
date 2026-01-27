import React from 'react';
import team1 from '../assets/team1.jpg';
import team2 from '../assets/team2.jpg';
import team3 from '../assets/team3.jpg';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-28 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Suntouch IT Company</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl">
          We are a team of passionate technology experts delivering innovative IT solutions worldwide.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">Our Mission</h2>
          <p>
            Empower businesses with modern technology solutions, enabling growth, efficiency, and success in a digital world.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">Our Vision</h2>
          <p>
            To become a globally recognized IT company known for innovation, quality, and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <img src={team1} alt="Team Member" className="w-32 h-32 rounded-full mb-4" />
            <h3 className="text-xl font-semibold mb-1">Priya Sharma</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src={team2} alt="Team Member" className="w-32 h-32 rounded-full mb-4" />
            <h3 className="text-xl font-semibold mb-1">Rohan Mehta</h3>
            <p className="text-gray-600">CTO</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src={team3} alt="Team Member" className="w-32 h-32 rounded-full mb-4" />

            <h3 className="text-xl font-semibold mb-1">Amit Verma</h3>
            <p className="text-gray-600">Lead Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
