import React, { useEffect, useState } from "react";
import FeedbackCard from "../components/FeedbackCard";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPlus,
  FiSearch,
} from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";

const statusIcons = {
  Pending: <FiClock className="text-yellow-400" />,
  Resolved: <FiCheckCircle className="text-green-400" />,
  "In Progress": <FiAlertCircle className="text-blue-400" />,
};

const CivilianHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackType,setFeedbackType] = useState("");
  const [status,setStatus] = useState("");
  const [category,setCategory] = useState("");
  const [urgency,setUrgency] = useState("");

  const [feedbacks, setFeedbacks] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) setUser(user);

    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/feedback/list?feedback_type=${feedbackType}&category=${category}&status=${status}&urgency=${urgency}&search=${searchQuery.trim().toLowerCase()}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setFeedbacks(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [feedbackType,urgency,status,category,searchQuery]);


  const handleClearFilter = ()=>{
    setFeedbackType("");
    setStatus("");
    setCategory('');
    setUrgency('');
  }


  return (
    <div className="p-6 md:p-8 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Community Feedback Hub
          </h2>
          <p className="text-gray-400 mt-2">
            Track and engage with local issues that matter to you
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full md:w-64"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search issues..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <div>
          <select
            placeholder="Select feedback type"
            className="bg-blue-900/70 px-2 py-1 rounded"
            onChange={(e) => setFeedbackType(e.target.value)}
            value={feedbackType}
          >
            <option value="">All</option>
            <option value="COMPLAINT">Complaint</option>
            <option value="SUGGESTION">Suggestion</option>
            <option value="GENERAL COMMENT">General Comment</option>
            <option value="POLICY IDEA">Policy Idea</option>
          </select>
        </div>
        <div>
          <select
            placeholder="Select Status"
            className="bg-blue-900/70 px-2 py-1 rounded"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <option value="">All</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="PENDING">Pending</option>
            <option value="RESOLVED">Resolved</option>
            <option value="UNDER REVIEW">Under Review</option>
          </select>
        </div>
        <div>
          <select
            placeholder="Select Category"
            className="bg-blue-900/70 px-2 py-1 rounded"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {[
              "",
              "INFRASTRUCTURE",
              "TRANSPORTATION",
              "EDUCATION",
              "HEALTHCARE",
              "SANITATION",
              "WATER",
              "ELECTRICITY",
              "PUBLIC_SAFETY",
              "ENVIRONMENT",
              "HOUSING",
              "TAXATION",
              "WELFARE",
              "EMPLOYMENT",
              "AGRICULTURE",
              "TOURISM",
              "CULTURE",
              "OTHER",
            ].map((category) => (
              <option key={category} value={category}>
                {category.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            placeholder="Select Urgency"
            className="bg-blue-900/70 px-2 py-1 rounded"
            onChange={(e) => setUrgency(e.target.value)}
            value={urgency}
          >
            <option value="">All</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <button
          className="bg-green-400 px-2 py-1 rounded cursor-pointer"
          onClick={handleClearFilter}
        >
          Clear Filters
        </button>
      </div>


      {/* Feedback Cards */}
      <div className="space-y-4">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FeedbackCard
                feedback={feedback}
                statusIcon={statusIcons[feedback.status]}
                section="home"
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400"
          >
            {feedbacks.length && !loading < 1 && (
              <p>No issues found matching</p>
            )}
            {loading && <p>Loading...</p>}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CivilianHome;


// {
//   filters.map((filter) => (
//     <motion.button
//       key={filter}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       className={`px-3 py-1 rounded-full text-xs transition-colors ${
//         activeFilter === filter
//           ? "bg-blue-600 text-white"
//           : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//       }`}
//       onClick={() => setActiveFilter(filter)}
//     >
//       {filter}
//     </motion.button>
//   ));
// }
