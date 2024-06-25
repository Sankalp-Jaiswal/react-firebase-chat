
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatapp-c2bb3.firebaseapp.com",
  projectId: "chatapp-c2bb3",
  storageBucket: "chatapp-c2bb3.appspot.com",
  messagingSenderId: "332701240839",
  appId: "1:332701240839:web:c924eb8ca6cc34315d64a2"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()