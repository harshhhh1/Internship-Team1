import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Suntouch IT Company</h2>
          <p>Innovative IT solutions for businesses worldwide.</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2 hover:text-white cursor-pointer">Home</li>
            <li className="mb-2 hover:text-white cursor-pointer">About Us</li>
            <li className="mb-2 hover:text-white cursor-pointer">Services</li>
            <li className="mb-2 hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Services</h3>
          <ul>
            <li className="mb-2 hover:text-white cursor-pointer">Web Development</li>
            <li className="mb-2 hover:text-white cursor-pointer">Mobile Apps</li>
            <li className="mb-2 hover:text-white cursor-pointer">IT Consulting</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>Email: info@suntouch.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Address: Mumbai, India</p>
        </div>
      </div>

      <div className="mt-12 text-center border-t border-gray-700 pt-6">
        © 2026 Suntouch IT Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
