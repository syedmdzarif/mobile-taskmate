import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOf8_7otFXmdd93ikzZYBP71ldiPIhVfE",
  authDomain: "taskmate-project-b2fc3.firebaseapp.com",
  projectId: "taskmate-project-b2fc3",
  storageBucket: "taskmate-project-b2fc3.firebasestorage.app",
  messagingSenderId: "994997504761",
  appId: "1:994997504761:web:5dd3026ac26fb3530bf028"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);