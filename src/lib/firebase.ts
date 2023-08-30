import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
	getAuth,
	signInWithPopup,
	signInAnonymously,
	GoogleAuthProvider,
	type UserCredential,
	signOut
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAr3-0r4n3DK0mKCnKWtb75e-X8utCYd44",
	authDomain: "codehintapi.firebaseapp.com",
	projectId: "codehintapi",
	storageBucket: "codehintapi.appspot.com",
	messagingSenderId: "420174082034",
	appId: "1:420174082034:web:e2ee0e520d489c9e35c56b",
	measurementId: "G-83367WDNTG"
};

const app = initializeApp(firebaseConfig);

export const analytics = app.name && typeof window !== "undefined" ? getAnalytics(app) : null;
export const firestore = getFirestore(app);
export const auth = getAuth(app);

export async function signInWithGoogle() {
	const credential = signInWithPopup(auth, new GoogleAuthProvider());
	return loginHandler(credential);
}

export async function signInAsGuest() {
	const credential = signInAnonymously(auth);
	return loginHandler(credential);
}

async function loginHandler(promise: Promise<UserCredential>) {
	let res: any;
	try {
		res = await promise;
	} catch (err) {
		console.error(err);
	}
	return { res };
}

export async function firebaseSignOut() {
	await signOut(auth);
}
