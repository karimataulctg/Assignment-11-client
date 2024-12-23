import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Swal from "sweetalert2";

const BookBorrow = ({ book }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [returnDate, setReturnDate] = useState("");
  const [isBorrowed, setIsBorrowed] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
  
    // Fetch borrowing status for the current user and book
    fetch(`http://localhost:5000/books/borrow-status/${book._id}?userId=${currentUser.uid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Borrow status:", data); // Log the response for debugging
        if (data.isBorrowed) {
          setIsBorrowed(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching borrow status:", error);
      });
  }, [currentUser, book._id]);
  

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

    if (!returnDate) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "Please select a return date.",
      });
      return;
    }

    fetch(`http://localhost:5000/books/borrow/${book._id}`, {
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
          setIsBorrowed(true);
          Swal.fire({
            icon: "success",
            title: "Book Borrowed",
            text: "The book has been successfully borrowed!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message || "Failed to borrow the book.",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again.",
        });
        console.error(error);
      });
  };

  return (
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
            value={currentUser?.displayName || ""}
            className="input input-bordered w-full"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={currentUser?.email || ""}
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
          <button
            type="submit"
            className="btn btn-primary mr-2"
            disabled={isBorrowed || book.quantity === 0}
          >
            {isBorrowed ? "Already Borrowed" : book.quantity === 0 ? "Out of Stock" : "Confirm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookBorrow;
