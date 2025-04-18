import React from 'react';
import { FiMessageSquare, FiCheck, FiClock, FiAlertCircle } from 'react-icons/fi';

const AllFeedback = () => {
  // Sample feedback data
  const feedbacks = [
    {
      id: 1,
      user: "John Doe",
      email: "john@example.com",
      message: "The dashboard loading time is too slow when filtering large datasets.",
      status: "resolved",
      date: "2023-05-15"
    },
    {
      id: 2,
      user: "Jane Smith",
      email: "jane@example.com",
      message: "Feature request: Add export functionality for reports in PDF format.",
      status: "pending",
      date: "2023-05-18"
    },
    {
      id: 3,
      user: "Robert Johnson",
      email: "robert@example.com",
      message: "Bug: The chart tooltip disappears too quickly on mobile devices.",
      status: "pending",
      date: "2023-05-20"
    },
    {
      id: 4,
      user: "Emily Davis",
      email: "emily@example.com",
      message: "Great job on the recent UI update! The new design is much more intuitive.",
      status: "resolved",
      date: "2023-05-22"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <FiCheck className="text-green-500" />;
      case 'pending':
        return <FiClock className="text-yellow-500" />;
      default:
        return <FiAlertCircle className="text-gray-500" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FiMessageSquare className="mr-2 text-blue-500" />
          All Feedback
        </h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbacks.map((feedback) => (
                <tr key={feedback.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feedback.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{feedback.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      {getStatusIcon(feedback.status)}
                      <span className="ml-1 capitalize">{feedback.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-900">Archive</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllFeedback;