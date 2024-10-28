// src/components/AddUser.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from './UserForm';
import Layout from '../layout/Layout';

const AddUser = ({ onSave }) => {
    const navigate = useNavigate();

  const handleSave = (user) => {
    // Add user to the server
    fetch(`${process.env.REACT_APP_API_URL}/users/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        //onSave(data);
        navigate('/users'); 
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <Layout>
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add User</h2>
      <UserForm onSave={handleSave} onCancel={handleCancel} />
    </div>
    </Layout>
  );
};

export default AddUser;