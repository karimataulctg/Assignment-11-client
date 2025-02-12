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
    <>
     <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
     User Reviews & Ratings
          </h2>
    
    <div className=" w-11/12 bg-white mx-auto py-4 rounded-2xl mb-4 shadow-lg">
      
      <div className="mb-4">
        <textarea
          className="w-11/12 p-2 border rounded mb-2"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
        />
        <select
          className="w-11/12 p-2 border rounded mb-2"
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
          className="bg-yellow-500 text-black px-4 py-2 rounded mt-2"
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
    </>
  );
};

export default Reviews;
