import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-800 text-white h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Rent Wheelz</h2>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li className="p-4 hover:bg-blue-700">
            <Link to="/dashboard" className="block">
              Dashboard
            </Link>
          </li>
          <li className="p-4 hover:bg-blue-700">
            <Link to="/cars" className="block">
              Cars
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
      <div className="p-4">
        <p className="text-sm">Logged in as Admin</p>
      </div>
    </aside>
  );
};

export default Sidebar;
