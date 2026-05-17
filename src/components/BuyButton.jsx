import { useState } from "react";
import { useBuyNow } from "../hooks/useBuyNow";

const BuyButton = ({ item }) => {
	const buyNow = useBuyNow();
	const [added, setAdded] = useState(false);

	const handleClick = () => {
		buyNow(item);

		setAdded(true);
		setTimeout(() => {
			setAdded(false);
		}, 1200);
	};

	return (
		<button
			className={`buy-btn ${added ? "added" : ""}`}
			onClick={handleClick}
		>
			{added ? "Added!" : "Buy"}
		</button>
	);
};

export default BuyButton;
