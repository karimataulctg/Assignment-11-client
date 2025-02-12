import React from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const CategoryPage = () => {
  const { categoryId } = useParams();

  // Dummy books data
  const books = [
    {
      id: 1,
      image: "https://via.placeholder.com/150?text=Book+1",
      name: "Book 1",
      author: "Author 1",
      category: "Fiction",
      quantity: 10,
      rating: 4.5,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150?text=Book+2",
      name: "Book 2",
      author: "Author 2",
      category: "Fiction",
      quantity: 7,
      rating: 4.2,
    },
  ];

  const filteredBooks = books.filter((book) => book.categoryId === Number(categoryId));

  return (
    <div className=" py-10 container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        Books in Category: {filteredBooks[0]?.category || "Unknown"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="card bg-base-100 shadow-lg">
            <figure>
              <img src={book.image} alt={book.name} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{book.name}</h3>
              <p>Author: {book.author}</p>
              <p>Quantity: {book.quantity}</p>
              <ReactStars count={5} value={book.rating} size={24} activeColor="#ffd700" edit={false} />
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
