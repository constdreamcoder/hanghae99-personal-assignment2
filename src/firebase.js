// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOjSDNKptJ53U9Z2aGqg1oYYBEO33v8OI",
  authDomain: "sparta-react-personal-project2.firebaseapp.com",
  projectId: "sparta-react-personal-project2",
  storageBucket: "sparta-react-personal-project2.appspot.com",
  messagingSenderId: "997991508500",
  appId: "1:997991508500:web:bb94febc7de2ba401e1501",
  measurementId: "G-PEP6HJH5EQ",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
export const db = getFirestore();
