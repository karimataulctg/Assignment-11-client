import React, { useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);

  const addReview = () => {
    const newReview = { text: reviewText, rating: rating };
    setReviews([...reviews, newReview]);
    setReviewText("");
    setRating(1);
  };

  return (
    <div className="container bg-white mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">User Reviews & Ratings</h2>
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
        />
        <select
          className="w-full p-2 border rounded mb-2"
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
          className="bg-yellow-500 text-black px-4 py-2 rounded"
          onClick={addReview}
        >
          Submit Review
        </button>
      </div>
      <div>
        {reviews.map((review, index) => (
          <div key={index} className="border-b py-2">
            <p className="font-bold">{`Rating: ${review.rating}`}</p>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
