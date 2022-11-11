// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArR4INTfcH-_M8vYWKFp2jIC0G7uFlIXY",
  authDomain: "my-bank-ap.firebaseapp.com",
  projectId: "my-bank-ap",
  storageBucket: "my-bank-ap.appspot.com",
  messagingSenderId: "720542166907",
  appId: "1:720542166907:web:e767382c2ce8432561d7de",
  measurementId: "G-4TM28E11P2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {analytics, auth, firestore, storage}