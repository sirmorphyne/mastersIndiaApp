import firebaseapp from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBSYLSKnkzJ0bzqCo4Do_rg9RF0epbGMsE",
  authDomain: "masterindia-17103.firebaseapp.com",
  projectId: "masterindia-17103",
  storageBucket: "masterindia-17103.appspot.com",
  messagingSenderId: "868827824440",
  appId: "1:868827824440:web:8a9864c287360086c081cd",
  measurementId: "G-VBLW99HWGM"
};

const firebase = firebaseapp.initializeApp(firebaseConfig);
const db= firebaseapp.firestore();

export {firebase};

export default db;