// src/components/TopBar.js
import React, { useEffect, useState } from 'react';

const TopBar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  return (
    <div className="bg-blue-800 text-white p-4 flex justify-between items-center">
      {/* <div className="text-2xl font-bold">Admin Dashboard</div> */}
      <div className="text-lg">Welcome, {username}</div>
    </div>
  );
};

export default TopBar;