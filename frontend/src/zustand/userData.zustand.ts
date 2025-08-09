import { create } from "zustand";

export type user = {
	id: string;
	name: string;
	email: string;
	role: string;
	profileImage: string;
};

interface UserStore {
	user: user;
	setUser: (user: user) => void;
}

export const useUserStore = create<UserStore>((set) => ({
	user: {} as user,
	setUser: (user) => set({ user }),
}));
