import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";
import { useProductsStore } from "../store/useProductsStore";

const ProductDetails = () => {
	const { id } = useParams();
	//const product = useLoaderData();
	const navigate = useNavigate();

	const { products, fetchProducts } = useProductsStore();

	//console.log("imagePath:", item?.image);

	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		fetchProducts();
	}, []);

	// find item after it exists
	const item = products.find((i) => i.id === id);

	useEffect(() => {
		//to prevent unnecessary Firebase call
		if (!item?.image) return;

		getImageUrl(item.image)
			.then(setImageUrl);

	}, [item?.image]);

	// loading guard
	if (!item) {
		return <div className="details"> Loading product...</div>;
	}

	return (
		<div className="product-details product-card">
			<img
				className="product-card-image"
				src={imageUrl || item.image}
				alt={item.name}
			/>
			<h2 className="product-card-name">{item.name}</h2>
			<p className="product-card-price">{item.price} kr</p>
			<p className="product-card-description">{item.description}</p>
			<a
				className="link-go-back"
				href="/products"
				onClick={(e) => {
					e.preventDefault();
					navigate(-1);
				}}
			>
				Go Back
			</a>
		</div>
	);
};

export default ProductDetails;
