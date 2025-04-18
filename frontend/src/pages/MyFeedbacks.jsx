import React, { use, useEffect, useState } from "react";
import FeedbackCard from "../components/FeedbackCard";
import axios from "axios";
import FeedbackModal from "../components/FeedbackModel";
import { motion } from "framer-motion";

const MyFeedbacks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lang, setLang] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://127.0.0.1:8000/api/feedback/user/",
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setData(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/feedback/list/?lang=${lang}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setData(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (lang) fetchData();
  }, [lang]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateFeedback = (updatedFeedback) => {
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === updatedFeedback.id ? updatedFeedback : f))
    );
  };

  console.log(data);
  return (
    <div className="p-10 max-w-4xl mx-auto bg-gray-800">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">My Feedbacks</h2>
        <select
          className="bg-gray-700 px-4 py-2"
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="">None</option>
          <option value="mr">Marathi</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      {loading && <div className="mt-4">Loading...</div>}
      <div className="mt-6 space-y-6">
        {data.length > 0 ? (
          data.map((feedback, index) => (
            <>
              <FeedbackCard
                key={feedback.id}
                feedback={feedback}
                section="myfeedbacks"
              />
            </>
          ))
        ) : (
          <p className="text-gray-400">No feedbacks submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyFeedbacks;