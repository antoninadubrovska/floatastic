import { useCartStore } from "../store/useCartStore";
import { useProductImage } from "../hooks/useProductImage";

const CartItem = ({ item }) => {
	const { removeFromCart, increaseQuantity, decreaseQuantity } =
		useCartStore();
	const imageUrl = useProductImage(item?.image);

	return (
		<div className="cart-item-and-image">
			<img
				className="product-cart-image-preview"
				src={imageUrl || item.image}
				alt={item.name}
			/>
			<div className="cart-item">
				<div className="cart-item-name-and-price">
					<h3 className="cart-item-name">{item.name}</h3>

					<p className="cart-item-price">{item.price} kr</p>
				</div>

				<div className="cart-buttons-and-quantity">
					<div className="quantity-controls">
						<button onClick={() => decreaseQuantity(item.id)}>
							-
						</button>

						<p className="cart-item-quantity">
							{item.quantity}{" "}
							{item.quantity === 1 ? "Item" : "Items"}
						</p>

						<button onClick={() => increaseQuantity(item.id)}>
							+
						</button>
					</div>

					<button onClick={() => removeFromCart(item.id)}>
						Remove
					</button>
				</div>

				<p className="cart-item-subtotal">
					Subtotal: {item.price * item.quantity} kr
				</p>
			</div>
		</div>

		// TODO: add a line
	);
};

export default CartItem;
