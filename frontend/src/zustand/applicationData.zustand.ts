import { create } from "zustand";

interface ApplicationDataType {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export const useApplicationData = create<ApplicationDataType>((set) => {
	return {
		isOpen: false,
		setIsOpen: (isOpen: boolean) => set({ isOpen }),
	};
});
