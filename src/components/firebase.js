// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA9uv1MTQvecsdm0bUMfQ5yrhTNoPrUuU",
  authDomain: "listvine-4fba0.firebaseapp.com",
  projectId: "listvine-4fba0",
  storageBucket: "listvine-4fba0.appspot.com",
  messagingSenderId: "609730117269",
  appId: "1:609730117269:web:31dc760e703f77acae259c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore();

export default firebaseApp;