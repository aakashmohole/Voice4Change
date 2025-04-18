import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FeedbackCard = ({ feedback, section }) => {
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) setUser(user);
  }, []);

  const handleLike = () => setLikes(likes + 1);

  const handleComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  const handleEdit = () => {
    navigate(`/civilian-update/${feedback.id}`);
  };

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      const res = await axios.post(
        `http://127.0.0.1:8000/api/feedback/delete/${feedback.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div
      className="p-6 bg-gradient-to-br from-[#2A2B3A] to-[#1E1E2E] 
rounded-lg shadow-lg border border-gray-700 hover:scale-105 
transition-transform duration-300 hover:shadow-blue-500/30"
    >
      {/* Feedback Title & Description */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-blue-400">
          {feedback.title}
        </h3>
        {section !== "home" && (
          <div>
            <MdEdit
              className="cursor-pointer text-lg text-green-400 hover:text-green-500 inline mx-2"
              onClick={handleEdit}
            />{" "}
            <MdDelete
              className="cursor-pointer text-lg text-red-400 hover:text-red-500 inline mx-2"
              onClick={handleDelete}
            />
          </div>
        )}
      </div>

      <p className="text-gray-300 mt-2">{feedback.description}</p>

      {/* Additional Details */}
      <div className="mt-3 text-sm text-gray-400 flex justify-between items-center gap-4">
        <div className="flex gap-2 items-center">
          <FaLocationDot />
          <span>{feedback.location}</span>
        </div>

        <span>🕒 {new Date(feedback.created_at).toDateString()}</span>
        <span> {feedback.feedback_type}</span>
      </div>

      {/* Status Tag */}
      <span
        className={`inline-block px-3 py-1 mt-3 text-xs font-bold uppercase rounded-full ${
          feedback.status === "Resolved"
            ? "bg-green-600"
            : "bg-yellow-600 text-gray-100"
        }`}
      >
        {feedback.status}
      </span>

      {/* Like & Comment Section */}
      <div className="mt-4 flex items-center gap-4">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition"
        >
          {likes > 0 ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          <span>{likes}</span>
        </button>

        {/* Comment Button */}

        {section === "home" && (
          <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition">
            <FaComment />
            <span>{comments.length}</span>
          </button>
        )}
      </div>

      {section === "home" && (
        <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition">
          <FaComment />
          <span>{comments.length}</span>
        </button>
      )}

      {section === "home" && (
        <button
          onClick={handleComment}
          className="mt-2 w-full bg-blue-600 py-2 rounded-md text-white hover:bg-blue-700 transition"
        >
          View More
        </button>
      )}
    </div>
  );
};

export default FeedbackCard;
