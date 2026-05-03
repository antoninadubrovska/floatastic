import { NavLink } from "react-router";

export default function Footer() {
	return (
		<footer>
			<nav>
				<NavLink to="/">Home</NavLink>
				{/* <NavLink to="/about">About</NavLink>
          <NavLink to="/products">Products</NavLink> */}
			</nav>
			<p className="copyright">Copyright 2026</p>
		</footer>
	);
}
