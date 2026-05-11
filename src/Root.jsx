import { Outlet } from "react-router";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { auth } from './data/database'
import { useAuthStore } from "./store/useAuthStore";

import "./styles/layout.css";

//app layout wrapper

function Root() {
	const { setUser } = useAuthStore();



	useEffect(() => {
		// onAuthStateChanged - Firebase restores auth automatically.
		// page refresh keeps login
		// protected routes still work
		// admin stays authenticated

		// onAuthStateChanged listener is the bridge between:
		// Firebase Auth
		// React state

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});

		return () => unsubscribe();
	}, [setUser]);

	return (
		<div className="app">
			<Header />

			<main>
				<Outlet />
			</main>

			<Footer />
			{/* {location.pathname !== "/cart" && <Footer />} */}
		</div>
	);
}

export default Root;
