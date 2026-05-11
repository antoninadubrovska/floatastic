import {
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

import { auth } from "../data/database";

//Firebase call lives here:

// LOGIN
export const loginUser = async (email, password) => {
	const userCredential =
		await signInWithEmailAndPassword(
			auth,
			email,
			password
		);

	return userCredential.user;
};

// LOGOUT
export const logoutUser = async () => {
	await signOut(auth);
};