import React from "react";
import Home from "./pages/Home";
import Registration from "./components/Registeration";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import CivilianDashboard from "./pages/Civilian";
import CivilianAuthProvider from "./components/CivilianAuthProvider";
import FeedbackModal from "./components/FeedbackModel";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAuthProvider from "./components/AdminAuthProvider";
import FeedbackManagement from "./pages/FeedbackManagement";
import AiInsights from "./pages/AiInsights";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/civilian"
          element={
            <CivilianAuthProvider>
              <CivilianDashboard />
            </CivilianAuthProvider>
          }
        />
        <Route
          path="/civilian-update/:id"
          element={
            <CivilianAuthProvider>
              <FeedbackModal />
            </CivilianAuthProvider>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminAuthProvider>
              <AdminDashboard />
            </AdminAuthProvider>
          }
        />
        <Route
          path="/admin/feedback-management"
          element={
            <AdminAuthProvider>
              <FeedbackManagement />
            </AdminAuthProvider>
          }
        />
        <Route
          path="/admin/aiinsights"
          element={
            <AdminAuthProvider>
              <AiInsights />
            </AdminAuthProvider>
          }
        />
      </Routes>
    </>
  );
}
