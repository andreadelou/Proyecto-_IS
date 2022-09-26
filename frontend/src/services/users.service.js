import { auth, db } from "../firebase";
import {
    collection,
    addDoc,
    Timestamp,
    getDocs,
    updateDoc,
    doc,
    query,
    where,
    setDoc,
    getDoc,
} from "firebase/firestore";

/**
 * Creates an user collection in firestore
 * @param {*} user
 */
export const createUserInCollection = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: "",
        active: true,
        configured: false,
        email: user.email,
    });
};

/**
 * Add points to the user
 * @param {*} points
 * @param {*} user
 */
export const addPointsToUser = async (points, user) => {
    const userInfo = await getUserInfo(user); // Get the user info
    let userPoints = userInfo.points ?? 0; // Get the user points
    userPoints += points; // Add the points to the user
    userInfo.points = userPoints;
    updateUserInfo(user.uid, userInfo); // Update the user points
};

/**
 * Get the info from the user
 * @param {string} user
 */
export const getUserInfo = async (user) => {
    const u = await getDoc(doc(db, "users", user.uid));
    if (u.exists()) {
        return u.data();
    } else {
        await createUserInCollection(user); // Create the user data
        getUserInfo(user); // Call the function again
    }
};

/* 
Guardar array de las mascotas

 */
export const setArmario = async (newpet, user) => {
    const userInfo = await getUserInfo(user);
    let usernewpet = userInfo.newpet[2];
    usernewpet = newpet;
    userInfo.newpet = usernewpet;
    updateUserInfo(user.uid, userInfo);
};

/**
 * Updates the user info
 * @param {string} uid
 * @param {*} data
 */
export const updateUserInfo = async (uid, data) => {
    const docRef = doc(db, "users", uid); // Get the document reference from firebase
    await updateDoc(docRef, data); // Update the document
};
