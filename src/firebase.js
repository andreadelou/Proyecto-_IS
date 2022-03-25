import { initializeApp } from "firebase/app";   // Initialize firebase app
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth'; // Module imports for firebase

// Configuration for firebase
const firebaseConfig = {
    apiKey: "AIzaSyA5SPdFF8_Ny9kRp0UHCAplAe7ReqwgBuw",
    authDomain: "mind-app-b0b0f.firebaseapp.com",
    projectId: "mind-app-b0b0f",
    storageBucket: "mind-app-b0b0f.appspot.com",
    messagingSenderId: "815045641664",
    appId: "1:815045641664:web:df8b0241e0adeadd0cb425",
    measurementId: "G-2D2X5GY96R"
};


const app = initializeApp(firebaseConfig); // Initialize app
const auth = getAuth(app);  // Auth init

/**
 * Sign in with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
export const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Create an user using email and password
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Exit the application
 */
export const logout = () => {
    signOut(auth);
}