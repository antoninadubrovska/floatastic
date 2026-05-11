import { create } from "zustand";

export const useAuthStore = create((set) => ({
	user: null,

	setUser: (user) => set({ user }),
}));

// auth state listener
// Without this:
// refresh loses auth state in React
// Firebase keeps the session,
// BUT React needs to know about it.