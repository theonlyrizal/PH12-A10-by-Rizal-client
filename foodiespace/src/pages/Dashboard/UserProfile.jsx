import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { FaUser, FaEnvelope, FaCalendar, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CloudinaryUploadWidget from '../../components/CloudinaryUploadWidget/CloudinaryUploadWidget';
import useAxios from '../../hooks/useAxios';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (imageUrl) => {
    setFormData({ ...formData, photoURL: imageUrl });
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, photoURL: '' });
  };

  const handleSave = async () => {
    if (!formData.displayName.trim()) {
      toast.error('Display name cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      const token = await user.getIdToken();
      
      // Call the backend API to update profile
      const response = await axiosInstance.patch('/users/profile', {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        
        // Reload page to update all instances of user data from Firebase
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="card bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
        <div className="card-body text-center">
          <div className="avatar online mx-auto mb-4">
            <div className="w-32 h-32 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL || 'https://i.pravatar.cc/150?img=68'} alt="Profile" />
            </div>
          </div>
          <h2 className="text-3xl font-bold">{user?.displayName}</h2>
          <p className="opacity-90">{user?.email}</p>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-wide bg-white text-primary hover:bg-base-100 border-none rounded-full gap-2 mt-4"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Information */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title mb-4">Profile Information</h3>

          {isEditing ? (
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Display Name</span>
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Your name"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Profile Picture</span>
                </label>
                <CloudinaryUploadWidget
                  onUploadSuccess={handleImageUpload}
                  currentImage={formData.photoURL}
                  onRemove={handleRemoveImage}
                  folder="foodiespace-profiles"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCancel}
                  className="btn btn-outline gap-2"
                  disabled={isSaving}
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn btn-primary gap-2"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
                <FaUser className="text-2xl text-primary mt-1" />
                <div className="flex-1">
                  <p className="text-sm opacity-70 font-semibold mb-1">Display Name</p>
                  <p className="text-lg">{user?.displayName || 'Not set'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
                <FaEnvelope className="text-2xl text-primary mt-1" />
                <div className="flex-1">
                  <p className="text-sm opacity-70 font-semibold mb-1">Email Address</p>
                  <p className="text-lg">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
                <FaCalendar className="text-2xl text-primary mt-1" />
                <div className="flex-1">
                  <p className="text-sm opacity-70 font-semibold mb-1">Member Since</p>
                  <p className="text-lg">
                    {user?.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Unknown'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
                <FaUser className="text-2xl text-primary mt-1" />
                <div className="flex-1">
                  <p className="text-sm opacity-70 font-semibold mb-1">Account Provider</p>
                  <p className="text-lg">
                    {user?.providerData?.[0]?.providerId === 'google.com'
                      ? 'Google'
                      : user?.providerData?.[0]?.providerId === 'password'
                      ? 'Email/Password'
                      : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Account Settings */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title mb-4">Account Settings</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
              <div>
                <p className="font-semibold">Email Notifications</p>
                <p className="text-sm opacity-70">Receive updates about your reviews and favorites</p>
              </div>
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </div>

            <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
              <div>
                <p className="font-semibold">Newsletter</p>
                <p className="text-sm opacity-70">Get weekly food trends and recommendations</p>
              </div>
              <input type="checkbox" className="toggle toggle-primary" />
            </div>

            <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
              <div>
                <p className="font-semibold">Community Updates</p>
                <p className="text-sm opacity-70">Stay updated with community activities</p>
              </div>
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
