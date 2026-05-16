import { useProductsStore } from "../store/crud";

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



// const debugProduct = store.products.find(
// 	(p) => p.name === "Debug Float"
// );

// if (debugProduct) {
// 	await store.deleteProduct(debugProduct.id);
// }
};