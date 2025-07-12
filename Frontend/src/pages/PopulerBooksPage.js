import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PopularBooksPage = () => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPopularBooks();
  }, []);

  const fetchPopularBooks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/inventory/popular');
      setPopularBooks(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching popular books:', err);
      setError('Failed to load popular books.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Popular Books</h1>

      {loading ? (
        <div className="text-gray-500 text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : popularBooks.length === 0 ? (
        <div className="text-gray-500 text-center">No popular books available.</div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularBooks.map((book) => (
            <li
              key={book._id}
              className="bg-white border border-gray-200 hover:border-blue-400 rounded-2xl p-5 shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300"
            >
              <div className="font-bold text-xl mb-2 text-blue-700">{book.title}</div>
              <p className="text-gray-600 mb-1">Author: <span className="text-gray-800">{book.author}</span></p>
              <p className="text-gray-600 mb-1">Category: <span className="text-gray-800">{book.category}</span></p>
              <p className="text-gray-600 mb-1">Type: <span className="text-gray-800">{book.type || 'Unknown'}</span></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PopularBooksPage;
