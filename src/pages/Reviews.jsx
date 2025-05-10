import React, { useState } from "react";
import { useTheme } from "../components/ThemeContext"; // Import the useTheme hook

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const { isDarkMode } = useTheme(); // Use the theme context

  const addReview = () => {
    const newReview = { text: reviewText, rating: rating };
    setReviews([...reviews, newReview]);
    setReviewText("");
    setRating(1);
  };

  return (
    <>
      <h2 className={`text-3xl font-bold text-center mb-6 ${
        isDarkMode ? "text-white" : "text-gray-800"
      }`}>
        User Reviews & Ratings
      </h2>

      <div className={`w-11/12 mx-auto py-4 rounded-2xl mb-4 shadow-lg ${
        isDarkMode ? "bg-gray-600 text-white" : "bg-white text-gray-800"
      }`}>
        <div className="mb-4">
          <textarea
            className={`w-11/12 p-2 border rounded mb-2 ${
              isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"
            }`}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
          />
          <select
            className={`w-11/12 p-2 border rounded mb-2 ${
              isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"
            }`}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
          <button
            className="bg-yellow-500 text-black px-4 py-2 rounded mt-2 hover:bg-yellow-600"
            onClick={addReview}
          >
            Submit Review
          </button>
        </div>
        <div>
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`border-b py-2 ${
                isDarkMode ? "border-gray-600" : "border-gray-300"
              }`}
            >
              <p className="font-bold">{`Rating: ${review.rating}`}</p>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;