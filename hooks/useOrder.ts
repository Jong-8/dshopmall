import API from "@services/API";
import { store } from "@stores/index";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type optionProps = {
  optionDetailCounter: number;
  name: string | "";
  qty: number | 1;
  price: number | 0;
  itemPrice: number | 0;
  stock: number | 0;
};

type optionsProps = {
  optionCounter: number;
  selectOptions: optionProps[];
};

type buyItemProps = {
  counter: number;
  name: string;
  thumbnail: string;
  options: optionsProps;
};

export default function useOrder() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "buyItem",
    "buyItemsData",
  ]);
  const [myPoint, setMyPoint] = useState<number | undefined>(undefined);
  const [buyItems, setBuyItems] = useState<buyItemProps[]>();
  const [buyItemsData, setBuyItemsData] = useState<ShopPayItemType[]>();
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const auth = store.auth.useToken();

  const orderInit = () => {
    let totalItemsPrice = 0;
    let price = 0;
    cookies.buyItem.map((buyItem: buyItemProps) => {
      buyItem.options.selectOptions.map((option: optionProps) => {
        totalItemsPrice = totalItemsPrice + option.itemPrice * option?.qty;
      });
    });
    setBuyItems(cookies.buyItem);
    setBuyItemsData(cookies.buyItemsData);
    setTotalItemsPrice(totalItemsPrice);
    setTotalPrice(
      totalItemsPrice >= 100000 ? totalItemsPrice : totalItemsPrice + 3000
    );
  };

  useEffect(() => {
    orderInit();
    if (auth.token) {
      setMyPoint(auth.user.point);
    } else {
      setMyPoint(0);
    }
  }, []);

  return {
    buyItems,
    buyItemsData,
    totalItemsPrice,
    totalPrice,
    setTotalPrice,
    myPoint,
    auth,
  };
}
