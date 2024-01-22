// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjQgZXz7UBLwOzA0HWdS_nMLF9UdHTpf4",
    authDomain: "basic-voting-app.firebaseapp.com",
    projectId: "basic-voting-app",
    storageBucket: "basic-voting-app.appspot.com",
    messagingSenderId: "961773345533",
    appId: "1:961773345533:web:ffd2bfb52c01d48af2bc94",
    measurementId: "G-6WHCDYJHYB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

export { firestore };
