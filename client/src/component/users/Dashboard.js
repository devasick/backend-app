// src/components/Dashboard.js
import React from 'react';

import Layout from '../layout/Layout';


const Dashboard = () => {


  
  return (
    <Layout>
    <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Users</h3>
        <p className="text-gray-700">Manage your users here.</p>
      </div>
      {/* Card 2 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Analytics</h3>
        <p className="text-gray-700">View your analytics here.</p>
      </div>
      {/* Card 3 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Settings</h3>
        <p className="text-gray-700">Adjust your settings here.</p>
      </div>
    </div>
  </Layout>
  );
};

export default Dashboard;