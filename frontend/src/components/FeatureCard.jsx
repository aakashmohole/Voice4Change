import React from "react";
import { motion } from "framer-motion";
const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    className="bg-gray-900 p-8 shadow-lg rounded-xl text-center border-t-4 border-blue-400 transition hover:shadow-2xl"
    whileHover={{ scale: 1.05 }}
  >
    <div className="mb-4 flex justify-center items-center">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
    <p className="mt-2 text-gray-400">{description}</p>
  </motion.div>
);

export default FeatureCard;
