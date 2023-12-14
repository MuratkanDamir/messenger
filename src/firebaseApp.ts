// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe8fIIJWGHy6HOfrfDkCFXYFNmjwdS-5c",
  authDomain: "messenger-996b8.firebaseapp.com",
  projectId: "messenger-996b8",
  storageBucket: "messenger-996b8.appspot.com",
  messagingSenderId: "659350903082",
  appId: "1:659350903082:web:60956d4ea59ad3d70f2653"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const storage = getStorage();

export { auth, db , storage };