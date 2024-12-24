import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching book:', error));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then((res) => res.json())
      .then(() => {
        alert('Book updated successfully!');
        navigate('/books'); // Redirect to the books list
      })
      .catch((error) => console.error('Error updating book:', error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Update Book</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={book.name}
            onChange={(e) => setBook({ ...book, name: e.target.value })}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Author</label>
          <input
            type="text"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            value={book.category}
            onChange={(e) => setBook({ ...book, category: e.target.value })}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            value={book.quantity}
            onChange={(e) => setBook({ ...book, quantity: e.target.value })}
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
