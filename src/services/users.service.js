import { auth, db } from '../firebase'
import { collection, addDoc, Timestamp, getDocs, updateDoc, doc, query, where, setDoc, getDoc } from 'firebase/firestore'

/**
 * Creates an user collection in firestore
 * @param {*} user 
 */
export const createUserInCollection = async (user) => {
    await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: '',
        active: true,
        configured: false,
        email: user.email
    });
}


/**
 * Get the info from the user
 * @param {string} user 
 */
export const getUserInfo = async (user) => {
    const u = await getDoc(doc(db, 'users', user.uid))

    if (u.exists()) {
        return u.data();
    } else {
        await createUserInCollection(user); // Create the user data
        getUserInfo(user);  // Call the function again
    }
}

/**
 * Updates the user info
 * @param {string} uid 
 * @param {*} data 
 */
export const updateUserInfo = async (uid, data) => {
    const docRef = doc(db, 'users', uid);    // Get the document reference from firebase
    await updateDoc(docRef, data);   // Update the document
}