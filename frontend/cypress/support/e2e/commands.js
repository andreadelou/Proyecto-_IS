import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
	apiKey: "AIzaSyA5SPdFF8_Ny9kRp0UHCAplAe7ReqwgBuw",
	authDomain: "mind-app-b0b0f.firebaseapp.com",
	projectId: "mind-app-b0b0f",
	storageBucket: "mind-app-b0b0f.appspot.com",
	messagingSenderId: "815045641664",
	appId: "1:815045641664:web:df8b0241e0adeadd0cb425",
	measurementId: "G-2D2X5GY96R"
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });