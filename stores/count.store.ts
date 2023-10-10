import {create} from "zustand";
type Props = {
  count: number;
  setCount: (count: number) => void;
};
export const useCount = create<Props>((set, get) => ({
  count: 0,
  setCount: (count: number) => {
    set(() => ({ count }));
  },
}));
