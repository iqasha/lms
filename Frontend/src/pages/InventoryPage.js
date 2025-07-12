import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBookForm from './AddBook';

const InventoryPage = () => {
  const [books, setBooks] = useState([]);
  const [lowStockBooks, setLowStockBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchLowStockBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/inventory');
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchLowStockBooks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/inventory/low-stock');
      setLowStockBooks(data);
    } catch (error) {
      console.error('Error fetching low stock books:', error);
    }
  };

  const handleBookAdded = () => {
    fetchBooks();
    fetchLowStockBooks();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-black mb-10">Inventory Management</h1>

        

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">All Books</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <li
                key={book._id}
                className="bg-white border-l-4 border-blue-500 rounded-2xl shadow p-5 hover:shadow-xl transition-transform transform hover:scale-105"
              >
                <div className="text-lg font-bold text-blue-800">{book.title}</div>
                <div className="text-gray-700 mt-1">Author: {book.author}</div>
                <div className="text-gray-500 mt-1">Stock: {book.stock}</div>
                
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Low Stock Books</h2>
          {lowStockBooks.length === 0 ? (
            <p className="text-green-600 font-medium">All books are in good stock!</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lowStockBooks.map((book) => (
                <li
                  key={book._id}
                  className="bg-white border-l-4 border-red-500 rounded-2xl shadow p-5 hover:shadow-xl transition-transform transform hover:scale-105"
                >
                  <div className="text-lg font-bold text-red-700">{book.title}</div>
                  <div className="text-gray-700 mt-1">Author: {book.author}</div>
                  <div className="text-gray-500 mt-1">Stock: {book.stock}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
