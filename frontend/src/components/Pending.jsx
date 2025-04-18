import React from 'react';
import { FiMessageSquare, FiClock, FiAlertCircle } from 'react-icons/fi';

const Pending = () => {
  // Sample pending feedback data
  const pendingFeedbacks = [
    {
      id: 2,
      user: "Jane Smith",
      email: "jane@example.com",
      message: "Feature request: Add export functionality for reports in PDF format.",
      date: "2023-05-18"
    },
    {
      id: 3,
      user: "Robert Johnson",
      email: "robert@example.com",
      message: "Bug: The chart tooltip disappears too quickly on mobile devices.",
      date: "2023-05-20"
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FiClock className="mr-2 text-yellow-500" />
          Pending Feedback
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingFeedbacks.map((feedback) => (
                <tr key={feedback.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feedback.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{feedback.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Respond</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Resolve</button>
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

export default Pending;