import React from 'react';
import { FiMessageSquare, FiCheck } from 'react-icons/fi';

const Resolved = () => {
  // Sample resolved feedback data
  const resolvedFeedbacks = [
    {
      id: 1,
      user: "John Doe",
      email: "john@example.com",
      message: "The dashboard loading time is too slow when filtering large datasets.",
      date: "2023-05-15",
      resolvedBy: "Admin User",
      resolutionDate: "2023-05-17"
    },
    {
      id: 4,
      user: "Emily Davis",
      email: "emily@example.com",
      message: "Great job on the recent UI update! The new design is much more intuitive.",
      date: "2023-05-22",
      resolvedBy: "System",
      resolutionDate: "2023-05-22"
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FiCheck className="mr-2 text-green-500" />
          Resolved Feedback
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolved By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {resolvedFeedbacks.map((feedback) => (
                <tr key={feedback.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feedback.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{feedback.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.resolvedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.resolutionDate}</td>
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

export default Resolved;