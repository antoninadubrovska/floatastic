import { useParams, useLoaderData, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";

const ProductDetails = () => {
	const { id } = useParams();
	const product = useLoaderData();
	const navigate = useNavigate();
	const item = product.find((i) => i.id === id);
	console.log("imagePath:", item?.image);

	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {

		//to prevent unnecessary Firebase call
		if (!item?.image) return;

		getImageUrl(item.image)
			//.then(setImageUrl)
			.then((url) => {
				console.log("Successfully fetched download URL:", url);
				setImageUrl(url);
			})
			//.catch(console.error);
			.catch((error) => {
				console.error("Error fetching download URL:", error);
			});


	}, [item?.image]);

	if (!item) {
		console.log("Couldn't find. ", id, product);
		console.log("id: ", typeof id);
		console.log("id2: ", product[2].id);
		return <div className="details"> Could not find the product. </div>;
	}

	const goBack = (event) => {
		event.preventDefault();
		navigate(-1);
	};

	return (
		<div className="product-details product-card">
			<img
				className="product-card-image"
				src={imageUrl || item?.image}
				alt={item.name}
			/>
			<h2 className="product-card-name">{item.name}</h2>
			<p className="product-card-price">{item.price} kr</p>
			<p className="product-card-description">{item.description}</p>
			<a className="link-go-back" href="/products" onClick={goBack}>
				Go Back
			</a>
		</div>
	);
};

export default ProductDetails;
