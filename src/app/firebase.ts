import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB1caLxnXHjO6Ivb0Sg3QD7nHbTVdQ1ovA",
    authDomain: "tic-tac-toe-v2-38925.firebaseapp.com",
    projectId: "tic-tac-toe-v2-38925",
    databaseURL:"https://tic-tac-toe-v2-38925-default-rtdb.europe-west1.firebasedatabase.app/",
    storageBucket: "tic-tac-toe-v2-38925.firebasestorage.app",
    messagingSenderId: "139675005772",
    appId: "1:139675005772:web:61b491d3ff88cd94b315e9",
    measurementId: "G-DLE9Q7R4VQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getDatabase(app);

export { auth, googleProvider, db };
