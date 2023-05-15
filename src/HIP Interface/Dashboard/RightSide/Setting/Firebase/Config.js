// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCWKQhia0I9td5n9p74cXeNpymR-z4LAsc",
  authDomain: "bharat-seva-1297a.firebaseapp.com",
  projectId: "bharat-seva-1297a",
  storageBucket: "bharat-seva-1297a.appspot.com",
  messagingSenderId: "1059569736175",
  appId: "1:1059569736175:web:333ebb9c3a433f33f1fe1a",
  measurementId: "G-FSS43S7B6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)