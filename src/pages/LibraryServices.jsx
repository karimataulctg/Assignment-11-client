import React from "react";
import { motion } from "framer-motion";

const LibraryServices = () => {
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
      className="bg-blue-50 py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-800 mb-6"
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
              className="bg-white p-6 rounded-lg shadow-md text-center"
              variants={cardVariants}
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LibraryServices;
