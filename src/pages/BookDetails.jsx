import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider";

const BookDetails = () => {
  const { user } = useContext(AuthContext);
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBorrowed, setIsBorrowed] = useState(false); // To track if the user has already borrowed the book
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!bookId || !user) return; // Add a check for user

    // Fetch book details
    fetch(`https://library-server-green.vercel.app/books/${bookId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch book details");
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);

        // Check if the user has already borrowed the book
        const hasBorrowed = data.borrowedUsers?.some(
          (borrowedUser) => borrowedUser.email === user.email
        );
        setIsBorrowed(hasBorrowed);
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
  }, [bookId, user]); // Include `user` in dependencies

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

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const returnDate = formData.get("returnDate");
    const borrowedDate = new Date().toISOString().split("T")[0]; // Use current date as borrowed date

    try {
      const updatedBook = {
        ...book,
        quantity: book.quantity - 1,
        borrowedUsers: [
          ...(book.borrowedUsers || []),
          {
            name: user.displayName,
            email: user.email,
            borrowedDate,
            returnDate,
          },
        ],
      };

      const response = await fetch(`https://library-server-green.vercel.app/books/${book._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

      if (!response.ok) {
        throw new Error("Failed to update book details");
      }

      setBook(updatedBook);
      setIsBorrowed(true);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `You have successfully borrowed the book "${book.name}".`,
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating book:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to borrow the book. Please try again later.",
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>No book details available.</div>;

  const descriptionPreview = book.description.split(" ").slice(0, 30).join(" ");

  return (
    <div className="container mx-auto py-10">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
          {book.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center">
            <img
              src={book.image}
              alt={book.name}
              className="rounded-lg shadow-md max-w-full md:max-w-xs"
            />
          </div>
          <div className="text-gray-700">
            <p className="text-lg mb-4">
              <strong className="text-gray-900">Author:</strong> {book.author}
            </p>
            <p className="text-lg mb-4">
              <strong className="text-gray-900">Category:</strong>{" "}
              {book.category}
            </p>
            <p className="text-lg mb-4">
              <strong className="text-gray-900">Quantity:</strong>{" "}
              {book.quantity}
            </p>
            <div className="flex items-center justify-center mb-4">
              <span className="text-yellow-500 text-lg">
                {"⭐".repeat(Math.floor(Number(book.rating) || 0))}
              </span>
              <span className="ml-2 text-gray-500">
                ({Number(book.rating) ? Number(book.rating).toFixed(1) : "N/A"})
              </span>
            </div>
            <p className="text-lg mb-4">
              <strong className="text-gray-900">Description:</strong>{" "}
              {descriptionPreview}...
            </p>
            <button
              onClick={handleBorrowBook}
              disabled={isBorrowed || book.quantity === 0}
              className={`px-6 py-2 text-lg font-semibold rounded-md shadow-lg mt-4 transition-all ${
                isBorrowed || book.quantity === 0
                  ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isBorrowed ? "Already Borrowed" : "Borrow Book"}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-bold mb-4">Borrow Book</h3>
            <form onSubmit={handleModalSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-blue-700"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white px-6 py-2 rounded-md shadow-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
