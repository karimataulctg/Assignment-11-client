import React from "react";
import { useNavigate } from "react-router-dom";

const BookCategories = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Fiction", image: "https://via.placeholder.com/150?text=Fiction" },
    { id: 2, name: "Science", image: "https://via.placeholder.com/150?text=Science" },
    { id: 3, name: "History", image: "https://via.placeholder.com/150?text=History" },
    { id: 4, name: "Technology", image: "https://via.placeholder.com/150?text=Technology" },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  return (
    <div className="bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Book Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            className="card bg-base-100 shadow-xl cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            <figure>
              <img src={category.image} alt={category.name} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-center">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;
