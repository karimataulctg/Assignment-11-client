import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider";

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Fetch all books
    fetch(`https://library-server-green.vercel.app/books`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
      })
      .then((data) => {
        // Filter borrowed books for the logged-in user
        const userBorrowedBooks = data.filter((book) =>
          book.borrowedUsers?.some((borrower) => borrower.email === user.email)
        );
        setBorrowedBooks(userBorrowedBooks);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching borrowed books:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch borrowed books. Please try again later.",
        });
        setLoading(false);
      });
  }, [user]);

  const handleReturnBook = async (book) => {
    try {
      // Remove the user from the borrowedUsers list
      const updatedBorrowedUsers = book.borrowedUsers.filter(
        (borrower) => borrower.email !== user.email
      );

      const updatedBook = {
        ...book,
        quantity: book.quantity + 1,
        borrowedUsers: updatedBorrowedUsers,
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

      // Update state to reflect the returned book
      setBorrowedBooks((prevBooks) =>
        prevBooks.filter((b) => b._id !== book._id)
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `You have successfully returned the book "${book.name}".`,
      });
    } catch (error) {
      console.error("Error returning book:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to return the book. Please try again later.",
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!borrowedBooks.length) return <div>No borrowed books found.</div>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Borrowed Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {borrowedBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg border-2 shadow-lg p-6 flex flex-col justify-between"
          >
            <img
              src={book.image}
              alt={book.name}
              className="rounded-lg shadow-md w-full h-48 object-cover mb-4 border-2"
            />
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">{book.name}</h3>
            <p className="text-lg mb-1">
              <strong className="text-gray-900">Category:</strong> {book.category}
            </p>
            <p className="text-lg mb-1">
              <strong className="text-gray-900">Borrowed Date:</strong>{" "}
              {book.borrowedUsers.find((borrower) => borrower.email === user.email)?.borrowedDate}
            </p>
            <p className="text-lg mb-1">
              <strong className="text-gray-900">Return Date:</strong>{" "}
              {book.borrowedUsers.find((borrower) => borrower.email === user.email)?.returnDate}
            </p>
            <button
              onClick={() => handleReturnBook(book)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-red-700"
            >
              Return Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooks;
