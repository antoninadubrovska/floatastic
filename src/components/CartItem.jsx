import { useCartStore } from "../store/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart, increaseQuantity, decreaseQuantity } =
		useCartStore();

	return (
		<div className="cart-item">
			<div className="cart-item-name-and-price">
				<h3 className="cart-item-name">{item.name}</h3>

				<p className="cart-item-price">{item.price} kr</p>
			</div>

			<div className="cart-buttons-and-quantity">
				<button onClick={() => increaseQuantity(item.id)}>+</button>

				<button onClick={() => decreaseQuantity(item.id)}>-</button>

				<button onClick={() => removeFromCart(item.id)}>Remove</button>
				<p className="cart-item-quantity"> Qty {item.quantity}</p>
			</div>

			<p>Subtotal: {item.price * item.quantity} kr</p>
		</div>

		// TODO: add a line
	);
};

export default CartItem;
