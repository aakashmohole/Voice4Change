import React, { useState } from "react";

const Sidebar = ({ activeTab, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button for Small Screens */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white text-gray-900 p-3 rounded-full shadow-lg transition-transform hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar with Glassmorphism Effect */}
      <aside
        className={`fixed md:relative top-0 left-0 w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 min-h-screen backdrop-blur-md shadow-lg border-r border-gray-700 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center tracking-wider">
          Dashboard
        </h2>
        <nav className="space-y-4">
          {["home", "create", "myfeedbacks"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActivePage(tab);
                setIsOpen(false);
              }}
              className={`block w-full text-left py-3 px-4 rounded-lg text-lg transition font-medium tracking-wide ${
                activeTab === tab
                  ? "bg-blue-600 shadow-md"
                  : "hover:bg-gray-800 hover:scale-105"
              }`}
            >
              {tab === "home" && "🏠 Home"}
              {tab === "create" && "➕ Create Feedback"}
              {tab === "myfeedbacks" && "📂 My Feedbacks"}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay when Sidebar is Open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;