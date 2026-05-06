import { create } from "zustand";
import { db } from "../data/database";
import { collection, getDocs } from "firebase/firestore";

export const useProductsStore = create((set, get) => ({
  products: [],
  loading: false,
	error: null,
	hasFetched: false,   // to store fetch only once, not every mount

	fetchProducts: async () => {
		// to store fetch only once ( prevents duplicate requests )
    if (get().hasFetched) return;

    set({ loading: true });

		try {
		// ?
      const snapshot = await getDocs(collection(db, "products"));

      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

		set({
			products,
			loading: false,
			hasFetched: true, //  loaded
		});
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ error, loading: false });
    }
  },
}));
