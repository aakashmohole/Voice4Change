import React, { useState, useEffect } from "react";
import { FiBarChart2, FiPieChart, FiTrendingUp, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const AiInsights = () => {
  const [loading, setLoading] = useState(false);
  const [geoHotspots, setGeoHotspots] = useState([]);
  const [emergingIssues, setEmergingIssues] = useState([]);
  const [sentimentTrends, setSentimentTrends] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://127.0.0.1:8000/api/ai/ai-insights/",
          {
            headers: { Authorization: `Bearer ${user?.access_token}` },
          }
        );

        const normalizedHotspots = res.data.geographic_hotspots.map((item) => ({
          location:
            item.location.charAt(0).toUpperCase() +
            item.location.slice(1).toLowerCase(),
          total: item.total,
        }));

        const issueMap = {};
        res.data.emerging_issues.forEach((item) => {
          const category = item.category.toUpperCase(); // Convert to uppercase for uniformity
          issueMap[category] = (issueMap[category] || 0) + item.total;
        });
        const normalizedIssues = Object.entries(issueMap).map(
          ([category, total]) => ({
            category,
            total,
          })
        );

        const processedSentiments = res.data.sentiment_trends.map((item) => ({
          sentiment_score: item.sentiment_score ?? 0.0, // Replace null with 0
        }));

        setGeoHotspots(normalizedHotspots || []);
        setEmergingIssues(normalizedIssues || []);
        setSentimentTrends(processedSentiments || []);
        setAiAnalysis(res.data.ai_analysis);
      } catch (error) {
        console.error("Error fetching insights:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Colors for Pie Chart
  const COLORS = [
    "#4CAF50",
    "#2196F3",
    "#FF9800",
    "#E91E63",
    "#9C27B0",
    "#FF5722",
  ];

  return (
    <div className="p-6 bg-gray-950 text-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            AI Insights Dashboard
          </h1>
          <p className="text-gray-400">
            Powered by AI to analyze citizen feedback patterns
          </p>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 📊 Geographic Hotspots - Bar Chart */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-900 rounded-xl border border-gray-800 p-5 hover:border-blue-500/50 transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Geographic Hotspots
              </h3>
              <p className="text-sm text-gray-400">
                Top locations with high activity
              </p>
            </div>
            <FiBarChart2 className="text-green-500" />
          </div>
          <div className="h-72 bg-gray-800/50 rounded-lg p-4 flex items-center justify-center border border-gray-700">
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={geoHotspots}
                  margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="location" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.1)" }}
                    contentStyle={{
                      backgroundColor: "#222",
                      color: "#fff",
                      borderRadius: "5px",
                      padding: "8px",
                    }}
                  />
                  <Bar
                    dataKey="total"
                    fill="#4CAF50"
                    barSize={40}
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* 🥧 Emerging Issues - Pie Chart */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-900 rounded-xl border border-gray-800 p-5 hover:border-blue-500/50 transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Emerging Issues
              </h3>
              <p className="text-sm text-gray-400">
                Trending concerns from feedback
              </p>
            </div>
            <FiPieChart className="text-purple-500" />
          </div>
          <div className="h-72 bg-gray-800/50 rounded-lg p-4 flex items-center justify-center border border-gray-700">
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emergingIssues}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    label
                  >
                    {emergingIssues.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#222",
                      color: "#fff",
                      borderRadius: "5px",
                      padding: "8px",
                    }}
                  />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* 📈 Sentiment Trends - Line Chart */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-900 rounded-xl border border-gray-800 p-5 hover:border-blue-500/50 transition-all col-span-2"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Sentiment Trends
              </h3>
              <p className="text-sm text-gray-400">How people feel over time</p>
            </div>
            <FiTrendingUp className="text-blue-500" />
          </div>
          <div className="h-72 bg-gray-800/50 rounded-lg p-4 flex items-center justify-center border border-gray-700">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentTrends}>
                <XAxis stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sentiment_score"
                  stroke="#FF9800"
                  strokeWidth={2}
                  dot={{ fill: "#FF9800" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      <div className="mt-8 bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h2 className="text-xl font-semibold text-white mb-4">
          AI Recommendations
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-medium text-white mb-2">AI Feedback</h3>
            <p className="text-sm text-gray-300">{aiAnalysis}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiInsights;
