import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    stock: '',
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/books');
      const booksData = Array.isArray(data) ? data : data.books || [];

      setBooks(booksData);
      const uniqueCategories = [...new Set(booksData.map(book => book.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching books:', error);
      setErrorMessage('Error fetching books. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/books', formData);
      fetchBooks();
      setFormData({ title: '', author: '', category: '', stock: '' });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/books/${editingBook._id}`, formData);
      fetchBooks();
      setEditingBook(null);
      setFormData({ title: '', author: '', category: '', stock: '' });
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      stock: book.stock || '',
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      setErrorMessage('Error deleting book. Please try again later.');
    }
  };

  const filteredBooks = selectedCategory
    ? books.filter(book => book.category === selectedCategory)
    : books;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Book Management</h1>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={editingBook ? handleUpdateBook : handleAddBook}
          className="bg-white shadow-md rounded-lg p-6 mb-6"
        >
          <h2 className="text-xl flex justify-center font-semibold mb-4">
            {editingBook ? 'Update Book' : 'Add New Book'}
          </h2>

          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
          <button
            type="submit"
            className={`mt-2 px-6 py-2 rounded-lg text-white font-semibold transition ${
              editingBook ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {editingBook ? 'Update Book' : 'Add Book'}
          </button>
          </div>
        </form>

        <div className="mb-6 flex flex-col items-center">
          <label className="block text-gray-700 font-medium mb-2">Filter by Category</label>
          <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-64 appearance-none bg-white bg-no-repeat pr-10"
          style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'gray\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
          >
          <option value="">All</option>
            {categories.map((category, idx) => (
            <option key={idx} value={category}>{category}</option>
                      ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <div
  key={book._id}
  className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 p-5 flex flex-col justify-between border border-transparent hover:border-blue-300"
>
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-1">{book.title}</h3>
                <p className="text-gray-700">Author: {book.author}</p>
                <p className="text-gray-700">Stock: {book.stock ?? 'N/A'}</p>
                <span className="inline-block mt-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  {book.category}
                </span>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
