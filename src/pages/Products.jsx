import { useLoaderData } from "react-router";
import ProductItem from "../components/ProductItem";

const Products = () => {
  // useLoaderData returnerar data av samma typ som loader-funktionen returnerar
  const products = useLoaderData();

  return (
    <div className="all-products">
      <h2> The floats: </h2>
      <div className="product-list">
        {products.map((i) => (
          <ProductItem key={i.id} item={i} />
        ))}
      </div>
    </div>
  );
};

export default Products;