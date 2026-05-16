import { useEffect, useState } from "react";
import { useProductsStore } from "../store/crud";
import ProductAdminForm from "../components/ProductAdminForm";
import { useScroll } from "../hooks/useScroll";
import { useFuseSearch } from "../hooks/useFuseSearch";
import { useSortedProducts } from "../hooks/useSortedData";
import SearchAndSort from "../components/SearchAndSort";

const Admin = () => {
	const { products, fetchProducts, deleteProduct, addProduct } =
		useProductsStore();

	const [searchItem, setSearchItem] = useState("");
	const [sortOption, setSortOption] = useState("");

	const [editingProduct, setEditingProduct] = useState(null);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const { formRef, scrollToForm, scrollToTop } = useScroll();

	const matchingProducts = useFuseSearch(products, searchItem, [
		"name",
		"category",
	]);

	const sortedProducts = useSortedProducts(matchingProducts, sortOption);

	return (
		<div className="admin-page">
			<h2>Admin Panel</h2>

			<SearchAndSort
				searchItem={searchItem}
				setSearchItem={setSearchItem}
				sortOption={sortOption}
				setSortOption={setSortOption}
				searchPlaceholder="Search products..."
			/>

			{/* PRODUCT LIST */}
			<div className="admin-products-list">
				{sortedProducts.map((p) => (
					<div key={p.id} className="admin-product-card">
						<div>
							<h2 className="admin-product-card-name">
								{p.name}
							</h2>
							<p className="admin-product-card-price">
								{p.price} kr
							</p>
						</div>

						<div className="admin-card-actions">
							<button
								onClick={() => {
									setEditingProduct(p);
									scrollToForm();
								}}
							>
								Edit
							</button>

							{/* // If form depends on state rendering first ( so DOM is updated before scrolling. ):
								// onClick={() => {
								// 	setEditingProduct(p);

								// 	setTimeout(() => {
								// 		scrollToForm();
								// 	}, 0);
								// }} */}

							<button
								onClick={() => {
									const confirmed = window.confirm(
										"Delete this product?",
									);

									if (confirmed) {
										deleteProduct(p.id);
									}
								}}
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>

			{/* <button
				onClick={ async () =>
					addProduct({
						id: "9",
						name: "Watermelon Pool Float",
						price: 219,
						category: "pool",
						image: "products/img9-watermelon-pool.webp",
						details:
							"Refreshing watermelon-inspired pool float with lightweight inflatable design perfect for sunny poolside afternoons.",
						stock: 0,
						featured: false,
						rating: 0,
					})
				}
			>
				Restore Product - rewrite in details
			</button> */}

			{/* FORM */}
			<div ref={formRef} className="admin-form">
				<h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

				<ProductAdminForm
					editingProduct={editingProduct}
					setEditingProduct={setEditingProduct}
				/>
			</div>

			<button className="scrollToTop" onClick={scrollToTop}>
				Back to top
			</button>
		</div>
	);
};

export default Admin;
