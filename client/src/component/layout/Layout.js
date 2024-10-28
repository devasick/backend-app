// src/components/layout/Layout.js
import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaList,
  FaUtensils,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

import TopBar from "./TopBar"; // Import the TopBar component

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Bar */}
      <TopBar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-blue-800 text-white flex flex-col">
          <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
          <nav className="flex-1 p-4">
            <ul>
              <li className="mb-4">
                <Link
                  to="/dashboard"
                  className="flex items-center p-2 hover:bg-blue-700 rounded"
                >
                  <FaTachometerAlt className="mr-2" /> Dashboard
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/users"
                  className="flex items-center p-2 hover:bg-blue-700 rounded"
                >
                  <FaList className="mr-2" /> Users
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/categories"
                  className="flex items-center p-2 hover:bg-blue-700 rounded"
                >
                  <FaList className="mr-2" /> Categories
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/menu-items"
                  className="flex items-center p-2 hover:bg-blue-700 rounded"
                >
                  <FaUtensils className="mr-2" /> Menu Items
                </Link>
              </li>
              <li className="mb-4">
                <button
                  onClick={toggleSubMenu}
                  className="flex items-center p-2 hover:bg-blue-700 rounded w-full text-left"
                >
                  <FaUtensils className="mr-2" /> POS{" "}
                  {isSubMenuOpen ? (
                    <FaChevronUp className="ml-auto" />
                  ) : (
                    <FaChevronDown className="ml-auto" />
                  )}
                </button>
                {isSubMenuOpen && (
                  <ul className="ml-4 mt-2">
                    <li className="mb-2">
                      <Link
                        to="/pos"
                        className="flex items-center p-2 hover:bg-blue-700 rounded"
                      >
                        <FaUtensils className="mr-2" /> POS
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        to="/pos/submenu1"
                        className="flex items-center p-2 hover:bg-blue-700 rounded"
                      >
                        <FaUtensils className="mr-2" /> Submenu 1
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        to="/pos/submenu2"
                        className="flex items-center p-2 hover:bg-blue-700 rounded"
                      >
                        <FaUtensils className="mr-2" /> Submenu 2
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  className="flex items-center p-2 hover:bg-blue-700 rounded"
                >
                  <FaCog className="mr-2" /> Settings
                </a>
              </li>
            </ul>
          </nav>
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="flex items-center p-2 w-full text-left hover:bg-blue-700 rounded"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 bg-white">
          {children} {/* Render child components here */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
