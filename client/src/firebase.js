// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "project01-f1699.firebaseapp.com",
  projectId: "project01-f1699",
  storageBucket: "project01-f1699.appspot.com",
  messagingSenderId: "587570595779",
  appId: "1:587570595779:web:72ba265aa3d8bc78d19f76",
  measurementId: "G-2X3W7CXDXG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);