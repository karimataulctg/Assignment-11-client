import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { search } = useLocation(); // Get query parameters from the URL
  const queryParams = new URLSearchParams(search);
  const categoryType = queryParams.get('type'); // Extract the 'type' parameter

  useEffect(() => {
    // Fetch books based on the category (type)
    const url = categoryType
      ? `http://localhost:5000/books?category=${categoryType}`
      : 'http://localhost:5000/books';

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch books');
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, [categoryType]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-8">
        {categoryType ? `Books in ${categoryType} Category` : 'All Books'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="card bg-white shadow-md hover:shadow-lg transition">
              <figure>
                <img src={book.image} alt={book.name} className="w-full h-64 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{book.name}</h2>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-gray-600">Category: {book.category}</p>
                <p className="text-gray-600">Quantity: {book.quantity}</p>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 text-lg">
                    {'⭐'.repeat(Math.floor(Number(book.rating) || 0))}
                  </span>
                  <span className="ml-2 text-gray-500">
                    ({Number(book.rating) ? Number(book.rating).toFixed(1) : 'N/A'})
                  </span>
                </div>
                {/* Book Details Button */}
                <button
                  onClick={() => navigate(`/bookDetails/${book._id}`)}
                  className="btn btn-primary w-full"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No books available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Books;
