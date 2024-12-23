import React, { useEffect, useState } from 'react';

const Books = () => {
  const [books, setBooks] = useState([]);

  // Fetch books from the server
  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-8">All Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book._id} className="card bg-white shadow-md hover:shadow-lg transition">
            <figure>
              <img src={book.image} alt={book.name} className="w-full h-64 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book.name}</h2>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Category: {book.category}</p>
              <p className="text-gray-600">Quantity: {book.quantity}</p>
              <div className="flex items-center">
                {/* <span className="text-yellow-500 text-lg">
                  {'⭐'.repeat(Math.floor(book.rating))}
                </span> */}
                {/* <span className="ml-2 text-gray-500">({book.rating.toFixed(1)})</span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
