// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "final-c23e4.firebaseapp.com",
  projectId: "final-c23e4",
  storageBucket: "final-c23e4.firebasestorage.app",
  messagingSenderId: "373314858695",
  appId: "1:373314858695:web:8eb8b32c36d427c74198e2",
  measurementId: "G-KKCJ8ZBRVG"
};

// Initialize Firebase
const app = getApps().length == 0 ? initializeApp(firebaseConfig): getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export {db,  storage};