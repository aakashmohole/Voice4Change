import React from "react";
import { motion } from "framer-motion";
import { FiMessageSquare, FiThumbsUp, FiPaperclip, FiEdit2, FiCheckCircle, FiClock, FiMapPin  } from "react-icons/fi";

const AdminFeedbackCard = ({ feedback, statusIcon, statusColor, adminView = false, onStatusChange }) => {
  const statusOptions = adminView ? [
    { value: "Pending", label: "Pending", icon: <FiClock className="text-yellow-400" /> },
    { value: "In Progress", label: "In Progress", icon: <FiEdit2 className="text-blue-400" /> },
    { value: "Resolved", label: "Resolved", icon: <FiCheckCircle className="text-green-400" /> }
  ] : null;

  const handleStatusChange = (e) => {
    if (onStatusChange) {
      onStatusChange(e.target.value);
    }
  };


  

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden shadow-lg"
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {feedback.title}
            </h3>
            <p className="text-gray-400 mt-1">{feedback.description}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs flex items-center ${statusColor}`}
          >
            {statusIcon}
            <span className="ml-1">{feedback.status}</span>
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="flex items-center text-gray-400">
            <FiMapPin className="mr-1" />
            {feedback.location}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400">
            {new Date(feedback.created_at).toDateString()}
          </span>
          <span className="text-gray-500">•</span>
          <span className="flex items-center text-gray-400">
            <FiThumbsUp className="mr-1" />
            {feedback.upvotes} upvotes
          </span>
          <span className="text-gray-500">•</span>
          <span className="flex items-center text-gray-400">
            <FiMessageSquare className="mr-1" />
            {feedback.comments} comments
          </span>
          {feedback.attachments > 0 && (
            <>
              <span className="text-gray-500">•</span>
              <span className="flex items-center text-gray-400">
                <FiPaperclip className="mr-1" />
                {feedback.attachments} attachment
                {feedback.attachments !== 1 ? "s" : ""}
              </span>
            </>
          )}
        </div>

        {adminView && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Submitted by:{" "}
                <span className="text-blue-400">
                  {feedback.user?.first_name}
                </span>{" "}
                <span className="text-blue-400">
                  {feedback.user?.last_name}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminFeedbackCard;