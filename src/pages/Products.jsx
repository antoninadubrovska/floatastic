//import { useLoaderData } from "react-router";
import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import { useFuseSearch } from "../hooks/useFuseSearch";
import { useProductsStore } from "../store/useProductsStore";

const Products = () => {
	// useLoaderData returnerar data av samma typ som loader-funktionen returnerar
	//const products = useLoaderData();

	const { products, loading, fetchProducts } = useProductsStore();
	const [searchItem, setSearchItem] = useState("");

	// fetch from db when it loads

	// ?
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const matchingProducts = useFuseSearch(products, searchItem, [
		"name",
		"category",
	]);

	if (loading && products.length === 0) {
		return <p>Loading ... </p>;
	}

	//if (error) return <p>Something weird happened! </p>;

	// console.log("Products from store:", products);
	return (
		<div className="products-page">
			<h2 className="products-h"> The floats </h2>

			<div className="search">
				<input
					type="text"
					placeholder="Search for a float..."
					value={searchItem}
					onChange={(e) => setSearchItem(e.target.value)}
				/>{" "}
			</div>

			<div className="products-list">
				{searchItem && matchingProducts.length === 0 && (
					<p>No results, but don't give up now!</p>
				)}

				{matchingProducts.map((i) => (
					<ProductItem key={i.id} item={i} />
				))}
			</div>
		</div>
	);
};

export default Products;
