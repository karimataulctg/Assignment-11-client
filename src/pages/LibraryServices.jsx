import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../components/ThemeContext"; // Import the useTheme hook

const LibraryServices = () => {
  const { isDarkMode } = useTheme(); // Use the theme context

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, when: "beforeChildren", staggerChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      className={`py-10 ${isDarkMode ? "bg-gray-800" : "bg-blue-50"}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-11/12 mx-auto">
        <motion.h2
          className={`text-3xl font-bold text-center mb-6 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Library Services
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {[
            {
              title: "Online Catalog",
              description: "Explore our vast collection of books and resources online.",
            },
            {
              title: "Reading Rooms",
              description: "Comfortable spaces to read and study in a quiet environment.",
            },
            {
              title: "Community Events",
              description: "Participate in book clubs, workshops, and community gatherings.",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-2xl shadow-lg text-center ${
                isDarkMode ? "bg-gray-600 text-white" : "bg-white text-gray-700"
              }`}
              variants={cardVariants}
            >
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LibraryServices;