// src/components/EditUser.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from './UserForm';
import Layout from '../layout/Layout';

const EditUser = ({ onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/edit/${id}`, {
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
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSave = (updatedUser) => {
    // Update user on the server
    fetch(`${process.env.REACT_APP_API_URL}/users/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updatedUser)
    })
      .then(response => response.json())
      .then(data => {
        navigate('/users'); // Redirect to users list after success
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <Layout>
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      {user && <UserForm user={user} onSave={handleSave} onCancel={handleCancel} />}
    </div>
    </Layout>
  );
};

export default EditUser;