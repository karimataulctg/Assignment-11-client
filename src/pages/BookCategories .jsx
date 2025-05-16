import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';

const BookCategories = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const categories = [
    { id: 1, name: 'Fiction', image: 'https://i.ibb.co/vzRbWLV/Fiction.jpg' },
    { id: 2, name: 'Science', image: 'https://i.ibb.co/7RWqkkV/Science.jpg' },
    { id: 3, name: 'History', image: 'https://i.ibb.co/xjV90sg/History.webp' },
    { id: 4, name: 'Technology', image: 'https://i.ibb.co/0MLwBsj/Technology.jpg' },
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/books?type=${categoryName}`);
  };

  // Add custom animation keyframes

  const styles = `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .animate-card {
      animation: slideUp 0.5s ease-out, fadeIn 0.8s ease-out;
    }

   .card-hover:hover .card-image {
    transform: scale(1.05);  // Changed from 0.95 to 1.05 for zoom-in
    transition: transform 0.3s ease-in-out;
  }
  `;

  return (
    <div className={`w-11/12 mx-auto pt-10 ${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-50 text-gray-800"}`}>
      <style>{styles}</style>
      <h2 className="text-3xl font-bold text-center mb-6 animate-fade-in">Book Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`card shadow-xl cursor-pointer overflow-hidden group card-hover ${
              isDarkMode ? "bg-gray-600 text-white" : "bg-base-100 text-gray-800"
            } animate-card`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="overflow-hidden">
              <img
  src={category.image}
  alt={category.name}
  className="h-48 w-full object-cover transition-all duration-300 card-image transform scale-100 hover:scale-105"
/>
            </div>
            <div className="card-body">
              <h3 className="card-title text-center transition-all duration-300 group-hover:text-blue-500">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;