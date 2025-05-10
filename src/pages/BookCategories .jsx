import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext'; // Import the useTheme hook

const BookCategories = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Use the theme context

  const categories = [
    { id: 1, name: 'Fiction', image: 'https://i.ibb.co/vzRbWLV/Fiction.jpg' },
    { id: 2, name: 'Science', image: 'https://i.ibb.co/7RWqkkV/Science.jpg' },
    { id: 3, name: 'History', image: 'https://i.ibb.co/xjV90sg/History.webp' },
    { id: 4, name: 'Technology', image: 'https://i.ibb.co/0MLwBsj/Technology.jpg' },
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/books?type=${categoryName}`);
  };

  return (
    <div className={`w-11/12 mx-auto pt-10 ${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-50 text-gray-800"}`}>
      <h2 className="text-3xl font-bold text-center mb-6">Book Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`card shadow-xl cursor-pointer ${
              isDarkMode ? "bg-gray-600 text-white" : "bg-base-100 text-gray-800"
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <figure>
              <img
                src={category.image}
                alt={category.name}
                className="h-48 w-full object-cover"
              />
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