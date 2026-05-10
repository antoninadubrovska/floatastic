
import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import { useFuseSearch } from "../hooks/useFuseSearch";
import { useProductsStore } from "../store/useProductsStore";
import { useSortedProducts } from "../hooks/useSortedProducts";

const Products = () => {

	const { products, loading, fetchProducts } = useProductsStore();

	const [searchItem, setSearchItem] = useState('');
	const [ sortOption, setSortOption ] = useState('')

	// fetch from db when it loads

	// ?
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);


	//search
	const matchingProducts = useFuseSearch(products, searchItem, [
		"name",
		"category",
	]);

	//sort
	const sortedProducts = useSortedProducts(matchingProducts, sortOption);


	if (loading && products.length === 0) {
		return <p className="loading">Loading ... </p>;
	}

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

				<select className="sort"
					value={sortOption}
					onChange={(e) => setSortOption(e.target.value)}
				>
					<option value="">Sort by</option>
					<option value="name-asc">Name A-Z</option>
					<option value="name-desc">Name Z-A</option>
					<option value="price-asc">Price low - high</option>
					<option value="price-desc">Price high - low</option>
				</select>
			</div>
			<div className="products-list">
				{/* {searchItem && matchingProducts.length === 0 && ( */}
				{searchItem && sortedProducts.length === 0 && (
					<p className="search-no-results">
						No results, but don't give up now!
					</p>
				)}

				{/* {matchingProducts.map((i) => ( */}
				{sortedProducts.map((i) => (
					<ProductItem key={i.id} item={i} />
				))}
			</div>
		</div>
	);
};

export default Products;
