import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FeaturesBook = () => {
   
const [books, setBooks] = useState([]);
const navigate = useNavigate();

// Fetching books from API
  useEffect(() => {
    fetch("http://localhost:5000/books")
     .then((res) => res.json())
     .then((data) => {
        const latestBooks = data.slice(-6).reverse();
        setBooks(latestBooks);
     });
  }, []);
  return (
    <div>
      <section className="bg-blue-50 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Featured Books
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-700">
                  {book.name}
                </h3>
                <p className="text-gray-600">{book.author}</p>
                <button 
                
                onClick={() => navigate(`/bookDetails/${book._id}`)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesBook;
