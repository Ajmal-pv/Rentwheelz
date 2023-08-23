
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe-UudexGTA40PFaMX6BLxuhiabSsXvYY",
  authDomain: "rentwheelz-af94b.firebaseapp.com",
  projectId: "rentwheelz-af94b",
  storageBucket: "rentwheelz-af94b.appspot.com",
  messagingSenderId: "89688121985",
  appId: "1:89688121985:web:d8a2455d09df27d3612380",
  measurementId: "G-TMYP0EXTGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export { app, storage };