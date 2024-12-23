import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { bookId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    // Fetch book details from the server
    fetch(`http://localhost:5000/books/${bookId}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [bookId]);

  const handleBorrow = () => {
    if (!currentUser) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to borrow books.",
      });
      navigate("/login");
      return;
    }

    // Validate return date
    if (!returnDate) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "Please select a return date.",
      });
      return;
    }

    // Send borrow request to the server
    fetch(`http://localhost:5000/borrow/${book._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        returnDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBook((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
          Swal.fire({
            icon: "success",
            title: "Book Borrowed",
            text: "The book has been successfully borrowed!",
          });
          setIsBorrowing(false);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message,
          });
        }
      });
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-4xl font-bold mb-4">{book.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={book.image}
          alt={book.name}
          className="rounded-lg shadow-lg"
        />
        <div>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Category:</strong> {book.category}</p>
          <p><strong>Quantity:</strong> {book.quantity}</p>
          <p><strong>Rating:</strong> {book.rating}/5</p>
          <button
            className="btn btn-primary mt-4"
            disabled={book.quantity === 0}
            onClick={() => setIsBorrowing(true)}
          >
            Borrow
          </button>
        </div>
      </div>

      {/* Borrow Modal */}
      {isBorrowing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Borrow Book</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleBorrow();
              }}
            >
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  value={currentUser.displayName}
                  className="input input-bordered w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={currentUser.email}
                  className="input input-bordered w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary mr-2">
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsBorrowing(false)}
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
