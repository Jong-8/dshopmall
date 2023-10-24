import { create } from "zustand";
type Props = {
  token: string;
  user: ShopUserType;
  cartCount: number;
  setToken: (token: string, user: ShopUserType) => void;
  setCartCount: (cartCount: number) => void;
};
export const useToken = create<Props>((set, get) => ({
  token: "",
  user: {
    username: "",
    role: "",
    name: "",
    phone: "",
    email: "",
    mycode: "",
    code: "",
    profile: "",
    marketing: false,
    point: 0,
    deliveryInfo: {
      name: "",
      zipcode: "",
      address: "",
      detailed: "",
      phone: "",
      requests: "",
    },
  },
  cartCount: 0,
  setToken: (token: string, user: ShopUserType) => {
    set(() => ({ token, user }));
  },
  setCartCount: (cartCount: number) => {
    set(() => ({ cartCount }));
  },
}));
