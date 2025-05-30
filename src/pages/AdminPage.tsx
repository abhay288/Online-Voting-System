import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, Users } from 'lucide-react';

const AdminPage: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage elections and system settings
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <nav className="flex flex-col">
              <Link
                to="/admin"
                className={`px-4 py-3 flex items-center space-x-3 ${
                  isActive('/admin')
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/admin/elections"
                className={`px-4 py-3 flex items-center space-x-3 ${
                  location.pathname.includes('/admin/elections') || location.pathname === '/admin'
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText size={18} />
                <span>Elections</span>
              </Link>
              <Link
                to="/admin/users"
                className={`px-4 py-3 flex items-center space-x-3 ${
                  location.pathname.includes('/admin/users')
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users size={18} />
                <span>Users</span>
              </Link>
              <Link
                to="/admin/settings"
                className={`px-4 py-3 flex items-center space-x-3 ${
                  location.pathname.includes('/admin/settings')
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;