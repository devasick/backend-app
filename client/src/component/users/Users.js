import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Button from '../Button';

import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }



  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Users</h2>
        <Link to="/users/add">
          <Button className="mb-4 bg-blue-500 text-white">
            Add User
          </Button>
        </Link>
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-blue-600 text-white text-center">
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">ID</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">Name</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">Username</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">Email</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">Status</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">Type</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">Created At</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`}>
                  <td className="py-4 px-6 text-center border-b">{user.id}</td>
                  <td className="py-4 px-6 text-left border-b">{user.name}</td>
                  <td className="py-4 px-6 text-left border-b">{user.username}</td>
                  <td className="py-4 px-6 text-left border-b">{user.email}</td>
                  <td className="py-4 px-6 text-center border-b">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center border-b">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.type === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-center border-b">
                    <Link to={`/users/edit/${user.id}`} className="text-blue-600 hover:underline">Edit</Link>
            
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
     
    </Layout>
  );
};

export default Users;
