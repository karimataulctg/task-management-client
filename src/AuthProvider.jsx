import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  
  import React, { createContext, useEffect, useState } from "react";
  import { auth } from "../firebase.config";
  
  export const AuthContext = createContext(null);
  const googleProvider = new GoogleAuthProvider();
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    // Create a new User
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
    // Sign in users
    const signInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
    // Log out users
    const signOutUser = (email, password) => {
      setLoading(true);
      return signOut(auth).then(() => {
        setUser(null);
        setLoading(false);
      });
    };
    // Sign in with Google
    const signInWithGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider)
        .then((result) => {
          setUser(result.user);
          setLoading(false);
          return result;
        })
        .catch((error) => {
          setLoading(false);
          throw error;
        });
    };
    // Update user Profile
    const updateUserProfile = async (name, photoURL) => {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        });
        setUser({ ...auth.currentUser, displayName: name, photoURL: photoURL });
      } else {
        throw new Error("No user is currently logged in");
      }
    };
  
    // UseEffect clean up the listener
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
          setIsAuthLoading(false);
      });
      return () => unsubscribe();
    }, []);
  
    const authInfo = {
      user,
      loading,
      isAuthLoading,
      createUser,
      signInUser,
      signOutUser,
      signInWithGoogle,
      updateUserProfile,
    };
  
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
  