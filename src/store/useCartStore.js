import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
	persist(
		(set) => ({
			cart: [],
			addToCart: (product) =>
				set((state) => {
					const existingItem = state.cart.find(
						(item) => item.id === product.id,
					);

					// if already exists -> increase quantity
					if (existingItem) {
						return {
							cart: state.cart.map((item) =>
								item.id === product.id
									? { ...item, quantity: item.quantity + 1 }
									: item,
							),
						};
					}

					// otherwise add new item
					return {
						cart: [...state.cart, { ...product, quantity: 1 }],
					};
				}),

			removeFromCart: (id) =>
				set((state) => ({
					cart: state.cart.filter((item) => item.id !== id),
				})),

			increaseQuantity: (id) =>
				set((state) => ({
					cart: state.cart.map((item) =>
						item.id === id
							? { ...item, quantity: item.quantity + 1 }
							: item,
					),
				})),

			decreaseQuantity: (id) =>
				set((state) => ({
					cart: state.cart
						.map((item) =>
							item.id === id
								? { ...item, quantity: item.quantity - 1 }
								: item,
						)
						.filter((item) => item.quantity > 0),
				})),

				clearCart: () => set({ cart: [] }),
		}),
		{
			name: "cart-storage", // key in localStorage
		},
	),
);
