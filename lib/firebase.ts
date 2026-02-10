
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Essas credenciais devem ser preenchidas com as do seu console Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCID7AGwR-tfNsiJIBd0nPfBGE5adLAbwY",
  authDomain: "train-api-49052.firebaseapp.com",
  projectId: "train-api-49052",
  storageBucket: "train-api-49052.firebasestorage.app",
  messagingSenderId: "1056584302761",
  appId: "1:1056584302761:web:659d6c4a3692ded2c4a9b8",
  measurementId: "G-DT7ZYWWZ8E",
};


const isConfigValid = firebaseConfig.apiKey !== "SUA_API_KEY" && firebaseConfig.projectId !== "seu-projeto";

let dbInstance: any = null;

if (isConfigValid) {
  try {
    const app = initializeApp(firebaseConfig);
    dbInstance = getFirestore(app);
  } catch (e) {
    console.warn("Falha ao inicializar Firebase. Verifique suas credenciais.", e);
  }
}

export const db = dbInstance;
export const isFirebaseEnabled = isConfigValid && dbInstance !== null;
