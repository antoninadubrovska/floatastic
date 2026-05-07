import { useCartStore } from "../store/useCartStore";

const Cart = () => {
	const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
		useCartStore();

	const totalPrice = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);

	return (
		<div>
			<h2>Shopping Cart</h2>

			{cart.length === 0 && <p>Your cart is empty</p>}

			{cart.map((item) => (
				<div key={item.id}>
					<h3>{item.name}</h3>

					<p>{item.price} kr</p>

					<p>Quantity: {item.quantity}</p>

					<button onClick={() => increaseQuantity(item.id)}>+</button>

					<button onClick={() => decreaseQuantity(item.id)}>-</button>

					<button onClick={() => removeFromCart(item.id)}>
						Remove
					</button>
				</div>
			))}

			<h3>Total: {totalPrice} kr</h3>
		</div>
	);
};

export default Cart;

//TODO: buy more
//TODO: /cart path somewhere else