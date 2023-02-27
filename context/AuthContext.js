import app from '../firebase/firebase.config';
import React, { createContext, useEffect, useState } from 'react';

import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'

export const contextProvider = createContext()
export const auth = getAuth(app)
const AuthContext = ({children}) => {
    const arman = 'Samrat'
    const [user,setUser] = useState()

    const googleProvider = new GoogleAuthProvider()

    const googleLogin = ()=>{
        return signInWithPopup(auth,googleProvider)
    }

    const userLogin = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const handleUserUpdate = (profile) =>{
        return updateProfile(auth.currentUser,profile)
    }
    const logOut = ()=>{
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
        return ()=> unsubscribe();
    },[])

    const info = {user,googleLogin,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile,logOut,arman}
    return (
        <contextProvider.Provider value={info}>
            {children}
        </contextProvider.Provider>
    );
};

export default AuthContext;