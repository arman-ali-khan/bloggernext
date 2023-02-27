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
  const arman = "Samrat";
  const [user, setUser] = useState({});
  const [dbUser, setDbUser] = useState({});

console.log(dbUser)
    // DB USer

    useState(() => {
        // fetch(`https://blog-server-sparmankhan.vercel.app/blogs/dbUser?email=${user?.email}`)
        // .then(res=>res?.json())
        // .then(data=>{
        //     setDbUser(data)
        // })
        axios
          .get(`https://blog-server-sparmankhan.vercel.app/blogs/dbUser?email=${user?.email}`)
          .then((response) => {
            setDbUser(response.data);
          });
      }, [user]);

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
    arman,
  };
  return (
    <contextProvider.Provider value={info}>{children}</contextProvider.Provider>
  );
};

export default AuthContext;
