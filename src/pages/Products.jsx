import { useLoaderData } from "react-router";
import ProductItem from "../components/ProductItem";
import { useState, useMemo } from "react";
import Fuse from "fuse.js";
// import "./Products.css";

const Products = () => {
  // useLoaderData returnerar data av samma typ som loader-funktionen returnerar
  const products = useLoaderData();
  const [searchItem, setSearchItem] = useState("");

	const fuse = useMemo(() => {
		return new Fuse(products, { keys: ["name"], threshold: 0.4 });
	}, [products]);


  const matchingProducts = useMemo(() => {
    if (!searchItem) {
      return products;
    }
    const results = fuse.search(searchItem);

    return results.map((result) => result.item);
  }, [searchItem, fuse, products]);










  return (
    <div className="all-products">
      <h2> The floats: </h2>

      <div className="search">
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />{" "}
        🔍
      </div>

      <div className="product-list">
        {searchItem && matchingProducts.length === 0 && <p>No matches found</p>}

        {matchingProducts.map((i) => (
          <ProductItem key={i.id} item={i} />
        ))}
      </div>
    </div>
  );
};

export default Products;
