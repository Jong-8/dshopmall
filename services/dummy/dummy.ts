/* 상품 리스트 */
/* 메인의 전체 상품 리스트를 받아오는 api */
const itemList = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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

/* 카테고리 리스트 */
/* 메인의 카테고리 리스트를 받아오는 api */
const categories = ["all", "cosmetics", "etc"];

/* 선택옵션 리스트 */
/* 상품상세페이지에서 해당 상품의 선택옵션을 받아오는 api */
const selectOptions = [
  {
    id: 1, // 상품id
    options: [
      // 선택옵션 리스트
      {
        optionId: 1,
        title: "화장품명1",
        price: 54000,
        stock: 3,
      },
      {
        optionId: 2,
        title: "화장품명1 + 소량",
        price: 69000,
        stock: 2,
      },
    ],
  },
  {
    id: 2,
    options: [
      {
        optionId: 1,
        title: "화장품명2",
        price: 59000,
        stock: 4,
      },
      {
        optionId: 2,
        title: "화장품명2 기획",
        price: 89000,
        stock: 4,
      },
    ],
  },
  {
    id: 5,
    options: [
      {
        optionId: 1,
        title: "기타상품명1",
        price: 10000,
        stock: 2,
      },
      {
        optionId: 2,
        title: "기타상품명1 기획",
        price: 20000,
        stock: 2,
      },
    ],
  },
];

/* 카트에 담긴 상품리스트 */
/* 카트에 담긴 상품리스트를 받아오는 api - 회원ID로 셀렉 */
const cartItems = [
  {
    id: 1,
    title: "9:35 발라또 퍼플 세럼",
    price: 57000,
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161252037400.JPG",
    selectOption: {
      selectOptionTitle: "선택옵션",
      selectOptionName: "선택옵션2",
      selectOptionAddPrice: 1000,
    },
    qty: 1,
    stock: 3, // 선택옵션이 있으면 해당 선택옵션 재고, 없으면 상품 재고
  },
  {
    id: 2,
    title: "9:35 발라또 퍼플 오일미스트",
    price: 66000,
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161839810305.JPG",
    selectOption: {
      selectOptionTitle: "",
      selectOptionName: "",
      selectOptionAddPrice: 0,
    },
    qty: 1,
    stock: 4,
  },
];

export { itemList, categories, selectOptions, cartItems };
