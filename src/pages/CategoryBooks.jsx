import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryBooks = () => {
  const { categoryId } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="container  mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">Books in Category {categoryId}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book._id} className="card bg-white shadow-md hover:shadow-lg transition">
            <figure>
              <img src={book.image} alt={book.name} className="w-full h-64 object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{book.name}</h3>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Category: {book.category}</p>
              <p className="text-gray-600">Quantity: {book.quantity}</p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-lg">
                  {"⭐".repeat(Math.floor(Number(book.rating) || 0))}
                </span>
                <span className="ml-2 text-gray-500">
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
