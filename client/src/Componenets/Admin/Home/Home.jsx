import React from 'react';
import Sidebar from './Sidebar';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 overflow-x-hidden ">
        {/* Your main content goes here */}
        <h1 className="text-2xl font-semibold mt-6 mb-4">Admin Dashboard</h1>
        {/* Other components and content */}
      </main>
    </div>
  );
};

export default AdminDashboard;
