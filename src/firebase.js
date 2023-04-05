import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCPeadjEA_LkQjGMaRSqpPhMtygr-LKOY0",
  authDomain: "nativezoomproject.firebaseapp.com",
  projectId: "nativezoomproject",
  storageBucket: "nativezoomproject.appspot.com",
  messagingSenderId: "904475439477",
  appId: "1:904475439477:web:3618368496c8765b01233c",
  measurementId: "G-7KHPTC79YW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);