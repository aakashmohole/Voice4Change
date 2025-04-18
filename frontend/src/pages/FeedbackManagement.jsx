import React, { useState, useEffect } from "react";
import { 
  FiAlertCircle, 
  FiCheckCircle, 
  FiClock, 
  FiSearch, 
  FiFilter,
  FiEdit2,
  FiSave,
  FiX,
  FiChevronDown,
  FiMessageSquare,
  FiUser,
  FiMapPin,
  FiDownload,
  FiRefreshCw
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const statusIcons = {
  Pending: <FiClock className="text-yellow-500" />,
  "In Progress": <FiAlertCircle className="text-blue-500" />,
  Resolved: <FiCheckCircle className="text-green-500" />,
};

const statusColors = {
  Pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  "In Progress": "bg-blue-500/10 text-blue-500 border-blue-500/30",
  Resolved: "bg-green-500/10 text-green-500 border-green-500/30",
};

const categories = [
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
];

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");


  const exportToCSV = () => {
    if (feedbacks.length === 0) {
      alert("No feedback data to export.");
      return;
    }

    const headers = [
      "Title",
      "Description",
      "Category",
      "User Name",
      "User Email",
      "Status",
      "Location",
      "Date",
    ];

    const csvData = feedbacks.map((f) =>
      [
        `"${f.title}"`,
        `"${f.description}"`,
        `"${f.category}"`,
        `"${f.user?.first_name} ${f.user?.last_name}"`,
        `"${f.user?.email}"`,
        `"${f.status}"`,
        `"${f.location}"`,
        `"${new Date(f.created_at).toLocaleDateString()}"`,
      ].join(",")
    );

    const csvContent = [headers.join(","), ...csvData].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "feedback_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) setUser(user);

    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/feedback/admin?status=${status}&category=${category}&search=${searchQuery
            .trim()
            .toLowerCase()}`,
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
  }, [status, category, searchQuery]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) setUser(user);

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://127.0.0.1:8000/api/admin-dashboard/dashboard",
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );

        console.log(res.data);
        setStats(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (newStatus, id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/feedback/update/${id}/`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );
      setFeedbacks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-950 text-gray-100">
      {/* Header and Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Feedback Management
          </h1>
          <p className="text-gray-400">
            Monitor and respond to citizen feedback
          </p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
          >
            <FiDownload className="mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<FiMessageSquare className="text-blue-400" />}
          title="Total Feedback"
          value={stats?.total_feedback}
          color="bg-blue-500/10"
        />
        <StatCard
          icon={<FiClock className="text-yellow-400" />}
          title="Pending"
          value={stats?.pending_feedback}
          color="bg-yellow-500/10"
        />
        <StatCard
          icon={<FiAlertCircle className="text-blue-400" />}
          title="In Progress"
          value={stats?.in_progress_feedback}
          color="bg-blue-500/10"
        />
        <StatCard
          icon={<FiCheckCircle className="text-green-400" />}
          className="text-green-400"
          title="Resolved"
          value={stats?.resolved_feedback}
          color="bg-green-500/10"
        />
      </div>

      {/* Search and Filter Section */}
      <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-800">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search feedback by title, description, location..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="grid grid-cols-2 md:flex gap-2">
              <select
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All</option>
                <option value="UNDER REVIEW">Under Review</option>
                <option value="RESOLVED">Resolved</option>
                <option value="REJECTED">Rejected</option>
              </select>

              <select
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-lg h-screen">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Feedback
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback) => (
                  <tr
                    key={feedback.id}
                    className="hover:bg-gray-800/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                          <FiMessageSquare className="text-blue-400 group-hover:text-blue-300" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {feedback.title}
                          </div>
                          <div className="text-sm text-gray-400 line-clamp-2">
                            {feedback.description}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <FiMapPin className="mr-1" size={12} />
                            {feedback.location} •{" "}
                            {new Date(
                              feedback?.created_at
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">
                        {feedback.category}
                      </div>
                      <div className="text-xs text-blue-400">
                        {feedback.policy}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                          <FiUser
                            className="text-gray-400 group-hover:text-blue-300"
                            size={14}
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm text-white">
                            {feedback.user.first_name}
                            {feedback.user.last_name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {feedback.user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {feedback.isEditing ? (
                        <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="UNDER REVIEW">Under Review</option>
                          <option value="IN PROGRESS">In Progress</option>
                          <option value="RESOLVED">Resolved</option>
                        </select>
                      ) : (
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[feedback.status]
                          } border`}
                        >
                          {statusIcons[feedback.status]}
                          <span className="ml-1 capitalize">
                            {feedback.status}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          handleStatusUpdate(e.target.value, feedback.id);
                        }}
                      >
                        <option value="UNDER REVIEW">Under Review</option>
                        <option value="IN PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <FiSearch className="text-4xl mb-3" />
                      <p className="text-lg">
                        No feedback found matching your criteria
                      </p>
                      <button
                        className="mt-4 px-4 py-2 text-blue-400 hover:text-blue-300 text-sm bg-blue-500/10 rounded-lg"
                        onClick={() => {
                          setSearchQuery("");
                          setActiveFilter("All");
                          setCategoryFilter("All");
                          setPolicyFilter("All");
                        }}
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, status, icon, className }) => {
  const iconMap = {
    total: <FiMessageSquare className="text-blue-500" />,
    pending: <FiClock className="text-yellow-500" />,
    inProgress: <FiAlertCircle className="text-blue-500" />,
    resolved: <FiCheckCircle className="text-green-500" />,
  };

  const colorMap = {
    total: "bg-blue-500/10 border-blue-500/30",
    pending: "bg-yellow-500/10 border-yellow-500/30",
    inProgress: "bg-blue-500/10 border-blue-500/30",
    resolved: "bg-green-500/10 border-green-500/30",
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`p-4 rounded-xl border bg-gray-800/50 border-gray-700 transition-all ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-300">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </motion.div>
  );
};

export default FeedbackManagement;