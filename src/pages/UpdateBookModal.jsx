import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UpdateBookModal = ({ book, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(book || {});

  useEffect(() => {
    setFormData(book || {});
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://library-server-green.vercel.app/books/${book._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update book");
      }
  
      const data = await response.json();
      console.log("Backend response:", data); // Log the response from the backend
      Swal.fire("Updated!", "Book details have been updated successfully.", "success");
      onUpdate(formData);
      onClose();
    } catch (error) {
      console.error("Error updating book:", error);
      Swal.fire("Error!", "Failed to update the book. Please try again.", "error");
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 sm:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Update Book Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Book Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="0"
              max="5"
              step="0.1"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookModal;
