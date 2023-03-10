// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey : process.env.NEXT_APIKEY,
  authDomain : process.env.NEXT_AUTHDOMAIN,
  projectId : process.env.NEXT_PROJECTID,
  storageBucket : process.env.NEXT_STORAGEBUCKET,
  messagingSenderId : process.env.NEXT_MESSENGING,
  appId : process.env.NEXT_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;