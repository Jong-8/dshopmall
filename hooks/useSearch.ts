import API from "@services/API";
import { useEffect, useState } from "react";


const itemList = [
  {
    counter: 1,
    title: "9:35 발라또 퍼플 세럼",
    price: 57000,
    category: "cosmetics",
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161252037400.JPG",
    stock: 3,
    isSelectOption: true,
    images: [
      "https://www.935.co.kr/upload/product/thumb_20230418161252037400.JPG",
      "https://www.935.co.kr/upload/product/thumb_20221220131452063268.JPEG",
    ],
    description:
      '<img src="https://www.935.co.kr/upload/product/20230526160302415015.JPG" alt="9:35 발라또 퍼플 세럼 설명" />',
  },
  {
    counter: 2,
    title: "9:35 발라또 퍼플 오일미스트",
    price: 66000,
    category: "cosmetics",
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161839810305.JPG",
    stock: 4,
    isSelectOption: true,
    images: [
      "https://www.935.co.kr/upload/product/thumb_20230418161839810305.JPG",
      "https://www.935.co.kr/upload/product/thumb_20221220131600687051.JPEG",
    ],
    description:
      '<img src="https://www.935.co.kr/upload/product/20230526160813261200.JPG" alt="9:35 발라또 퍼플 오일미스트 설명" />',
  },
  {
    counter: 3,
    title: "9:35 발라또 퍼플 부스터",
    price: 42000,
    category: "cosmetics",
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161305601800.JPG",
    stock: 99,
    isSelectOption: false,
    images: [
      "https://www.935.co.kr/upload/product/thumb_20230418161305601800.JPG",
      "https://www.935.co.kr/upload/product/thumb_20221220131513850221.JPEG",
    ],
    description:
      '<img src="https://www.935.co.kr/upload/product/20230526160320124504.JPG" alt="9:35 발라또 퍼플 부스터 설명" />',
  },
  {
    counter: 4,
    title: "9:35 화이트닝 토마토 미백앰플",
    price: 99000,
    category: "cosmetics",
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161806538376.JPG",
    stock: 10,
    isSelectOption: false,
    images: [
      "https://www.935.co.kr/upload/product/thumb_20230418161806538376.JPG",
      "https://www.935.co.kr/upload/product/thumb_20221220131536802048.JPEG",
    ],
    description:
      '<img src="https://www.935.co.kr/upload/product/20230526160727534524.JPG" alt="9:35 화이트닝 토마토 미백앰플 설명" />',
  },
  {
    counter: 5,
    title: "9시 35분 멀티비타민미네랄",
    price: 37000,
    category: "etc",
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161444331575.JPG",
    stock: 8,
    isSelectOption: true,
    images: [
      "https://www.935.co.kr/upload/product/thumb_20230418161444331575.JPG",
      "https://www.935.co.kr/upload/product/thumb_20221220132044045458.JPEG",
    ],
    description:
      '<img src="https://www.935.co.kr/upload/product/20230403090441144670.JPG" alt="9:35 멀티비타민미네랄 설명" />',
  },
  {
    counter: 6,
    title: "9시 35분 콜라겐 파우더",
    price: 37000,
    category: "etc",
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161424180313.JPG",
    stock: 2,
    isSelectOption: false,
    images: [
      "https://www.935.co.kr/upload/product/thumb_20230418161424180313.JPG",
      "https://www.935.co.kr/upload/product/thumb_20221220131953814146.JPEG",
    ],
    description:
      '<img src="https://www.935.co.kr/upload/product/20230403090414060818.JPG" alt="9:35 콜라겐 파우더 설명" />',
  },
];

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
