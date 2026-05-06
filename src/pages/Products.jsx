import { useLoaderData } from "react-router";
import ProductItem from "../components/ProductItem";
import { useState } from "react";
import { useFuseSearch } from "../hooks/useFuseSearch";
// import './../styles/products.css'

const Products = () => {
  // useLoaderData returnerar data av samma typ som loader-funktionen returnerar
  const products = useLoaderData();
  const [searchItem, setSearchItem] = useState("");



const matchingProducts = useFuseSearch(products, searchItem, ["name", "category"]);


  return (
    <div className="products-page">
      <h2 className="products-h"> The floats </h2>

      <div className="search">
        <input
          type="text" placeholder="Search for a float..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />{" "}
        {/* 🔍 */}
      </div>

		  <div className="products-list">

        {searchItem && matchingProducts.length === 0 && <p>No matches found</p>}

        {matchingProducts.map((i) => (
          <ProductItem key={i.id} item={i} />
        ))}
      </div>
    </div>
  );
};

export default Products;
