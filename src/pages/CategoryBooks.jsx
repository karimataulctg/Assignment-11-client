import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";


const CategoryBooks = () => {
  const { categoryId } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme(); // Use the theme context

  useEffect(() => {
    if (!categoryId) return;

    fetch(`https://library-server-green.vercel.app/books?category=${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) return <div>Loading...</div>;
  if (!books.length) return <div>No books available in this category.</div>;

  return (
    <div className={`w-11/12 mx-auto py-10 ${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-50 text-gray-800"}`}>
      <h2 className="text-3xl font-bold mb-6">Books in Category {categoryId}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className={`card shadow-md hover:shadow-lg transition ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
            }`}
          >
            <figure>
              <img src={book.image} alt={book.name} className="w-full h-64 object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{book.name}</h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Author: {book.author}</p>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Category: {book.category}</p>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Quantity: {book.quantity}</p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-lg">
                  {"⭐".repeat(Math.floor(Number(book.rating) || 0))}
                </span>
                <span className={isDarkMode ? "ml-2 text-gray-400" : "ml-2 text-gray-500"}>
                  ({Number(book.rating) ? Number(book.rating).toFixed(1) : "N/A"})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBooks;