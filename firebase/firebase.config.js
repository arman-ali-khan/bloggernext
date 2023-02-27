// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4UxWS51GNmPMWAWBpcKJu8FFrYVftpAI",
  authDomain: "pastfolio.firebaseapp.com",
  projectId: "pastfolio",
  storageBucket: "pastfolio.appspot.com",
  messagingSenderId: "564681441457",
  appId: "1:564681441457:web:5a11f33e0fd3f76063e290"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;