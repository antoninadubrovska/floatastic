import Root from "../Root";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from '../pages/Cart'
import Admin from '../pages/Admin'
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
				Component: Admin,
			},
		],
	},
];