import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdpL6ueAVaXqgTzWAeHFZS0OINdzpd_3M",
  authDomain: "business-directory-4eb5a.firebaseapp.com",
  projectId: "business-directory-4eb5a",
  storageBucket: "business-directory-4eb5a.appspot.com",
  messagingSenderId: "692879436009",
  appId: "1:692879436009:web:a384fefdf3f848cd0aa878",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
