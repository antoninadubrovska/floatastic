import { NavLink } from "react-router";

export default function Footer() {
	return (
		<footer>
			<nav className="footer-section">
				<NavLink to="/">Home</NavLink>
			</nav>

			<div className="footer-section">
				<p className="copyright">Copyright 2026</p>
			</div>

			<div className="footer-section"></div>

			<nav className="footer-section">
				<NavLink to="/admin">Admin</NavLink>
			</nav>
		</footer>
	);
}

// TODO: footer contacts, nav links, social media icons etc.
