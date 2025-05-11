import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { useTheme } from "../components/ThemeContext";


const FeaturesBook = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Use the theme context

  // Fetching books from API
  useEffect(() => {
    fetch("https://library-server-green.vercel.app/books")
      .then((res) => res.json())
      .then((data) => {
        const latestBooks = data.slice(-8).reverse();
        setBooks(latestBooks);
      });
  }, []);

  return (
    <div className={isDarkMode ? "bg-gray-800 text-white" : "bg-blue-50 text-gray-800"}>
      <section className="w-11/12 mx-auto pt-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">
            Featured Books
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className={`rounded-lg shadow-lg p-4 ${
                  isDarkMode ? "bg-gray-600 text-white" : "bg-white text-gray-700"
                }`}
              >
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold">{book.name}</h3>
                <p >{book.author}</p>
                <button
  onClick={() => {
    if (!user || !user.email) {
      navigate("/login");
    } else {
      navigate(`/bookDetails/${book._id}`);
    }
  }}
  className={`mt-4 px-4 py-2 ${
    isDarkMode 
      ? "bg-yellow-500 hover:bg-yellow-600" 
      : "bg-blue-600 hover:bg-blue-700"
  } text-white rounded-lg transition-colors`}
>
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