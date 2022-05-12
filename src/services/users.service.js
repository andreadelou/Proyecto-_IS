import { auth, db } from '../firebase'
import { collection, addDoc, Timestamp, getDocs, updateDoc, doc, query, where, setDoc } from 'firebase/firestore'

/**
 * Creates an user collection in firestore
 * @param {*} user 
 */
export const createUserInCollection = async (user) => {
    console.log(user);
    await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: '',
        active: true,
        email: user.email
    });
}