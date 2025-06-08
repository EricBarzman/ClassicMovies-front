import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_URL,
  authDomain: "classic-movies-eb.firebaseapp.com",
  projectId: "classic-movies-eb",
  storageBucket: "classic-movies-eb.firebasestorage.app",
  messagingSenderId: "534272823760",
  appId: "1:534272823760:web:889a9c647765457196a9d5",
  measurementId: "G-ES3DMMY1M8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
