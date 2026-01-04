import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useAxios from '../../hooks/useAxios';
import { toast } from 'react-toastify';
import { FaUserShield, FaUser } from 'react-icons/fa';

const UserManagement = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = await user.getIdToken();
      const response = await axiosInstance.get('/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (email, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Are you sure you want to change ${email}'s role to ${newRole}?`)) return;

    try {
      const token = await user.getIdToken();
      await axiosInstance.patch(
        `/users/${email}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success(`Role updated to ${newRole}`);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-base-100 rounded-lg shadow-sm">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10">
                        <img src={u.photoURL} alt={u.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{u.name}</div>
                    </div>
                  </div>
                </td>
                <td>{u.email}</td>
                <td>
                  {u.role === 'admin' ? (
                    <span className="badge badge-primary gap-1">
                      <FaUserShield /> Admin
                    </span>
                  ) : (
                    <span className="badge badge-ghost gap-1">
                      <FaUser /> User
                    </span>
                  )}
                </td>
                <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td>
                  {u.email !== user.email && (
                    <button 
                      onClick={() => handleRoleChange(u.email, u.role || 'user')}
                      className="btn btn-xs btn-outline"
                    >
                      Make {u.role === 'admin' ? 'User' : 'Admin'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
