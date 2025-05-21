import API from "@services/API";
import { useEffect, useState } from "react";

const itemList = [
  {
    counter: 1,
    title: "9:35 발라또 퍼플 세럼",
    regularPrice: 57000,
    price: 57000,
    category: "cosmetics",
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161252037400.JPG",
      isAvailable: true,
  },
  {
    counter: 2,
    title: "9:35 발라또 퍼플 오일미스트",
    regularPrice: 66000,
    price: 66000,
    category: "cosmetics",
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161839810305.JPG",
      isAvailable: true,
  },
  {
    counter: 3,
    title: "9:35 발라또 퍼플 부스터",
    regularPrice: 42000,
    price: 42000,
    category: "cosmetics",
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161305601800.JPG",
      isAvailable: true,
  },
  {
    counter: 4,
    title: "9:35 화이트닝 토마토 미백앰플",
    regularPrice: 99000,
    price: 99000,
    category: "cosmetics",
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161806538376.JPG",
      isAvailable: true,
  },
  {
    counter: 5,
    title: "9시 35분 멀티비타민미네랄",
    regularPrice: 37000,
    price: 37000,
    category: "etc",
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161444331575.JPG",
      isAvailable: true,
  },
  {
    counter: 6,
    title: "9시 35분 콜라겐 파우더",
    regularPrice: 37000,
    price: 37000,
    category: "etc",
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161424180313.JPG",
    isAvailable: true,
  },
];

const category:ShopItemCategoryType[] = [{name: "all", counter: 1}, {name: "cosmetics", counter: 2}, {name: "etc", counter: 3}];

export default function useItems() {
  const [originItems, setOriginItems] = useState<ShopItemType[]>(); // 본 상품 리스트
  const [items, setItems] = useState<ShopItemType[]>(); // 수정되는 상품 리스트
  const [categories, setCategories] = useState<ShopItemCategoryType[]>(category); // 카테고리 리스트
  const itemsData = () => {
    const saleItems = itemList;
    setItems(saleItems);
    setOriginItems(saleItems);
    setCategories(categories);
  };

  useEffect(() => {
    itemsData();
  }, []);

  return { originItems, items, setItems, categories };
}
