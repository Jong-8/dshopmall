import API from "@services/API";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function useItem(counter: number) {
  const [item, setItem] = useState<ShopItemDetailType>();
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const router = useRouter();
  const [selectOptionList, setSelectOptionList] =
    useState<ShopItemSelectOptionType>();
  const [cookies, setCookie, removeCookie] = useCookies(["itemCounter"]);
  const [isStock, setIsStock] = useState(0);

  const totalStock = (arr: ShopItemSelectOptDetailType[]) => {
    let total = 0;
    arr.map((item) => {
      total += item.stock;
    });
    return total;
  };

  const itemData = async (counter: number) => {
    const res = await API.item.item(counter);
    if (res.statusCode === 2000) {
      setItem(res.result.item);
      if (res.result.selectOptions) {
        setIsSelect(true);
        setSelectOptionList(res.result.selectOptions);
        setIsStock(totalStock(res.result.selectOptions.options));
      } else {
        setIsStock(res.result.item.stock);
      }
      setCookie("itemCounter", counter, { path: "/" });
    } else {
      alert(res.message);
      router.back();
    }
  };

  useEffect(() => {
    if (cookies.itemCounter === counter) {
      itemData(cookies.itemCounter);
    } else {
      itemData(counter);
    }
  }, []);

  return { item, setItem, selectOptionList, isSelect, setIsSelect, isStock };
}
