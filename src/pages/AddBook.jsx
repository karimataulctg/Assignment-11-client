import React, { useState } from 'react';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import animationData from '../assets/AddBook.json';
import { useTheme } from '../components/ThemeContext'; // Import the useTheme hook

const AddBook = ({ userEmail }) => {
  const initialBookState = {
    name: '',
    author: '',
    category: '',
    image: '',
    quantity: 1,
    rating: 0,
    description: '',
    email: userEmail,
  };

  const [book, setBook] = useState(initialBookState);
  const { isDarkMode } = useTheme(); // Use the theme context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Adding Book:', book);

    // Submit book data to the backend
    fetch('https://library-server-green.vercel.app/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Book added successfully', data);
        Swal.fire({
          icon: 'success',
          title: 'Book Added',
          text: 'Your book has been added successfully!',
          confirmButtonText: 'OK',
        });
        setBook(initialBookState); // Reset the form
      })
      .catch((err) => {
        console.error('Error adding book:', err);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add Book',
          text: 'There was an error adding the book. Please try again.',
          confirmButtonText: 'Retry',
        });
      });
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${
      isDarkMode ? 'bg-gray-800' : 'bg-blue-50'
    } my-8`}>
      <div className={`flex flex-col md:flex-row shadow-lg  md:w-4/5 p-6  ${
        isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
      }`}>
        {/* Form Section */}
        <div className="w-full md:w-1/2">
          <h2 className={`text-2xl text-center font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Add New Book
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Book Name</label>
              <input
                type="text"
                name="name"
                value={book.name}
                onChange={handleChange}
                className={`input input-bordered w-full ${
                  isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
                required
              />
            </div>
            <div>
              <label className="label">Author</label>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                className={`input input-bordered w-full ${
                  isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
                required
              />
            </div>
            <div>
              <label className="label">Category</label>
              <input
                type="text"
                name="category"
                value={book.category}
                onChange={handleChange}
                className={`input input-bordered w-full ${
                  isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
                required
              />
            </div>
            <div>
              <label className="label">Image URL</label>
              <input
                type="url"
                name="image"
                value={book.image}
                onChange={handleChange}
                className={`input input-bordered w-full ${
                  isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
              />
            </div>
            <div>
              <label className="label">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={book.quantity}
                onChange={handleChange}
                className={`input input-bordered w-full ${
                  isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
                min="1"
                required
              />
            </div>
            <div>
              <label className="label">Rating</label>
              <input
                type="number"
                name="rating"
                value={book.rating}
                onChange={handleChange}
                className={`input input-bordered w-full ${
                  isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
                min="0"
                max="5"
                step="0.1"
              />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea
                name="description"
                value={book.description}
                onChange={handleChange}
                className={`textarea textarea-bordered w-full ${
                  isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
                rows="4"
                placeholder="Provide a brief description of the book"
              />
            </div>
            <button
              type="submit"
              className={`btn w-full ${
                isDarkMode ? 'bg-yellow-600 text-black hover:bg-yellow-700' : 'bg-blue-500 text-black hover:bg-blue-600'
              }`}
            >
              Add Book
            </button>
          </form>
        </div>

        {/* Animation Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Lottie
            animationData={animationData}
            autoplay
            loop
            className="w-3/4 h-3/4"
          />
        </div>
      </div>
    </div>
  );
};

export default AddBook;