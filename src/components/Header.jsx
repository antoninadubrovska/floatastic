import { NavLink } from 'react-router'
import headerLogo from './../assets/logo-full.svg'


export default function Header() {
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

			<nav>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/products">Products</NavLink>
			</nav>
		</header>
	);

}