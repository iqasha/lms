import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUserForm from './AddUserForm';
import UpdateUserForm from './UpdateUserForm';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/users');
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserAdded = () => {
    fetchUsers();
  };

  const handleUserUpdated = () => {
    fetchUsers();
    setEditingUser(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">User Management</h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          {editingUser ? (
            <UpdateUserForm user={editingUser} onUserUpdated={handleUserUpdated} />
          ) : (
            <AddUserForm onUserAdded={handleUserAdded} />
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 p-5 flex flex-col justify-between border border-transparent hover:border-blue-300"
            >
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-1">{user.name}</h3>
                <p className="text-gray-700 mb-2">{user.email}</p>

                <div className="mt-2">
                  
                  <ul className="space-y-1 text-sm text-gray-600 list-disc pl-5">
                    {user.borrowingHistory.map((loan) => (
                      <li key={loan._id}>
                        <span className="font-medium">{loan.book.title}</span> — Borrowed on{' '}
                        {new Date(loan.loanDate).toLocaleDateString()}, due on{' '}
                        {new Date(loan.dueDate).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
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

export default UserPage;
