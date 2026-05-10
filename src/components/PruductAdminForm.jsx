import { useEffect, useState } from "react";
import { useProductsStore } from "../store/useProductsStore";

const ProductForm = ({ editingProduct, setEditingProduct }) => {
	const { addProduct, updateProduct } = useProductsStore();

	const [formData, setFormData] = useState({
		name: "",
		price: "",
		category: "",
		image: "",
		details: "",
		stock: 0,
		featured: false,
		rating: 0,
	});

	// AUTO-FILL FORM WHEN EDITING
	useEffect(() => {
		if (editingProduct) {
			setFormData({
				name: editingProduct.name || "",
				price: editingProduct.price || "",
				category: editingProduct.category || "",
				image: editingProduct.image || "",
				details: editingProduct.details || "",
				stock: editingProduct.stock || 0,
				featured: editingProduct.featured || false,
				rating: editingProduct.rating || 0,
			});
		} else {
			setFormData({
				name: "",
				price: "",
				category: "",
				image: "",
				details: "",
				stock: 0,
				featured: false,
				rating: 0,
			});
		}
	}, [editingProduct]);

	// HANDLE INPUTS
	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const resetForm = () => {
		setEditingProduct(null);
	};

	// SUBMIT
	const handleSubmit = async (e) => {
		e.preventDefault();

		const productData = {
			...formData,
			price: Number(formData.price),
		};

		try {
			// EDIT MODE
			if (editingProduct) {
				console.log("UPDATING:", editingProduct.id, productData);
				await updateProduct(editingProduct.id, productData);
			}

			// ADD MODE
			else {
				await addProduct(productData);
			}

			resetForm();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="product-form">
			{/* <input
				type="number"
				name="id"
				placeholder="Product id"
				value={formData.id}
				onChange={handleChange}
				required
			/> */}

			<input
				type="text"
				name="name"
				placeholder="Product name"
				value={formData.name}
				onChange={handleChange}
				required
			/>

			<input
				type="number"
				name="price"
				placeholder="Price"
				value={formData.price}
				onChange={handleChange}
				required
			/>

			<input
				type="text"
				name="category"
				placeholder="Category"
				value={formData.category}
				onChange={handleChange}
				required
			/>

			<input
				type="text"
				name="image"
				placeholder="Image URL"
				value={formData.image}
				onChange={handleChange}
			/>

			<input
				type="text"
				name="details"
				placeholder="Product details"
				value={formData.details}
				onChange={handleChange}
			/>

			<input
				type="number"
				name="stock"
				placeholder="Stock"
				value={formData.stock}
				onChange={handleChange}
			/>

			{/* false */}
			<label>
				Featured Product
				<input
					type="checkbox"
					name="featured"
					checked={formData.featured}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							featured: e.target.checked,
						}))
					}
				/>
			</label>

			<input
				type="number"
				name="rating"
				placeholder="rating"
				value={formData.rating}
				onChange={handleChange}
			/>

			<button type="submit">
				{editingProduct ? "Update Product" : "Add Product"}
			</button>

			{editingProduct && (
				<button type="button" onClick={resetForm}>
					Cancel Edit
				</button>
			)}
		</form>
	);
};

export default ProductForm;


// TODO:
// price: Number(formData.price),
// stock: Number(formData.stock),
// rating: Number(formData.rating),
// (still stored as strings from inputs)
// inside productData.