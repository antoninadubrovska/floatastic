import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router";
import CartItem from "../components/CartItem";
import { useNavigate } from 'react-router'
import { getCartTotalPrice } from "../utils/cartCounter";

const Cart = () => {
	const { cart, clearCart } = useCartStore();

	const totalPrice = getCartTotalPrice(cart);
	const navigate = useNavigate();



	return (
		<div className="cart-page">
			<h2>Shopping Cart</h2>

			{cart.length === 0 ? (
				<>
					<p>Your cart is empty</p>

					<Link className="continue-shopping-btn" to="/products">
						Back to floats
					</Link>
				</>
			) : (
				<>
					<div className="cart-items">
						{cart.map((item) => (
							<CartItem key={item.id} item={item} />
						))}
					</div>

					<div className="cart-summary">
						<h3>Total: {totalPrice} kr</h3>

						<div className="cart-actions">
							<Link
								className="continue-shopping-btn"
								to="/products"
							>
								Add more floats
							</Link>

							<button
								className="pay-btn"
								onClick={() => {
									clearCart();
									navigate("/checkout-success");
								}}
							>
								Pay
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;

