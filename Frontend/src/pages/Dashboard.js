import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Icon Imports (you can replace with your own icons or PNGs)
import { FaBook, FaUsers, FaClipboardList, FaExclamationTriangle } from 'react-icons/fa';

const Dashboard = () => {
  const [report, setReport] = useState({
    loanCount: 0,
    userCount: 0,
    bookCount: 0,
    overdueLoans: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data, status } = await axios.get('http://localhost:5000/api/reports/usage');
        if (status === 200) {
          console.log('Report data:', data);
          setReport(data);
        } else {
          console.error('Unexpected response status:', status);
        }
      } catch (error) {
        if (error.response) {
          console.error('Server responded with error:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error in setting up request:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading...</p>;
  }

  const cardData = [
    {
      title: 'Total Loans',
      count: report.loanCount,
      icon: <FaClipboardList size={32} className="text-blue-500" />,
      color: 'text-blue-600',
      link: '/loans',
    },
    {
      title: 'Total Users',
      count: report.userCount,
      icon: <FaUsers size={32} className="text-green-500" />,
      color: 'text-green-600',
      link: '/users',
    },
    {
      title: 'Total Books',
      count: report.bookCount,
      icon: <FaBook size={32} className="text-red-500" />,
      color: 'text-red-600',
      link: '/books',
    },
    {
      title: 'Overdue Loans',
      count: report.overdueLoans,
      icon: <FaExclamationTriangle size={32} className="text-yellow-500" />,
      color: 'text-yellow-600',
      link: '/loans',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map((card, index) => (
            <a
              key={index}
              href={card.link}
              className="bg-white rounded-xl shadow-xl p-6 hover:scale-105 transform transition duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-700 text-lg font-semibold">{card.title}</div>
                {card.icon}
              </div>
              <div className={`${card.color} text-4xl font-extrabold text-center`}>
                {card.count}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
