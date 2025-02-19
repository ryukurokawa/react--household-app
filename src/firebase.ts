// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0bB7VcfDN4894JgjzFjyBs1QhvXmxFZg",
  authDomain: "house-holdtypescript.firebaseapp.com",
  projectId: "house-holdtypescript",
  storageBucket: "house-holdtypescript.firebasestorage.app",
  messagingSenderId: "600381016759",
  appId: "1:600381016759:web:400fde598201c70e919b32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}