import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-blue-900 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/">
        <span className="text-xl font-bold">Booking</span>
        </Link>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button className="bg-white text-blue-600 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
            Register
          </button>
          <button className="bg-white text-blue-600 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

