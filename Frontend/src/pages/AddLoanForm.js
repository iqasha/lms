import React, { useState } from 'react';
import axios from 'axios';

const AddLoanForm = ({ users = [], books = [], onLoanAdded }) => {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/loans', { userId, bookId, loanDate, dueDate });
      onLoanAdded();
      setUserId('');
      setBookId('');
      setLoanDate('');
      setDueDate('');
    } catch (error) {
      setError('Error adding loan. Please try again.');
      console.error('Error adding loan:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold flex justify-center text-gray-800 mb-2">Add New Loan</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm"
          required
        >
          <option value="">Select User</option>
          {users.length > 0 ? (
            users.map((user) => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))
          ) : (
            <option disabled>No users available</option>
          )}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
        <select
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm"
          required
        >
          <option value="">Select Book</option>
          {books.length > 0 ? (
            books.map((book) => (
              <option key={book._id} value={book._id}>{book.title}</option>
            ))
          ) : (
            <option disabled>No books available</option>
          )}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Loan Date</label>
        <input
          type="date"
          value={loanDate}
          onChange={(e) => setLoanDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          required
        />
      </div>

      <div className="text-right flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition transform hover:scale-105"
        >
          Add Loan
        </button>
      </div>
    </form>
  );
};

export default AddLoanForm;
