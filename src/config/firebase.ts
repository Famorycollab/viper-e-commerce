import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAn8tOMnVo3xtaK0AJLyyVE32PWABIhFlM",
  authDomain: "viper-worlds.firebaseapp.com",
  databaseURL: "https://viper-worlds-default-rtdb.firebaseio.com",
  projectId: "viper-worlds",
  storageBucket: "viper-worlds.firebasestorage.app",
  messagingSenderId: "126628632278",
  appId: "1:126628632278:web:a58803f434d359d11ddb77",
  measurementId: "G-MPZE8DL0WT"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
