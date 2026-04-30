import { useParams, useLoaderData, useNavigate, Link } from "react-router";
// import { useState } from "react";
// import "./ProductDetails.css";

const ProductDetails = () => {
	const { id } = useParams();
	const product = useLoaderData();
	const navigate = useNavigate();

	const item = product.find((p) => p.id == Number(id));
  if (!item) {
    console.log("Couldn't find. ", id, product);
    console.log('id: ', typeof id)
    console.log('id2: ', product[2].id)
    return <div className="details"> Could not find the product. </div>;
  }


const goBack = event => {
	event.preventDefault();
	navigate(-1);
}

return (
  <div className="product-details product-card">
    <h2>{item.name}</h2>
    <p className="product-card-price">{item.price.toFixed(2)} kr.</p>
    <p className="product-card-description">{item.description}</p>
    <a href="/products" onClick={goBack}>
      Go Back
    </a>
  </div>
);
}

export default ProductDetails;