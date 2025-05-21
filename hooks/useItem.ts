import API from "@services/API";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

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

const selectOptions = [
  {
    optionCounter: 1, // 상품id
    options: [
      // 선택옵션 리스트
      {
        optionDetailCounter: 1,
        title: "화장품명1",
        price: 54000,
        stock: 3,
      },
      {
        optionDetailCounter: 2,
        title: "화장품명1 + 소량",
        price: 69000,
        stock: 2,
      },
    ],
  },
  {
    optionCounter: 2,
    options: [
      {
        optionDetailCounter: 1,
        title: "화장품명2",
        price: 59000,
        stock: 4,
      },
      {
        optionDetailCounter: 2,
        title: "화장품명2 기획",
        price: 89000,
        stock: 4,
      },
    ],
  },
  {
    optionCounter: 5,
    options: [
      {
        optionDetailCounter: 1,
        title: "기타상품명1",
        price: 10000,
        stock: 2,
      },
      {
        optionDetailCounter: 2,
        title: "기타상품명1 기획",
        price: 20000,
        stock: 2,
      },
    ],
  },
];

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
