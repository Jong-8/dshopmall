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
]

export default function useSearch(search: string | string[] | undefined) {
  const [keyword, setKeyword] = useState<string | string[] | undefined>();
  const [keywordReset, setKeywordReset] = useState<boolean>();
  const [items, setItems] = useState<ShopItemType[]>();
  const searchItems = () => {
    const items = itemList.filter((item) => item.title.match(search as string));
    setItems(items);
    setKeyword(search);
    setKeywordReset(true);
  };

  useEffect(() => {
    searchItems();
  }, [search]);

  return { items, keyword, setKeyword, keywordReset, setKeywordReset };
}
