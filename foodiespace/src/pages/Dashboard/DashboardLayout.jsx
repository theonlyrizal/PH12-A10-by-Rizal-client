import React, { useContext } from 'react';
import { Outlet, NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { FaTachometerAlt, FaUser, FaStar, FaHeart, FaSignOutAlt } from 'react-icons/fa';

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const menuItems = [
    { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Overview', end: true },
    { path: '/dashboard/profile', icon: <FaUser />, label: 'My Profile' },
    { path: '/my-reviews', icon: <FaStar />, label: 'My Reviews' },
    { path: '/my-favorites', icon: <FaHeart />, label: 'My Favorites' },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Top Navbar */}
      <div className="bg-base-100 shadow-sm border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost gap-2">
              <img
                src={user?.photoURL || 'https://i.pravatar.cc/150?img=68'}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <span className="hidden md:inline">{user?.displayName}</span>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-lg mt-2">
              <li>
                <NavLink to="/dashboard/profile">
                  <FaUser /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">
                  <FaTachometerAlt /> Dashboard
                </NavLink>
              </li>
              <li>
                <button onClick={signOutUser} className="text-error">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Layout with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card bg-base-100 shadow-md sticky top-24">
              <div className="card-body p-4">
                <ul className="menu menu-compact">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <NavLink
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) =>
                          isActive ? 'active bg-primary text-white' : ''
                        }
                      >
                        {item.icon}
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
