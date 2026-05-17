
import { useEffect, useState } from "react";
import { useProductsStore } from "../store/crud";
import { productSchema } from "../validations/productValidation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../data/database";



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

	const [uploading, setUploading] = useState(false);

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setUploading(true);

		try {
			const storageRef = ref(storage, `products/${file.name}`);

			await uploadBytes(storageRef, file);

			const url = await getDownloadURL(storageRef);

			setFormData((prev) => ({
				...prev,
				image: url,
			}));
		} catch (error) {
			console.error(error);
		} finally {
			setUploading(false);
		}
	};

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
		const { name, value, type, checked } = e.target;

		setFormData((prev) => {
			let newValue;

			if (type === "checkbox") {
				newValue = checked;
			} else if (
				name === "price" ||
				name === "stock" ||
				name === "rating"
			) {
				newValue = value === "" ? "" : Number(value);
			} else {
				newValue = value;
			}

			return {
				...prev,
				[name]: newValue,
			};
		});
	};

	const resetForm = () => {
		setEditingProduct(null);
		setErrors({});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (uploading) return;

		setErrors({});
		setSuccessMessage("");
		setLoading(true);

		const productData = {
			...formData,
			price: formData.price === "" ? null : formData.price,
			stock: formData.stock === "" ? null : formData.stock,
			rating: formData.rating === "" ? null : formData.rating,
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
			<div className="input-wrapper">
				<input
					type="text"
					name="name"
					placeholder="Product name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
				{errors.name && <p className="error-message">{errors.name}</p>}
				<span className="required-star">*</span>
			</div>

			<div className="input-wrapper">
				<input
					type="number"
					name="price"
					placeholder="Price"
					value={formData.price}
					onChange={handleChange}
					required
				/>
				{errors.price && (
					<p className="error-message">{errors.price}</p>
				)}
				<span className="required-star">*</span>
			</div>

			<div className="input-wrapper">
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
				<span className="required-star">*</span>
			</div>

			<input
				type="file"
				accept="image/*"
				onChange={handleImageUpload}
				className="file-input"
			/>
			{/* <input
				type="text"
				name="image"
				placeholder="Image URL"
				value={formData.image}
				onChange={handleChange}
			/> */}
			{errors.image && <p className="error-message">{errors.image}</p>}

			<textarea
				name="details"
				placeholder="Product details"
				value={formData.details}
				onChange={handleChange}
			/>

			{/* TODO: make sure stock number cannot be negative */}

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

			<button type="submit" disabled={loading || uploading}>
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