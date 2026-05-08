import { useCartStore } from "../store/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart, increaseQuantity, decreaseQuantity } =
		useCartStore();

	return (
		<div className="cart-item">
			<h3>{item.name}</h3>

			<p>{item.price} kr</p>

			<p>Quantity: {item.quantity}</p>

			<div className="cart-buttons">
				<button onClick={() => increaseQuantity(item.id)}>+</button>

				<button onClick={() => decreaseQuantity(item.id)}>-</button>

				<button onClick={() => removeFromCart(item.id)}>Remove</button>
			</div>

			<p>Subtotal: {item.price * item.quantity} kr</p>
		</div>
	);
};

export default CartItem;
