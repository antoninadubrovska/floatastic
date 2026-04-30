import Root from "../Root";
import Home from "../pages/Home";

import About from "../pages/About";
import Products from "../pages/Products";
import products from "../data/products";
import ProductDetails from "../pages/ProductDetails";

export const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
		{ path: '/', Component: Home },
		{ path: '/about', Component: About },
		{
			path: '/products',
			// loader: async () => {
			// 	return products
			// },
			loader: async () => products,
			Component: Products
		},

		{
			path: '/products/:id',
			loader: async () => products,
			Component: ProductDetails
		},
     ]
  }
];