export const getCartTotalItems = (cart) => {
	return cart.reduce(
		(sum, item) => sum + item.quantity,
		0
	);
};

export const getCartTotalPrice = (cart) => {
	return cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
};