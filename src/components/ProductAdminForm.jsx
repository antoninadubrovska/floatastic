import { useEffect, useState } from "react";
import { useProductsStore } from "../store/useProductsStore";
import { productSchema } from "../validations/productValidation";

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

	const [errors, setErrors] = useState({});

	const [successMessage, setSuccessMessage] = useState("");
	const [loading, setLoading] = useState(false);

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
		setErrors({});
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
		setErrors({});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setErrors({});
		setSuccessMessage("");
		setLoading(true);

		const productData = {
			...formData,
			price: formData.price === "" ? null : Number(formData.price),
			stock: formData.stock === "" ? null : Number(formData.stock),
			rating: formData.rating === "" ? null : Number(formData.rating),
		};

		const { error } = productSchema.validate(productData, {
			abortEarly: false,
			convert: true,
		});

		if (error) {
			console.log("VALIDATION ERROR:", error.details);

			const validationErrors = {};

			error.details.forEach((err) => {
				validationErrors[err.path[0]] = err.message;
			});

			setErrors(validationErrors);
			setLoading(false);
			return;
		}

		try {
			if (editingProduct) {
				await updateProduct(editingProduct.id, productData);
				setSuccessMessage("Product updated successfully");
			} else {
				await addProduct(productData);
				setSuccessMessage("Product created successfully");
			}

			resetForm();

			// auto-hide message after 2s
			setTimeout(() => {
				setSuccessMessage("");
			}, 2000);
		} catch (error) {
			console.error(error);
			setSuccessMessage("");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="product-form">
			<input
				type="text"
				name="name"
				placeholder="Product name"
				value={formData.name}
				onChange={handleChange}
				required
			/>
			{errors.name && <p className="error-message">{errors.name}</p>}

			<input
				type="number"
				name="price"
				placeholder="Price"
				value={formData.price}
				onChange={handleChange}
				required
			/>
			{errors.price && <p className="error-message">{errors.price}</p>}

			<input
				type="text"
				name="category"
				placeholder="Category"
				value={formData.category}
				onChange={handleChange}
				required
			/>
			{errors.category && (
				<p className="error-message">{errors.category}</p>
			)}

			<input
				type="text"
				name="image"
				placeholder="Image URL"
				value={formData.image}
				onChange={handleChange}
			/>
			{errors.image && <p className="error-message">{errors.image}</p>}

			<textarea
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
			{errors.stock && <p className="error-message">{errors.stock}</p>}

			{/* false */}
			<label>
				Featured
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
				placeholder="Rating"
				value={formData.rating}
				onChange={handleChange}
			/>
			{errors.rating && <p className="error-message">{errors.rating}</p>}

			<button type="submit">
				{editingProduct ? "Update Product" : "Add Product"}
			</button>

			{loading && <p className="info-message">Saving...</p>}

			{successMessage && (
				<p className="success-message">{successMessage}</p>
			)}

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
// const productData = {
// 	...formData,
// 	price: Number(formData.price),
// 	stock: Number(formData.stock),
// 	rating: Number(formData.rating),
// };