import { create } from "zustand";
type Props = {
  cartItems: ShopCartType[];
  setCart: (cartItems: ShopCartType[]) => void;
};
export const useCart = create<Props>((set, get) => ({
  cartItems: [],
  setCart: (cartItems: ShopCartType[]) => {
    set(() => ({ cartItems }));
  },
}));
