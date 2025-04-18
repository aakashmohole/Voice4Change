import React, { useState } from "react";
import AdminNavbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import FeedbackManagement from "./FeedbackManagement";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <AdminNavbar isAdmin={true} />
      
      <div className="flex flex-1 pt-16">
        <AdminSidebar activeTab={activeTab} setActivePage={setActiveTab} />
        
        <main className="flex-1 p-6 md:ml-64 overflow-auto">
          {activeTab === "dashboard" && <AdminDashboard />}
          {activeTab === "feedback-management" && <FeedbackManagement />}
          {/* Add other tabs as needed */}
        </main>
      </div>
    </div>
  );
};

export default Admin;