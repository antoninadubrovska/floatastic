import { useNavigate } from "react-router";
import { useCartStore } from "../store/useCartStore";

export const useBuyNow = () => {
	const { addToCart } = useCartStore();
	const navigate = useNavigate();

	const buyNow = (item) => {
		addToCart(item);
		navigate("/cart");
	};

	return buyNow;
};