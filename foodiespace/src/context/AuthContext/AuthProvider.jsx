import React, { useEffect, useState } from 'react';

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  // sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase/firebase.init';
import useAxios from '../../hooks/useAxios';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('user'); // default role
  const [roleLoading, setRoleLoading] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  // Fetch user role from MongoDB
  const fetchUserRole = async (email) => {
    if (!email) return;

    setRoleLoading(true);
    const axiosInstance = useAxios();
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const token = await currentUser.getIdToken();
      const response = await axiosInstance.get(`/users/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.role) {
        setUserRole(response.data.role);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole('user'); // fallback to user role
    } finally {
      setRoleLoading(false);
    }
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = async (displayName, photoURL) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
      setUser({ ...auth.currentUser });
    } finally {
      setLoading(false);
    }
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() => setLoading(false));
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // const passReset = (email) => {
  //   return sendPasswordResetEmail(auth, email);
  // };

  const signOutUser = () => {
    setLoading(true);
    setUserRole('user'); // Reset role on logout
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // console.log('inside observer', currentUser);
      setUser(currentUser);

      // Fetch user role when user logs in
      if (currentUser && currentUser.email) {
        await fetchUserRole(currentUser.email);
      } else {
        setUserRole('user'); // Reset role when logged out
      }

      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Computed property for admin check
  const isAdmin = userRole === 'admin';

  const authInfo = {
    user,
    loading,
    userRole,
    roleLoading,
    isAdmin,
    createUser,
    updateUserProfile,
    signInUser,
    signInWithGoogle,
    signOutUser,
    fetchUserRole,
    // passReset,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
