
import { create } from "zustand";
import { db } from "../data/database";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const useProductsStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  unsubscribe: null, // To store the unsubscribe function

  // --- Read (Real-time with onSnapshot) ---
  fetchProducts: () => {
    set({ loading: true });
    try {
      const productsCollectionRef = collection(db, "products");

      // Attach a real-time listener
      const unsubscribe = onSnapshot(
        productsCollectionRef,
        (snapshot) => {
          const products = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          set({
            products,
            loading: false,
            error: null, // Clear any previous errors on successful fetch
          });
        },
        (error) => {
          console.error("Error listening to products:", error);
          set({ error, loading: false });
        }
      );

      // Store the unsubscribe function so it can be called later to stop listening
      set({ unsubscribe });
    } catch (error) {
      console.error("Error setting up product listener:", error);
      set({ error, loading: false });
    }
  },

  // --- Cleanup Listener ---
  // We might call this when your component unmounts or store is no longer needed
  stopFetchingProducts: () => {
    const { unsubscribe } = get();
    if (unsubscribe) {
      unsubscribe();
      set({ unsubscribe: null });
      console.log("Firestore products listener unsubscribed.");
    }
  },

  // --- Create ---
  addProduct: async (product) => {
    try {
      await addDoc(collection(db, "products"), product);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  },

  // --- Delete ---
  deleteProduct: async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },

  // --- Update ---
  updateProduct: async (id, updatedData) => {
    try {
      await updateDoc(doc(db, "products", id), updatedData);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  },
}));

