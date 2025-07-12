import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddLoanForm from './AddLoanForm';

const LoanPage = () => {
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [loansResponse, usersResponse, booksResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/loans'),
        axios.get('http://localhost:5000/api/users'),
        axios.get('http://localhost:5000/api/books'),
      ]);
      setLoans(loansResponse.data);
      setUsers(usersResponse.data);
      setBooks(booksResponse.data);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoanAdded = () => {
    fetchInitialData();
  };

  const handleReturn = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/loans/return/${id}`);
      fetchInitialData();
    } catch (error) {
      console.error('Error returning loan:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/loans/${id}`);
      fetchInitialData();
    } catch (error) {
      console.error('Error deleting loan:', error);
    }
  };

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Loan Management</h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <AddLoanForm users={users} books={books} onLoanAdded={handleLoanAdded} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.length > 0 ? (
            loans.map((loan) => (
              <div
                key={loan._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 p-5 flex flex-col justify-between border border-transparent hover:border-blue-300"
              >
                <div>
                  <p className="mb-1">
                    <span className="font-semibold text-gray-800">Book:</span>{' '}
                    {loan.book ? loan.book.title : 'N/A'}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold text-gray-800">Borrowed by:</span>{' '}
                    {loan.user ? loan.user.name : 'N/A'}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold text-gray-800">Loan Date:</span>{' '}
                    {new Date(loan.loanDate).toLocaleDateString()}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold text-gray-800">Due Date:</span>{' '}
                    {new Date(loan.dueDate).toLocaleDateString()}
                  </p>

                  {loan.returned ? (
                    <p className="text-green-600 font-semibold mt-1">Returned</p>
                  ) : (
                    <button
                      onClick={() => handleReturn(loan._id)}
                      className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Mark as Returned
                    </button>
                  )}

                  {loan.fine > 0 && (
                    <p className="text-red-600 font-medium mt-2">Fine: ${loan.fine}</p>
                  )}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleDelete(loan._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No loans available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanPage;
