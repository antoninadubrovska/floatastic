import { useLoaderData } from "react-router";
import ProductItem from "../components/ProductItem";
import { useState } from "react";
import { useFuseSearch } from "../hooks/useFuseSearch";

const Products = () => {
  // useLoaderData returnerar data av samma typ som loader-funktionen returnerar
  const products = useLoaderData();
  const [searchItem, setSearchItem] = useState("");



const matchingProducts = useFuseSearch(products, searchItem, ["name", "category"]);


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
