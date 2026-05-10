import { create } from "zustand";
import { db } from "../data/database";
import { collection, getDocs, addDoc,
	deleteDoc,
	doc,
	updateDoc, } from "firebase/firestore";

export const useProductsStore = create((set, get) => ({
  products: [],
  loading: false,
	error: null,
	hasFetched: false,   // to store fetch only once, not every mount


	// read
		fetchProducts: async () => {
		// to store fetch only once ( prevents duplicate requests ) - made sence with zustand manual mutations instaed of when Zustand updates from Firestore snapshot
    //if (get().hasFetched) return;

    set({ loading: true });

		try {

      const snapshot = await getDocs(collection(db, "products"));

      const products = snapshot.docs.map((doc) => ({

		  //Firestore ID always wins
		  ...doc.data(),
		  id: doc.id,
      }));

		set({
			products,
			loading: false,
			//hasFetched: true, //  loaded
		});
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ error, loading: false });
    }
	},


	// Firestore update
	// refetch entire dataset
	// Zustand updates from Firestore snapshot - not manually mutations of Zustand state

	// create
	addProduct: async (product) => {
		try {
			await addDoc(collection(db, "products"), product);

			// refetch after crud
			await get().fetchProducts();

		} catch (error) {
			console.error('error adding product: ', error);
			}
	},

	// delete
	deleteProduct: async (id) => {
		try {
			await deleteDoc(doc(db, 'products', id))

			// refetch after crud
			await get().fetchProducts();

		} catch (error) {
			console.error('Error deleting product:', error)
		}
	},

	// update
	updateProduct: async (id, updatedData) => {
		try {
			await updateDoc(doc(db, 'products', id), updatedData)

			// refetch after crud
			await get().fetchProducts();

		} catch (error) {
			console.error('Error upating product:', error)
		}
	},



}));
