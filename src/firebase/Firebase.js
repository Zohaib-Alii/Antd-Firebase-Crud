import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAd_IupAay9xUhOvUtMfYgoO3kBNfqh0jw",
  authDomain: "fir-crud-a4bcb.firebaseapp.com",
  projectId: "fir-crud-a4bcb",
  storageBucket: "fir-crud-a4bcb.appspot.com",
  messagingSenderId: "391313921679",
  appId: "1:391313921679:web:002b4022b6ac0642ae82fa",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
