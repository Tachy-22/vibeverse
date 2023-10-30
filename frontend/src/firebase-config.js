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
  apiKey: "AIzaSyCAJ7ocFEe8maKwLnn1bH_w6ndNsJZEiuY",
  authDomain: "vibeverse-f0454.firebaseapp.com",
  projectId: "vibeverse-f0454",
  storageBucket: "vibeverse-f0454.appspot.com",
  messagingSenderId: "843024025830",
  appId: "1:843024025830:web:7ae159ead0ca044b559327",
  measurementId: "G-DXY5TM545E",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
