import { useMemo } from "react";

export const useSortedProducts = (products, sortOption) => {
	return useMemo(() => {
		const sorted = [...products];

		switch (sortOption) {
			case "name-asc":
				return sorted.sort((a, b) =>
					a.name.localeCompare(b.name)
				);

			case "name-desc":
				return sorted.sort((a, b) =>
					b.name.localeCompare(a.name)
				);

			case "price-asc":
				return sorted.sort((a, b) =>
					a.price - b.price
				);

			case "price-desc":
				return sorted.sort((a, b) =>
					b.price - a.price
				);

			default:
				return sorted;
		}
	}, [products, sortOption]);
};