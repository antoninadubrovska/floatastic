import { create } from "zustand";
import { db } from "../data/database";
import { collection, getDocs } from "firebase/firestore";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });

    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      set({ products, loading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ error, loading: false });
    }
  },
}));
