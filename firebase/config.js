import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjAx8R7aERtdxRln2ZQQtNfo5iGDP8QR8",
  authDomain: "fir-tutorial-ae350.firebaseapp.com",
  projectId: "fir-tutorial-ae350",
  storageBucket: "fir-tutorial-ae350.appspot.com",
  messagingSenderId: "605268762639",
  appId: "1:605268762639:web:6a6308e36c91237c97437a",
  measurementId: "G-TVP0ZFHZXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)