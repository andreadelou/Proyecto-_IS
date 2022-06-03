import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";   // Initialize firebase app
import { getFirestore } from "firebase/firestore"

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
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
export const db = getFirestore(app);    // Export firestore connection


export const auth = getAuth(app);  // Auth init

/**
 * Sign in with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);    // Call firebase
        console.log(res);
        return true;
    } catch (error) {
        console.log(error);
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
        const u = await createUserWithEmailAndPassword(auth, email, password);    // Call firebase
        return u.user;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Sends a reset password email to the users
 */
export const sendResetPasswordEmail = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}



/**
 * Exit the application
 */
 export const logout = async () => {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        return false
    }
}

