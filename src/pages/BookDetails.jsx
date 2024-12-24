import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock logged-in user
  const loggedInUser = { name: "John Doe", email: "john.doe@example.com" };

  useEffect(() => {
    if (!bookId) return;

    fetch(`http://localhost:5000/books/${bookId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch book details");
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch book details. Please try again later.",
        });
        setLoading(false);
      });
  }, [bookId]);

  const handleBorrowBook = () => {
    if (book.quantity === 0) {
      Swal.fire({
        icon: "warning",
        title: "Unavailable",
        text: "This book is currently unavailable.",
      });
      return;
    }
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();

    // Decrease book quantity
    const updatedBook = { ...book, quantity: book.quantity - 1 };
    setBook(updatedBook);

    // Add book to Borrowed Books (this should be sent to the server in a real app)
    Swal.fire({
      icon: "success",
      title: "Success",
      text: `You have successfully borrowed the book "${book.name}".`,
    });

    // Close modal
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>No book details available.</div>;

  const descriptionPreview = book.description.split(" ").slice(0, 30).join(" ");

  return (
    <div className="container mx-auto py-10">
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
        {/* Book Name at the Top */}
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
          {book.name}
        </h2>

        {/* Layout with Image and Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={book.image}
              alt={book.name}
              className="rounded-lg shadow-md max-w-full md:max-w-xs"
            />
          </div>

          {/* Information Section */}
          <div className="text-gray-700">
            <p className="text-lg mb-4">
              <strong className="text-gray-900">Author:</strong> {book.author}
            </p>
            <p className="text-lg mb-4">
              <strong className="text-gray-900">Category:</strong> {book.category}
            </p>
            <p className="text-lg mb-4">
              <strong className="text-gray-900">Quantity:</strong> {book.quantity}
            </p>
            <p className="text-lg mb-4">
              <strong className="text-gray-900">Rating:</strong> {book.rating}/5
            </p>
            <p className="text-lg mb-4">
              <strong className="text-gray-900">Description:</strong>{" "}
              {showFullDescription
                ? book.description
                : `${descriptionPreview}...`}
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="ml-2 text-blue-600 underline hover:text-blue-800"
              >
                {showFullDescription ? "See Less" : "See More"}
              </button>
            </p>
            {/* Borrow Book Button */}
            <button
              onClick={handleBorrowBook}
              disabled={book.quantity === 0}
              className={`px-6 py-2 text-lg font-semibold rounded-md shadow-lg mt-4 transition-all ${
                book.quantity === 0
                  ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Borrow Book
            </button>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-bold mb-4">Borrow Book</h3>
            <form onSubmit={handleModalSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={loggedInUser.name}
                  readOnly
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={loggedInUser.email}
                  readOnly
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Return Date</label>
                <input
                  type="date"
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
