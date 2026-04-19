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
  apiKey: "AIzaSyCBIXpOMzba3-n-Gh_rV_mlSS0iQcv7XCg",
  authDomain: "netfillx.firebaseapp.com",
  projectId: "netfillx",
  storageBucket: "netfillx.firebasestorage.app",
  messagingSenderId: "97866415496",
  appId: "1:97866415496:web:c6508d78fa337530cfce3d",
  measurementId: "G-BF855GTP37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);
