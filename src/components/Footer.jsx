import { NavLink } from "react-router";

import { logoutUser } from "../services/authService";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router";

import followInstagram from "./../assets/svg/insta-bg-soft.svg";
import followWhathapp from "./../assets/svg/whatsapp-bg-soft.svg";
import followFacebook from "./../assets/svg/fb-bg-soft.svg";

export default function Footer() {
	const { user } = useAuthStore();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logoutUser();

			navigate("/login");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<footer>
			<nav className="footer-section footer-nav">
				<NavLink to="/">Home</NavLink>
			</nav>

			{/* TODO: semantic */}
			<div className="footer-section footer-address-and-follow">
				<div className="">Address</div>
				<div className="follow">
					<NavLink to="">
						<img
							src={followInstagram}
							alt=""
							className="follow-instagram"
						/>
					</NavLink>

					<NavLink to="">
						<img
							src={followFacebook}
							alt=""
							className="follow-facebook"
						/>
					</NavLink>

					<NavLink to="">
						<img
							src={followWhathapp}
							alt=""
							className="follow-whathapp"
						/>
					</NavLink>
				</div>
			</div>

			{/* <div className="footer-section footer-follow">


			</div> */}

			<nav className="footer-section footer-admin">
				{/* <NavLink to="/admin">Admin</NavLink>

				{user && <button onClick={handleLogout}>Log out</button>} */}

				<div className="admin-logout">
					{/* TODO: Semantically better:

<button onClick={handleLogout}>
	Log out
</button>
can style button to look like a link.
better accessibility and semantics. */}
					{user ? (
						<NavLink onClick={handleLogout}>Log out</NavLink>
					) : (
						<NavLink to="/login">Admin</NavLink>
					)}
				</div>
			</nav>

			{/* FLOW: When await signOut(auth) runs,Firebase clears session and triggers onAuthStateChanged. Then thr listener automatically does: setUser(null), then ProtectedRoute blocks /admin and user becomes logged out everywhere, SO signOut() -> onAuthStateChanged() -> setUser(null) */}
		</footer>
	);
}

// TODO: footer contacts, nav links, social media icons etc.
