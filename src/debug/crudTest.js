import { useProductsStore } from "../store/useProductsStore";

// temporary debug script

export const runCrudTest = async () => {
	const store = useProductsStore.getState();

	console.log("FETCH");
	await store.fetchProducts();

	console.log("ADD");
	await store.addProduct({
		name: "Debug Float",
		price: 50,
		category: "Debug",
	});

	console.log("DONE");
};