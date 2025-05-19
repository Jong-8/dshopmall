import API from "@services/API";
import { useEffect, useState } from "react";

export default function useItems() {
  const [originItems, setOriginItems] = useState<ShopItemType[]>(); // 본 상품 리스트
  const [items, setItems] = useState<ShopItemType[]>(); // 수정되는 상품 리스트
  const [categories, setCategories] = useState<ShopItemCategoryType[]>(); // 카테고리 리스트
  const itemsData = async () => {
    const res = await API.item.items();
    if (res.statusCode === 2000) {
      const saleItems = res.result.item.filter((item) => {
        return item.isAvailable;
      });
      setItems(saleItems);
      setOriginItems(saleItems);
      setCategories(res.result.category);
    } else alert(res.message);
  };

  useEffect(() => {
    itemsData();
  }, []);

  return { originItems, items, setItems, categories };
}
