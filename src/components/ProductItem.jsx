import { Link } from "react-router";

const ProductItem = ({ item }) => (
  <div className="product-item card">
    <p>{item.name}</p>
    <p>{item.price} kr</p>
    <Link to={"/products/" + item.id}> Läs mer... </Link>
  </div>
);

export default ProductItem;
