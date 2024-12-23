import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCategories = () => {
  const navigate = useNavigate();
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
    <div className="bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Book Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            className="card bg-base-100 shadow-xl cursor-pointer"
            onClick={() => handleCategoryClick(category.name)}
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
