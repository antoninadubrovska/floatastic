import { NavLink } from "react-router";
import { useState } from "react";
import Logo from "./../assets/svg/logo-full.svg?react";
import cartIcon from "./../assets/svg/cart-22D3EE.svg";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router";
import { useCartStore } from "../store/useCartStore";
import { getCartTotalItems } from "../utils/cartCounter";



export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const closeMenu = () => setIsMenuOpen(false);

	const { user } = useAuthStore();
	const { cart } = useCartStore();
	const totalItems = getCartTotalItems(cart);

	return (
		<header>
			<NavLink to="/" onClick={closeMenu} className="logoLink">
				<Logo className="logo-full-header" />
			</NavLink>

			<button
				className={`menu-btn ${isMenuOpen ? "open" : ""}`}
				onClick={toggleMenu}
				aria-label="Toggle menu"
			>
				<span></span>
				<span></span>
				<span></span>
			</button>

			<nav
				className={isMenuOpen ? "open" : ""}
				//  mobile menu panel when clicked outside it:
				onClick={closeMenu}
			>
				<div
					className="nav-panel"
					// mobile menu panel when clicked inside it:
					onClick={(e) => e.stopPropagation()}
				>
					<NavLink to="/" onClick={closeMenu}>
						Home
					</NavLink>
					<NavLink to="/about" onClick={closeMenu}>
						About
					</NavLink>
					<NavLink to="/products" onClick={closeMenu}>
						Products
					</NavLink>

					{user && (
						<NavLink to="/admin" onClick={closeMenu}>
							Admin
						</NavLink>
					)}

					<NavLink
						className="cartIconLink"
						to="/cart"
						onClick={closeMenu}
					>
						<img src={cartIcon} alt="Cart" className="cart-icon" />
						{totalItems > 0 && (
							<span className="cart-badge">{totalItems}</span>
						)}
					</NavLink>
				</div>
			</nav>
		</header>
	);
}
