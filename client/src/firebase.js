// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-afc24.firebaseapp.com",
  projectId: "mern-blog-afc24",
  storageBucket: "mern-blog-afc24.firebasestorage.app",
  messagingSenderId: "932039309504",
  appId: "1:932039309504:web:60d3febb74c8d494b39525"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

