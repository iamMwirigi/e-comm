// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoPooNhXkqqcFnmEF31GxiTBgoTg_ppeI",
  authDomain: "thoko-26780.firebaseapp.com",
  projectId: "thoko-26780",
  storageBucket: "thoko-26780.firebasestorage.app",
  messagingSenderId: "490163837365",
  appId: "1:490163837365:web:6ca5efd8c636588312a1fc",
  measurementId: "G-GDL0PH7N2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Export the auth instance
