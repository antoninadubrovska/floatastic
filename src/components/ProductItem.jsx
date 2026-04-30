import { Link } from "react-router";

const ProductItem = ({ item }) => (
  <div className="product-item card">
    <p>{item.name}</p>
    <p>{item.price} kr</p>
    <Link to={"/products/" + item.id}> Read more... </Link>
  </div>
);

export default ProductItem;
