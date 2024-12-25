import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UpdateBookModal from "./UpdateBookModal"; // Ensure correct path

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAvailable, setShowAvailable] = useState(false); // Toggle for filtering
  const [viewMode, setViewMode] = useState("card"); // View mode: "card" or "table"
  const navigate = useNavigate();
  const { search } = useLocation(); // Get query parameters from the URL
  const queryParams = new URLSearchParams(search);
  const categoryType = queryParams.get("type");

  useEffect(() => {
    const url = categoryType
      ? `http://localhost:5000/books?category=${categoryType}`
      : "http://localhost:5000/books";

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

  const handleUpdate = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      )
    );
    setFilteredBooks((prevFiltered) =>
      prevFiltered.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-8">
        {categoryType ? `Books in ${categoryType} Category` : "All Books"}
      </h1>

      {/* Filter and View Mode Buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          className={`btn ${
            showAvailable ? "btn-secondary" : "btn-primary"
          }`}
          onClick={handleFilterToggle}
        >
          {showAvailable ? "Show All Books" : "Show Available Books"}
        </button>

        <select
          className="select select-bordered w-48"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
        >
          <option value="card">Card View</option>
          <option value="table">Table View</option>
        </select>
      </div>

      {/* Conditional Rendering Based on View Mode */}
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className="card bg-white shadow-md hover:shadow-lg transition"
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
                  <p className="text-gray-600">Author: {book.author}</p>
                  <p className="text-gray-600">Category: {book.category}</p>
                  <p className="text-gray-600">Quantity: {book.quantity}</p>
                  <button
                    onClick={() => navigate(`/bookDetails/${book._id}`)}
                    className="btn btn-primary w-full"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="btn btn-secondary w-full mt-2"
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
                        className="btn btn-sm btn-secondary ml-2"
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
          onUpdate={handleUpdate}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
};

export default Books;
