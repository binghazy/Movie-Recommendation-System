// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeXsF8PjNA-NHNB6Q3ozrYCCZYhxAnJGs",

  authDomain: "samer-the-bot.firebaseapp.com",

  projectId: "samer-the-bot",

  storageBucket: "samer-the-bot.firebasestorage.app",

  messagingSenderId: "1086783459654",

  appId: "1:1086783459654:web:bdc41a7763fc9ffacc5547",

  measurementId: "G-BB0PBHSESS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);
