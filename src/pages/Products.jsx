import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import { useFuseSearch } from "../hooks/useFuseSearch";
import { useProductsStore } from "../store/useProductsStore";
import { useSortedProducts } from "../hooks/useSortedData";
import SearchAndSort from "../components/SearchAndSort";
import { useScroll } from "../hooks/useScroll";

//import { runCrudTest } from "../debug/crudTest";

const Products = () => {
	const { products, loading, fetchProducts } = useProductsStore();

	const [searchItem, setSearchItem] = useState("");
	const [sortOption, setSortOption] = useState("");

	// fetch from db when it loads

	// ?
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const { scrollToTop } = useScroll();

	//search
	const matchingProducts = useFuseSearch(products, searchItem, [
		"name",
		"category",
	]);

	//sort
	const sortedProducts = useSortedProducts(matchingProducts, sortOption);

	if (loading && products.length === 0) {
		return <p className="products-loading">Loading ... </p>;
	}

	return (
		<div className="products-page">
			<h2 className="products-h"> The floats </h2>

			{/* <button onClick={runCrudTest}>Run CRUD Test</button> */}

			<SearchAndSort
				searchItem={searchItem}
				setSearchItem={setSearchItem}
				sortOption={sortOption}
				setSortOption={setSortOption}
				searchPlaceholder="Search for a float..."
			/>

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

			<button className="scrollToTop" onClick={scrollToTop}>
				Back to top
			</button>
		</div>
	);
};

export default Products;
