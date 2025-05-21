import API from "@services/API";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { itemList, selectOptions } from "@services/dummy/dummy";

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

  const itemData = (counter: number) => {
    //const res = await API.item.item(counter);
    //if (res.statusCode === 2000) {
    const item = itemList.filter((item) => item.counter === counter)[0];
    setItem(item);
    if (item.isSelectOption) {
      const selectOption = selectOptions.filter((item) => item.optionCounter === counter)[0];
      setIsSelect(true);
      setSelectOptionList(selectOption);
      setIsStock(totalStock(selectOption.options));
    } else {
      setIsStock(item.stock);
    }
    setCookie("itemCounter", counter, { path: "/" });
    //} else {
      //alert(res.message);
      //router.back();
    //}
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
