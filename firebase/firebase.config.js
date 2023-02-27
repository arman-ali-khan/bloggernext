// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey : 'AIzaSyDiTKP8CiwZ_pVl26TUjw9V3SAVCNY4nOU',
  authDomain : 'next-blog-js.firebaseapp.com',
  projectId : 'next-blog-js',
  storageBucket : 'next-blog-js.appspot.com',
  messagingSenderId : '860791444324',
  appId : '1:860791444324:web:41cb3493a703a957c4a071',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;