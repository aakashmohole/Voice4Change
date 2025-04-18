import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../pages/CivilianHome";
import CreateFeedback from "../pages/NewFeedback";
import MyFeedbacks from "../pages/MyFeedbacks";
import { FiLogOut, FiChevronDown } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CivilianDashboard = () => {
  const [activeTab, setActiveTab] = useState("myfeedbacks");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Get user data from localStorage (replace with your actual user data structure)
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.access_token}`,
          },
        }
      );

      if (res.data) {
        localStorage.removeItem("userData");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white">
      {/* Top Navigation Bar */}
      <nav className="flex justify-between items-center p-4 bg-gray-900/80 backdrop-blur-md shadow-md w-full h-16 z-50">
        {/* Logo Section */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={logo}
            alt="Voice4Change Logo"
            className="h-10 w-auto mr-3"
          />
        </motion.div>

        {/* Profile Section with Dropdown */}
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="flex items-center space-x-3">
              {userData?.user.profilePic ? (
                <img
                  src={userData?.user.profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-400"
                />
              ) : (
                <FaUserCircle className="text-blue-400 text-3xl" />
              )}
              <div className="text-right">
                <p className="font-medium text-sm">
                  {userData?.user.first_name} {userData?.user.last_name}
                </p>
                <p className="text-gray-300 text-xs">{userData?.user.email}</p>
              </div>
              <FiChevronDown
                className={`transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </div>
          </motion.div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50 border border-gray-700"
            >
              <div className="py-1">
                <button
                  onClick={() => {
                    // Add navigation to profile page here
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  View Profile
                </button>
                <div className="border-t border-gray-700"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActivePage={setActiveTab} />

        <main className="p-10 w-full animate-fadeIn flex justify-center items-center">
          <div className="w-full max-w-3xl bg-opacity-90 rounded-lg shadow-2xl">
            {activeTab === "home" && <Home />}
            {activeTab === "create" && <CreateFeedback />}
            {activeTab === "myfeedbacks" && <MyFeedbacks />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CivilianDashboard;
