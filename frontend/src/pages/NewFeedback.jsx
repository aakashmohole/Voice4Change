import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const feedbackSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  feedback_type: z.enum([
    "COMPLAINT",
    "SUGGESTION",
    "GENERAL COMMENT",
    "POLICY IDEA",
  ]),
  category: z.enum([
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
  ]),
  location: z.string().min(3, "Location must be at least 3 characters"),
  isAnonymous: z.boolean(),
  urgency: z.enum(["LOW", "MEDIUM", "HIGH"]),
  feedbackImage: z.any().optional(),
});

export default function CreateFeedback() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(feedbackSchema),
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setUser(user);
    }
  }, []);

  const onSubmit = async (d) => {
    console.log("Submitted Feedback:", d);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/feedback/create/",
        d,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );
      console.log("New feedback created successful:", response.data);
      toast.success("New feedback created");
      reset();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "An error occurred"
      );
      console.error("Feedback creation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-10 rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="backdrop-blur-md bg-opacity-10 p-10 rounded-xl shadow-2xl w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            📢 Submit Feedback
          </h2>

          {/* Title */}
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block text-white">Location</label>
            <input
              {...register("location")}
              className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* Is Anonymous */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              {...register("isAnonymous")}
              className="mr-2 accent-blue-500"
            />
            <label className="text-white">Submit as Anonymous</label>
          </div>

          {/* Urgency */}
          <div className="mb-4">
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

          {/* Feedback Image Upload */}
          <div className="mb-4">
            <label className="block text-white">Upload Image</label>
            <input
              type="file"
              {...register("feedbackImage")}
              className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white text-lg font-semibold shadow-md hover:opacity-90 transition-all duration-300"
          >
            {loading ? "Submiting..." : " Submit Feedback 🚀"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
