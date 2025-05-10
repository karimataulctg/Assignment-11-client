import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UpdateBookModal from "./UpdateBookModal"; // Ensure correct path
import { useTheme } from "../components/ThemeContext";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAvailable, setShowAvailable] = useState(false);
  const [viewMode, setViewMode] = useState("card");
  const [sortOrder, setSortOrder] = useState("default"); // New state for sorting
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryType = queryParams.get("type");
   const { isDarkMode } = useTheme();

  useEffect(() => {
    const url = categoryType
      ? `https://library-server-green.vercel.app/books?category=${categoryType}`
      : "https://library-server-green.vercel.app/books";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, [categoryType]);

  const handleFilterToggle = () => {
    setShowAvailable((prev) => !prev);
    if (!showAvailable) {
      setFilteredBooks(books.filter((book) => book.quantity > 0));
    } else {
      setFilteredBooks(books);
    }
  };

  // Sorting Function
  const handleSort = (order) => {
    setSortOrder(order);
    let sortedBooks = [...filteredBooks];

    if (order === "asc") {
      sortedBooks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "desc") {
      sortedBooks.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredBooks(sortedBooks);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-5 transition duration-300  ${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-50" } ` }>
      <h1 className="text-3xl font-bold text-center mb-8">
        {categoryType ? `Books in ${categoryType} Category` : "All Books"}
      </h1>

      {/* Controls: Filter, View Mode, Sorting */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <button
          className={`btn ${showAvailable ? "btn-secondary" : "btn-primary"}`}
          onClick={handleFilterToggle}
        >
          {showAvailable ? "Show All Books" : "Show Available Books"}
        </button>

        <select
          className={`select select-bordered w-48 ${isDarkMode ? "bg-gray-800 text-white" : ""}`}
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
        >
          <option value="card">Card View</option>
          <option value="table">Table View</option>
        </select>

        <select
          className={`select select-bordered w-48 ${isDarkMode ? "bg-gray-800 text-white" : ""}`}
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="default">Sort by Name</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </div>

      {/* Conditional Rendering Based on View Mode */}
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className={ `card  shadow-md hover:shadow-lg transition ${ isDarkMode ? "bg-gray-600 text-white" :"bg-white"} `}
              >
                <figure>
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-full h-64 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{book.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300">Author: {book.author}</p>
                  <p className="text-gray-600 dark:text-gray-300">Category: {book.category}</p>
                  <p className="text-gray-600 dark:text-gray-300">Quantity: {book.quantity}</p>
                  <button
                    onClick={() => navigate(`/bookDetails/${book._id}`)}
                    className="btn btn-primary w-full"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="btn bg-yellow-500 text-black w-full mt-2"
                  >
                    Update Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No books available in this category.</p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Author</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book._id}>
                    <td>
                      <img
                        src={book.image}
                        alt={book.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.quantity}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/bookDetails/${book._id}`)}
                        className="btn btn-sm btn-primary"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => setSelectedBook(book)}
                        className="btn btn-sm bg-yellow-500 ml-2"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No books available in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedBook && (
        <UpdateBookModal
          book={selectedBook}
          onUpdate={(updatedBook) => {
            setBooks((prev) =>
              prev.map((book) => (book._id === updatedBook._id ? updatedBook : book))
            );
            setFilteredBooks((prev) =>
              prev.map((book) => (book._id === updatedBook._id ? updatedBook : book))
            );
          }}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
};

export default Books;
