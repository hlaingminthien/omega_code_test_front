import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // Assuming you're using react-icons
import { useNavigate } from 'react-router-dom';

const NavBar = ({onLogout}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
    navigate('/');
    // Perform logout logic here
    // Redirect to the login page or perform any other necessary actions
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-white font-bold text-xl">OmegaZero Technology</h1>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <NavLink exact to="/home" className={`text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/home' ? 'bg-blue-500 text-white' : ''}`}>Home</NavLink>
              </li>
              <li>
                <NavLink exact to="/user" className={`text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/user' ? 'bg-blue-500 text-white' : ''}`}>User</NavLink>
              </li>
              <li>
                <NavLink exact to="/report" className={`text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/report' ? 'bg-blue-500 text-white' : ''}`}>Report</NavLink>
              </li>
              <li>
                <NavLink exact to="/mailing" className={`text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/mailing' ? 'bg-blue-500 text-white' : ''}`}>Mailing</NavLink>
              </li>
              <li>
                <NavLink exact to="/meta" className={`text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/meta' ? 'bg-blue-500 text-white' : ''}`}>Meta</NavLink>
              </li>
            </ul>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              <FiLogOut className="inline-block mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
