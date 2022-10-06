// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMAivfUlWucwOCMgHmrNHKKSQl8viraz0",
  authDomain: "fir-app-ab6aa.firebaseapp.com",
  projectId: "fir-app-ab6aa",
  storageBucket: "fir-app-ab6aa.appspot.com",
  messagingSenderId: "618496765765",
  appId: "1:618496765765:web:f48a7b3f8189f68b54d82c",
  measurementId: "G-9PGV7CFZMN",
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
