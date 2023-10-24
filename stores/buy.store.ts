import { create } from "zustand";
type optionProps =
  | {
      optionDetailCounter: number;
      name: string | "";
      qty: number | 1;
      price: number | 0;
      stock: number | 0;
    }[]
  | undefined;
type Props = {
  item: {
    id?: number;
    name?: string;
    thumbnail?: string;
    options: optionProps;
  }[];
  setItem: (
    item: {
      id?: number;
      name?: string;
      thumbnail?: string;
      options: optionProps;
    }[]
  ) => void;
};
export const useBuy = create<Props>((set, get) => ({
  item: [{ id: 0, name: "", thumbnail: "", options: [] }],
  setItem: (
    item: {
      id?: number;
      name?: string;
      thumbnail?: string;
      options: optionProps;
    }[]
  ) => {
    set(() => ({ item }));
  },
}));
