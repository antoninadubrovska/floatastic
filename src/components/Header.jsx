import { NavLink } from 'react-router'

export default function Header() {
	return (
		<header>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/products">Products</NavLink>
    </nav>
  </header>
	)

}