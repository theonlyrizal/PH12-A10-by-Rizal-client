import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from 'firebase/auth';
// import { auth } from '../../firebase/firebase.init';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  // const googleProvider = new GoogleAuthProvider();

  // const createUser = (email, password) => {
  //   setLoading(true);
  //   return createUserWithEmailAndPassword(auth, email, password);
  // };

  // const updateUserProfile = async (displayName, photoURL) => {
  //   setLoading(true);
  //   try {
  //     await updateProfile(auth.currentUser, { displayName, photoURL });
  //     setUser({ ...auth.currentUser });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const signInUser = (email, password) => {
  //   setLoading(true);
  //   return signInWithEmailAndPassword(auth, email, password).finally(() => setLoading(false));
  // };

  // const signInWithGoogle = () => {
  //   setLoading(true);
  //   return signInWithPopup(auth, googleProvider);
  // };

  // const passReset = (email) => {
  //   return sendPasswordResetEmail(auth, email);
  // };

  // const signOutUser = () => {
  //   setLoading(true);
  //   return signOut(auth);
  // };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     // console.log('inside observer', currentUser);
  //     setUser(currentUser);
  //     setLoading(false);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const authInfo = {
    user,
    // loading,
    // createUser,
    // updateUserProfile,
    // signInUser,
    // signInWithGoogle,
    // signOutUser,
    // passReset,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
