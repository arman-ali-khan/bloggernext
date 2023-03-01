import React, { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const contextProvider = createContext();
export const auth = getAuth(app);
const AuthContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [dbUser, setDbUser] = useState({});

console.log(dbUser)
    // DB USer

     
    useEffect(() => {
      axios.get(`https://blog-server-sparmankhan.vercel.app/dbUser?email=${user?.email}`)
      .then((response) => {
        setDbUser(response.data);
      }).catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
     }, [user?.email]);

  const googleProvider = new GoogleAuthProvider();

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleUserUpdate = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  const logOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);



  const info = {
    user,
    googleLogin,
    dbUser,
    userLogin,
    createUser,
    handleUserUpdate,
    logOut,
  };
  return (
    <contextProvider.Provider value={info}>{children}</contextProvider.Provider>
  );
};

export default AuthContext;
