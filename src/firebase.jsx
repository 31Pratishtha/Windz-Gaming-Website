import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfCGe_2n-AixuhFvmmQLU1MwLqZQUw0lM",
  authDomain: "windzgaming-development.firebaseapp.com",
  projectId: "windzgaming-development",
  storageBucket: "windzgaming-development.appspot.com",
  messagingSenderId: "1011474746181",
  appId: "1:1011474746181:web:56a3dbadce0abca68bcc2c",
  measurementId: "G-6SVKKCP2C3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };
