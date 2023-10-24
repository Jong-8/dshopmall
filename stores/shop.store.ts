import { create } from "zustand";
type Props = {
  shopInfo: ShopInfoResponse;
  setShopInfo: (shopInfo: ShopInfoResponse) => void;
};
export const useShopInfo = create<Props>((set, get) => ({
  shopInfo: {
    company: "",
    ceo: "",
    manager: "",
    companyNumber: "",
    email: "",
    address: "",
    businessNumber: "",
    tel: "",
    operatingTime: "",
    lunchTime: "",
    policy: "",
    privacy: "",
    cancel: "",
    delivery: "",
    returnInfo: "",
  },
  setShopInfo: (shopInfo: ShopInfoResponse) => {
    set(() => ({ shopInfo }));
  },
}));
