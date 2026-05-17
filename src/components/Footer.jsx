import { NavLink } from "react-router";

import { logoutUser } from "../services/authService";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router";

// import followInstagram from "./../assets/svg/insta-bg-soft.svg";
// import followWhathapp from "./../assets/svg/whatsapp-bg-soft.svg";
// import followFacebook from "./../assets/svg/fb-bg-soft.svg";
import { socialLinks } from "../config/socialLinks";

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
				{/* <div className="">Address</div> */}

				<address className="footer-address">
					<strong>Floatastic HQ</strong>
					<br />
					Stockholm, Sweden
					<br />
					<p className="footer-contact">
						<a href="mailto:hello@floatastic.se">
							hello@floatastic.se
						</a>
					</p>
				</address>

				<div className="follow">
					{socialLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src={link.img} alt={link.alt} />
						</a>
					))}
				</div>
			</div>

			<nav className="footer-section footer-admin">
				<div className="admin-logout">
					{user ? (
						<NavLink onClick={handleLogout}>Log out</NavLink>
					) : (
						<NavLink to="/login">Admin</NavLink>
					)}
				</div>
			</nav>
		</footer>
	);
}


