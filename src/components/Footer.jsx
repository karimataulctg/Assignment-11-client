import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/LibraryLogo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex justify-around items-center">
        {/* Left Side: Address */}
        <div>
          <h2 className="text-lg font-semibold">Address:</h2>
          <p>St. Placid School</p>
          <p>Patherghata, Chattogram-4000</p>
          <p>Phone: (031) 456-7890</p>
        </div>
        
        {/* Middle: Logo and Website Name */}
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <img src={logo} alt="Library Logo" className="h-16" />
          </div>
          <h1 className="text-xl font-bold">Library Management System</h1>
        </div>
        
        {/* Right Side: Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

