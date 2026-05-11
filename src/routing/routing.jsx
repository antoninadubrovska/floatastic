import Root from "../Root";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from '../pages/Cart'
import Admin from '../pages/Admin'
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
//import { Component } from "react";

export const routes = [
	{
		path: "/",
		element: <Root />,
		children: [
			{ path: "/", Component: Home },
			{ path: "/about", Component: About },
			{
				path: "/products",
				Component: Products,
			},

			{
				path: "/products/:id",
				Component: ProductDetails,
			},
			{
				path: "/cart",
				Component: Cart,
			},
			{
				path: "/admin",
				element: (
					<ProtectedRoute>
						<Admin />
					</ProtectedRoute>
					// cannot use 'Component: Admin'  because ProtectedRoute needs JSX children.
				),
			},
			{
				path: "/login",
				Component: Login,
			},
		],
	},
];



// login success
// ↓
// Firebase stores session
// ↓
// onAuthStateChanged fires
// ↓
// Zustand user updated
// ↓
// ProtectedRoute allows /admin
// and after refresh:
// Firebase restores session automatically