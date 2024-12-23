import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!bookId) return;

    fetch(`http://localhost:5000/books/${bookId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch book details');
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch book details. Please try again later.',
        });
        setLoading(false);
      });
  }, [bookId]);

  const handleBorrowBook = () => {
    Swal.fire({
      icon: 'success',
      title: 'Book Borrowed',
      text: `You have successfully borrowed the book "${book.name}".`,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>No book details available.</div>;

  const descriptionPreview = book.description.split(' ').slice(0, 30).join(' '); // First 30 words

  return (
    <div className="container mx-auto py-10">
      {/* Book Name at the Top */}
      <h2 className="text-4xl font-bold text-center mb-10">{book.name}</h2>
      
      {/* Layout with Image and Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={book.image}
            alt={book.name}
            className="rounded-lg shadow-lg max-w-full md:max-w-xs"
          />
        </div>

        {/* Information Section */}
        <div>
          <p className="text-lg mb-2"><strong>Author:</strong> {book.author}</p>
          <p className="text-lg mb-2"><strong>Category:</strong> {book.category}</p>
          <p className="text-lg mb-2"><strong>Quantity:</strong> {book.quantity}</p>
          <p className="text-lg mb-2"><strong>Rating:</strong> {book.rating}/5</p>
          <p className="text-lg mb-2">
            <strong>Description:</strong>{' '}
            {showFullDescription ? book.description : `${descriptionPreview}...`}
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="ml-2 text-blue-600 underline hover:text-blue-800"
            >
              {showFullDescription ? 'See Less' : 'See More'}
            </button>
          </p>
          {/* Borrow Book Button */}
          <button
            onClick={handleBorrowBook}
            className="btn btn-primary px-6 py-2 text-lg font-semibold rounded-md shadow-lg mt-6"
          >
            Borrow Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
