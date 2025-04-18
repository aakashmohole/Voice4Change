import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

const FeedbackDetails = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) setUser(user);
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/feedback/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setFeedback(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/feedback/update/${id}`,
        {
          formData,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      if (response.ok) {
        const updatedFeedback = await response.json();
        setFeedback(updatedFeedback);
        setIsEditing(false);
        toast.success("Feedback updated successfully!");
      } else {
        toast.error("Failed to update feedback");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong");
    }
  };

  if (!feedback)
    return (
      <p className="text-center bg-slate-950 h-screen w-full text-xl p-10 text-gray-500">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg border border-gray-700 text-white">
        <h2 className="text-3xl font-bold text-gray-100 text-center mb-6">
          Feedback Details
        </h2>

        {!isEditing ? (
          <>
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="font-semibold text-white">Title:</span>{" "}
                {feedback.title}
              </p>
              <p>
                <span className="font-semibold text-white">Description:</span>{" "}
                {feedback.description}
              </p>
              <p>
                <span className="font-semibold text-white">Type:</span>{" "}
                {feedback.feedback_type}
              </p>
              <p>
                <span className="font-semibold text-white">Category:</span>{" "}
                {feedback.category}
              </p>
              <p>
                <span className="font-semibold text-white">Location:</span>{" "}
                {feedback.location}
              </p>
              <p>
                <span className="font-semibold text-white">Status:</span>{" "}
                {feedback.status}
              </p>
              <p>
                <span className="font-semibold text-white">Urgency:</span>{" "}
                {feedback.urgency}
              </p>
            </div>

            <button
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg text-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.03]"
              onClick={() => setIsEditing(true)}
            >
              Edit Feedback
            </button>
          </>
        ) : (
          <>
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-white">Title</label>
                <input
                  {...register("title")}
                  className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-white">Description</label>
                <textarea
                  {...register("description")}
                  className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter detailed feedback"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Feedback Type */}
              <div>
                <label className="block text-white">Feedback Type</label>
                <select
                  {...register("feedback_type")}
                  className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white focus:ring-2 focus:ring-blue-500"
                >
                  {[
                    "COMPLAINT",
                    "SUGGESTION",
                    "GENERAL COMMENT",
                    "POLICY IDEA",
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-white">Category</label>
                <select
                  {...register("category")}
                  className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white focus:ring-2 focus:ring-blue-500"
                >
                  {[
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

              {/* Location */}
              <div>
                <label className="block text-white">Location</label>
                <input
                  {...register("location")}
                  className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-white">Urgency</label>
                <select
                  {...register("urgency")}
                  className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white focus:ring-2 focus:ring-blue-500"
                >
                  {["LOW", "MEDIUM", "HIGH"].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                className="w-full bg-green-500 text-white px-6 py-2 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-green-600 hover:scale-[1.03]"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
              <button
                className="w-full bg-gray-600 text-white px-6 py-2 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-gray-700 hover:scale-[1.03]"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackDetails;
