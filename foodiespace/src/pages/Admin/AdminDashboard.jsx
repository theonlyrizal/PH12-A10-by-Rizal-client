import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import SectionBody from '../../wrappers/SectionBody';

const AdminDashboard = () => {
  const location = useLocation();
  const isIndex = location.pathname === '/admin' || location.pathname === '/admin/';

  return (
    <div className="min-h-screen bg-base-100">
      <SectionBody>
        <div className="flex flex-col gap-6">
          <div className="bg-primary/10 p-8 rounded-2xl text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
            <p className="text-base-content/70">Manage reviews, users, and platform content</p>
          </div>

          <div className="flex justify-center">
            <div className="tabs tabs-boxed bg-base-200 p-2 gap-2 rounded-xl">
              <NavLink 
                to="/admin" 
                end 
                className={({ isActive }) => `tab tab-lg ${isActive ? 'tab-active btn-primary text-primary-content' : ''}`}
              >
                Overview
              </NavLink>
              <NavLink 
                to="/admin/pending-reviews" 
                className={({ isActive }) => `tab tab-lg ${isActive ? 'tab-active btn-primary text-primary-content' : ''}`}
              >
                Pending Reviews
              </NavLink>
              <NavLink 
                to="/admin/all-reviews" 
                className={({ isActive }) => `tab tab-lg ${isActive ? 'tab-active btn-primary text-primary-content' : ''}`}
              >
                All Reviews
              </NavLink>
              <NavLink 
                to="/admin/users" 
                className={({ isActive }) => `tab tab-lg ${isActive ? 'tab-active btn-primary text-primary-content' : ''}`}
              >
                Users
              </NavLink>
            </div>
          </div>

          <div className="bg-base-100 rounded-2xl border border-base-200 min-h-[500px] p-6 shadow-sm">
            {isIndex ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Welcome, Admin! 👋</h2>
                <p className="max-w-md mx-auto text-base-content/70">
                  Select a tab above to manage the application. You can approve pending reviews, 
                  browse all reviews, or manage user roles.
                </p>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </SectionBody>
    </div>
  );
};

export default AdminDashboard;
