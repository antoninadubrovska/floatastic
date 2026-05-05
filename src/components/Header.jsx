import { NavLink } from 'react-router'
import { useState } from 'react'
import headerLogo from './../assets/logo-full.svg'


export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header>
			{/* <div>
			</div> */}
			<NavLink to="/">
				<img
					src={headerLogo}
					alt="Floatastic"
					className="logo-full-header"
				/>
			</NavLink>

			<button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
				☰
			</button>

			<nav className={isMenuOpen ? 'open' : ''}>
				<NavLink to="/" onClick={() => setIsMenuOpen(false)}>
					Home
				</NavLink>
				<NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
					About
				</NavLink>
				<NavLink to="/products" onClick={() => setIsMenuOpen(false)}>
					Products
				</NavLink>
			</nav>
		</header>
	);

}