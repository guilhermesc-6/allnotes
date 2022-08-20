import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoSeoh9WJqziCgbvzXOc5EtbOXoay62gA",
  authDomain: "allnotes-1234e.firebaseapp.com",
  projectId: "allnotes-1234e",
  storageBucket: "allnotes-1234e.appspot.com",
  messagingSenderId: "311680210784",
  appId: "1:311680210784:web:a5b0c7340382973444f005",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
