import ContentLayout from "@components/Layout/ContentLayout";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
import { itemList, selectOptions } from "../services/dummy/dummy";
import Button from "@components/Member/Button";
import Link from "next/link";
import ProductQtyBox from "@components/Main/ProductQtyBox";
import { BsChevronDown } from "react-icons/bs";

export default function Item() {
  const [item, setItem] = useState<
    | {
        id: number;
        title: string;
        price: number;
        thumbnailUrl: string;
        stock: number;
        isSelectOption: boolean;
        images: string[];
        description: string;
      }
    | undefined
  >();
  const [qty, setQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSelect, setIsSelect] = useState(false);
  const [selectOptionList, setSelectOptionList] = useState<
    | {
        optionId: number;
        title: string;
        price: number;
        stock: number;
      }[]
    | undefined
  >();
  const [selectedOptions, setSelectedOptions] = useState<
    {
      optionId: number;
      name: string | "";
      qty: number | 1;
      price: number | 0;
      stock: number | 0;
    }[]
  >([
    {
      optionId: 0,
      name: "",
      qty: 1,
      price: 0,
      stock: 0,
    },
  ]);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [cancelBox, setCancelBox] = useState(false);
  const [deliveryBox, setDeliveryBox] = useState(false);
  const [returnBox, setReturnBox] = useState(false);
  const router = useRouter();
  const [mainThumbnail, setMainThumbnail] = useState("");

  useEffect(() => {
    //if (item) return;
    //axios
    //  .get(`https://jsonplaceholder.typicode.com/photos/${router.query.id}`)
    //  .then((res) => {
    //    //console.log(res.data);
    //    setItem(res.data);
    //  });
    // 상품 선택 - API에서 가지고 오는 걸로 변경
    const itemInfo = itemList.find((item) => {
      return item.id === Number(router.query.id);
    });
    // 아이템 정보가 있으면
    if (itemInfo) {
      // 아이템 설정
      setItem(itemInfo);
      // 아이템 선택옵션이 없으면 수량 1개, 총 상품 금액, 수량선택 버튼 설정 및 노출
      if (!itemInfo.isSelectOption) {
        setQty(1);
        setTotalPrice(itemInfo.price);
        setIsSelect(true);
        setSelectedOptions([
          {
            optionId: 0,
            name: itemInfo?.title ?? "",
            qty: 1,
            price: itemInfo?.price ?? 0,
            stock: itemInfo?.stock ?? 0,
          },
        ]);
      }
      // 아이템 대표 이미지
      setMainThumbnail(itemInfo.thumbnailUrl);
    }
    // 해당 상품 선택옵션 가져오기
    const selectList = selectOptions.find((selectOption) => {
      return selectOption.id === Number(router.query.id);
    });
    // 상품 선택옵션이 있으면 선택옵션 리스트 설정
    if (selectList) {
      setSelectOptionList(selectList.options);
    }
  }, []);

  const onImgClick = (url: string) => {
    setMainThumbnail(url);
  };

  const onOptionBtnClick = () => {
    setOpen(!open);
  };

  const checkQty = (array: { qty: number }[]) => {
    let totalQty = 0;
    array?.map((option) => {
      totalQty += option.qty;
    });
    return totalQty;
  };

  const checkTotalPrice = (array: { qty: number; price: number }[]) => {
    let totalPrice = 0;
    array?.map((option) => {
      totalPrice += option.price * option.qty;
    });
    return totalPrice;
  };

  const onSelectOptionClick = (id: number) => {
    let isOption = false;
    let overStock = false;
    let nextQty = 0;
    let selectedOption = { optionId: 0, name: "", price: 0, qty: 0, stock: 0 };
    let selected = [
      {
        optionId: 0,
        name: "",
        price: 0,
        qty: 0,
        stock: 0,
      },
    ];
    // 선택한 옵션이 존재하는지 확인
    selected = selectedOptions?.map((selectedOption) => {
      if (selectedOption.optionId === id) {
        // 선택한 옵션이 이미 있을때 isOption = true로 변경
        isOption = true;
        // 선택한 옵션의 수량 + 1
        nextQty = selectedOption.qty + 1;
        // 선택한 옵션의 잔고보다 선택 수량 + 1이 클때 => 옵션 그대로 유지, overStock = true로 변경
        if (nextQty > (selectedOption.stock ?? 0)) {
          overStock = true;
          return selectedOption;
        } else {
          return { ...selectedOption, qty: nextQty };
        }
      } else {
        // 없으면 그대로
        return selectedOption;
      }
    });

    if (!isOption) {
      // 선택한 옵션이 없을때
      const option = selectOptionList?.find((selectOption) => {
        return selectOption.optionId === id;
      });
      // 선택한 옵션의 수량 = 1
      nextQty = 1;
      selectedOption = {
        optionId: option?.optionId ?? 0,
        name: option?.title ?? "",
        price: option?.price ?? 0,
        qty: nextQty,
        stock: option?.stock ?? 0,
      };
      selected = [...selectedOptions, selectedOption];
      // 선택된 옵션 추가
      setSelectedOptions(selected);
      // 선택된 옵션이 없었다면 선택 옵션 버튼 창 true
      selectedOptions.length === 0 && setIsSelect(true);
    } else {
      // 선택한 옵션이 있으면 수량 +1 해서 선택 옵션 변경
      setSelectedOptions(selected);
      // 선택한 옵션의 재고가 부족할때 알림창
      overStock && alert("재고가 부족합니다.");
    }

    // 총 주문 수량
    const totalQty = checkQty(selected);
    setQty(totalQty);

    // 총 상품 금액
    const totalPrice = checkTotalPrice(selected);
    setTotalPrice(totalPrice);

    // 옵션창 닫기
    setOpen(false);
  };

  const onQtyChange = (e: { target: { value: string } }, id: number) => {
    let overStock = false;
    const value = Number(e.target.value);
    if (value > 0) {
      const newSelectedOptions = selectedOptions.map((selectedOption) => {
        if (selectedOption.optionId === Number(id)) {
          if (selectedOption.stock && selectedOption.stock < value) {
            // 바뀐 수량이 재고보다 많으면
            overStock = true;
            return selectedOption;
          } else {
            return { ...selectedOption, qty: value };
          }
        } else {
          return selectedOption;
        }
      });
      setSelectedOptions(newSelectedOptions);
      // 선택한 옵션의 재고가 부족할때 알림창
      overStock && alert("재고가 부족합니다.");

      // 총 주문 수량
      const totalQty = checkQty(newSelectedOptions);
      setQty(totalQty);

      // 총 상품 금액
      const totalPrice = checkTotalPrice(newSelectedOptions);
      setTotalPrice(totalPrice);
    }
  };

  const onMinusClick = (id: number) => {
    let overStock = false;
    const newSelectedOptions = selectedOptions.map((selectedOption) => {
      if (selectedOption.optionId === Number(id)) {
        const value = selectedOption.qty - 1;
        if (value > 0) {
          return { ...selectedOption, qty: value };
        } else {
          return selectedOption;
        }
      } else {
        return selectedOption;
      }
    });
    setSelectedOptions(newSelectedOptions);

    // 총 주문 수량
    const totalQty = checkQty(newSelectedOptions);
    setQty(totalQty);

    // 총 상품 금액
    const totalPrice = checkTotalPrice(newSelectedOptions);
    setTotalPrice(totalPrice);
  };

  const onPlusClick = (id: number) => {
    let overStock = false;
    const newSelectedOptions = selectedOptions.map((selectedOption) => {
      if (selectedOption.optionId === Number(id)) {
        const value = selectedOption.qty + 1;
        if (selectedOption.stock < value) {
          // 바뀐 수량이 재고보다 많으면
          overStock = true;
          return selectedOption;
        } else {
          return { ...selectedOption, qty: value };
        }
      } else {
        return selectedOption;
      }
    });
    setSelectedOptions(newSelectedOptions);
    // 선택한 옵션의 재고가 부족할때 알림창
    overStock && alert("재고가 부족합니다.");

    // 총 주문 수량
    const totalQty = checkQty(newSelectedOptions);
    setQty(totalQty);

    // 총 상품 금액
    const totalPrice = checkTotalPrice(newSelectedOptions);
    setTotalPrice(totalPrice);
  };

  const onDeleteClick = (id: number) => {
    const newSelectedOptions = selectedOptions.filter((selectedOption) => {
      return selectedOption.optionId !== Number(id);
    });
    setSelectedOptions(newSelectedOptions);

    // 총 주문 수량
    const totalQty = checkQty(newSelectedOptions);
    setQty(totalQty);
    totalQty === 0 && setIsSelect(false);

    // 총 상품 금액
    const totalPrice = checkTotalPrice(newSelectedOptions);
    setTotalPrice(totalPrice);
  };

  const onTabClick = (num: number) => {
    setTab(num);
  };

  const onCancelBoxClick = () => {
    setCancelBox(!cancelBox);
  };

  const onDeliveryBoxClick = () => {
    setDeliveryBox(!deliveryBox);
  };

  const onReturnBoxClick = () => {
    setReturnBox(!returnBox);
  };

  const onItemSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //const { buy, cart } = e.target.elements;
  };
  return (
    <div>
      {item && (
        <>
          <Header title={item.title} description={item.title} />
          <ContentLayout>
            <div className="pt-[60px] px-5 pb-[70px]">
              <div className="px-4">
                <div className="flex justify-between">
                  {/* 제품 이미지 */}
                  <div className="w-[55%]">
                    <div className="w-[100%] pt-[100%] relative mb-5">
                      <img
                        src={mainThumbnail}
                        alt={item.title}
                        className="w-[100%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-5">
                      {item.images &&
                        item.images.map((image: string, index: number) => (
                          <div
                            key={index}
                            className="cursor-pointer"
                            onClick={() => onImgClick(image)}
                          >
                            <img
                              src={image}
                              alt={item.title}
                              className="w-[100%]"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                  {/* 상품 설명 */}
                  <div className="w-[40%]">
                    <form action="" onSubmit={onItemSubmit}>
                      {/* 상품명 */}
                      <div className="text-[38px] leading-[1.2em] mb-4 break-keep">
                        {item.title}
                      </div>
                      {/* 상품 가격 */}
                      <div className="text-[22px] mb-8">
                        {item.price && item.price.toLocaleString()}원
                      </div>
                      {/* 배송비 */}
                      <div className="mb-6">
                        <dl className="flex text-[13px]">
                          <dt className="w-[90px] font-bold">배송비</dt>
                          <dd>
                            3,000원 (100,000원 이상 구매 시 무료)
                            <br /> 제주 및 도서 산간 3,000원 추가
                          </dd>
                        </dl>
                      </div>
                      {/* 선택 옵션 */}
                      {item.isSelectOption && (
                        <div className="pb-6 relative">
                          <div
                            className={`flex border px-5 py-3 ${
                              open
                                ? "rounded-t-md border-[#7862a2] text-[#7862a2]"
                                : "rounded-md border-[#bbb]"
                            } justify-between items-center cursor-pointer text-sm relative z-10`}
                            onClick={onOptionBtnClick}
                          >
                            <div>선택옵션</div>
                            <div className={` ${open && "rotate-180"}`}>
                              <BsChevronDown />
                            </div>
                          </div>
                          {open && (
                            <div className="border border-[#bbb] px-5 py-2 rounded-b-md absolute bg-white w-[100%] text-sm mt-[-1px]">
                              {selectOptionList &&
                                selectOptionList.map((selectOption) => (
                                  <div
                                    key={selectOption.optionId}
                                    onClick={() =>
                                      selectOption.stock > 0
                                        ? onSelectOptionClick(
                                            selectOption.optionId
                                          )
                                        : undefined
                                    }
                                    className={`cursor-pointer flex py-2 justify-between ${
                                      selectOption.stock === 0 && "opacity-40"
                                    }`}
                                  >
                                    <div>{selectOption.title}</div>
                                    <div>
                                      {selectOption.price.toLocaleString()}원
                                    </div>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      )}
                      {/* 수량 */}
                      {/* 아이템 정보에서 선택옵션 선택시 노출 */}
                      {isSelect && (
                        <div className="border-t border-[#dfdfdf]">
                          <div className="py-4">
                            {selectedOptions.length > 0 &&
                              selectedOptions.map((selectedOption, index) => (
                                <ProductQtyBox
                                  item={selectedOption}
                                  qty={selectedOption.qty}
                                  onQtyChange={(e) =>
                                    onQtyChange(e, selectedOption.optionId)
                                  }
                                  onMinusClick={() =>
                                    onMinusClick(selectedOption.optionId)
                                  }
                                  onPlusClick={() =>
                                    onPlusClick(selectedOption.optionId)
                                  }
                                  onDeleteClick={() =>
                                    onDeleteClick(selectedOption.optionId)
                                  }
                                  key={index}
                                />
                              ))}
                          </div>
                        </div>
                      )}
                      {/* 최종 가격 */}
                      <div className="border-t border-[#dfdfdf]">
                        <dl className="flex flex-wrap py-10 text-[15px] items-center leading-6">
                          <dt className="w-[30%] mb-[1.2em] font-bold">
                            주문 수량
                          </dt>
                          <dd className="w-[70%] mb-[1.2em] text-right">
                            {qty.toLocaleString()} 개
                          </dd>
                          <dt className="w-[30%] font-bold">총 상품 금액</dt>
                          <dd className="w-[70%] text-right text-sm">
                            <strong className="text-[#7862a2] text-[17px]">
                              {totalPrice.toLocaleString()}{" "}
                            </strong>
                            원
                          </dd>
                        </dl>
                      </div>
                      {/* 버튼 */}
                      <div className="flex">
                        <div className="mr-5">
                          <Link href={`/order/${item.id}`}>
                            <a>
                              <Button
                                text="구매하기"
                                type=""
                                width="w-[160px]"
                                name="buy"
                              />
                            </a>
                          </Link>
                        </div>
                        <div>
                          <Button
                            text="장바구니에 담기"
                            type="submit"
                            width="w-[160px]"
                            theme="white"
                            name="cart"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="pt-10">
                  <div className="flex">
                    <div
                      className={`w-[50%] text-lg py-4 text-center cursor-pointer ${
                        tab === 0
                          ? "border-b-[2px] border-b-[#7862a2] opacity-100"
                          : "border-b border-b-[#999] opacity-40"
                      }`}
                      onClick={() => onTabClick(0)}
                    >
                      상품정보
                    </div>
                    <div
                      className={`w-[50%] text-lg py-4 text-center cursor-pointer ${
                        tab === 1
                          ? "border-b-[2px] border-b-[#7862a2] opacity-100"
                          : "border-b border-b-[#999] opacity-40"
                      }`}
                      onClick={() => onTabClick(1)}
                    >
                      배송/반품/교환
                    </div>
                  </div>
                  <div className="py-[40px]">
                    {tab === 0 ? (
                      <div className="flex justify-center">
                        <div
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    ) : (
                      <div className="border-t-[2px] border-t-[#aeaeae] border-b-[2px] border-b-[#aeaeae]">
                        <div>
                          <div
                            className="px-7 py-6 flex justify-between items-center font-semibold cursor-pointer"
                            onClick={onCancelBoxClick}
                          >
                            <div>주문취소</div>
                            <div
                              className={`${
                                cancelBox && "rotate-180"
                              } ease-in-out`}
                            >
                              <BsChevronDown />
                            </div>
                          </div>
                          <div
                            className={`${
                              cancelBox
                                ? "h-[auto] border-t border-t-[#e0e0e0]"
                                : "h-[0]"
                            } overflow-hidden px-7 bg-[#fbfbfb] leading-8 tracking-tighter`}
                          >
                            <div className="py-5">
                              <div className="">1. 주문취소 가능시점</div>
                              <div className="text-[#888]">
                                회원은 상품 주문 및 결제 완료 후 주문을 취소할
                                수 있습니다. <br />
                                단, 주문취소는 결제완료 상태일 때만 가능합니다.
                                배송준비중, 배송중에는 상품 수령 후 반품 절차를
                                따라야합니다.
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div
                            className="border-t border-t-[#e0e0e0] px-7 py-6 flex justify-between items-center font-semibold cursor-pointer"
                            onClick={onDeliveryBoxClick}
                          >
                            <div>배송안내</div>
                            <div className={`${deliveryBox && "rotate-180"}`}>
                              <BsChevronDown />
                            </div>
                          </div>
                          <div
                            className={`${
                              deliveryBox
                                ? "h-[auto] border-t border-t-[#e0e0e0]"
                                : "h-[0]"
                            } overflow-hidden px-7 bg-[#fbfbfb] leading-8 tracking-tighter`}
                          >
                            <div className="py-5">
                              <div>1. 배송업체</div>
                              <div className="text-[#888]">CJ 대한통운</div>
                              <div>2. 배송비</div>
                              <div className="text-[#888]">
                                ① 주문 상품 기준 50,000원 이상 구매 시 무료배송
                                <br />
                                ② 주문 상품 기준 50,000원 미만 주문 시 3,000원
                                배송비 부과 (도서산간 지역 추가비용 없음)
                                <br />※ 기본 배송비는 변경될 수 있으며 변경될
                                경우 회사는 상품 대금 결제 시 이를 안내해
                                드립니다.
                              </div>
                              <div>3. 배송기간 </div>
                              <div className="text-[#888]">
                                ① 주문하신 상품이 오후 4시 이전 결제 완료된 경우
                                당일 발송되며, 오후 4시 이후 결제 완료된 경우
                                영업일 기준 익일에 발송됩니다. <br />
                                단, 회사의 상품 발송 후 2~3일 정도의 배송 기간이
                                소요되며 택배사의 물류 사정에 따라 지연될 수
                                있습니다. <br />
                                ② 월 말이나 월초, 연휴 기간의 주문이거나
                                배송지가 도서, 오지, 산간 지역일 경우 2~3일 정도
                                배송이 지연될 수 있습니다. <br />
                                ③ 토, 일요일 주문 건은 월요일에 발송 처리되오니
                                주문 시 참고 부탁드립니다. <br />
                                ④ 상품 중 스프레이류, 방향제, 염모제는 항공 운송
                                상 안전 상의 이유로 항공 운송 거부 품목에
                                해당되며, 제주 및 도서 지역은 배편을 이용하여
                                배송되며, <br />
                                배송 기간이 추가될 수 있습니다.
                                <br />⑤ 군부대 및 민간인 출입이 제한되는 지역은
                                택배 수령이 불가한 경우가 있으니 주문 시 참조해
                                주십시오.
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div
                            className="border-t border-t-[#e0e0e0] px-7 py-6 flex justify-between items-center font-semibold cursor-pointer"
                            onClick={onReturnBoxClick}
                          >
                            <div>반품안내</div>
                            <div className={`${returnBox && "rotate-180"}`}>
                              <BsChevronDown />
                            </div>
                          </div>
                          <div
                            className={`${
                              returnBox
                                ? "h-[auto] border-t border-t-[#e0e0e0]"
                                : "h-[0]"
                            } overflow-hidden px-7 bg-[#fbfbfb] leading-8 tracking-tighter`}
                          >
                            <div className="py-5">
                              <div>1. 반품 기준</div>
                              <div className="text-[#888]">
                                ① 미개봉, 미사용 상태(QR 스티커가 뜯어지지 않은
                                상태)의 손상 및 변질이 없는 상품만 반품이
                                가능하며 사용하신 상품은 반품이 일체 허용되지
                                않습니다.
                                <br />
                                ② 키트, 프로모션, 패키지 상품을 반품하는 경우,
                                또는 사은품이 함께 지급되는 상품을 반품하는
                                경우, 주문한 상품 외에 함께 제공된 증정 상품 및
                                사은품 등을
                                <br />
                                포함하여 배송 받은 모든 내용물을 반환하여야
                                합니다.{" "}
                              </div>
                              <div>2. 반품 시 제한 사항</div>
                              <div className="text-[#888]">
                                ① 구매자의 책임있는 사유로 상품등이 멸실 또는
                                훼손된 경우
                                <br />
                                ② 단순 변심의 사유로 상품 인도일로 부터 14일이
                                경과한 경우
                                <br />
                                ③ 상품 인수 시 포함되어 있던 사은품, 추가 제공
                                물품등이 누락되거나 파손, 사용된 경우
                                <br />
                                ④ 구매자의 사용 또는 일부 소비에 의하여 제품의
                                가치가 감소한 경우
                                <br />
                                ⑤ 포장을 개봉 하였거나 포장이 훼손되어 상품
                                가치가 현저히 상실된 경우
                                <br />⑥ 시간이 경과되어 재판매가 곤란할 정도로
                                상품의 가치가 상실된 경우{" "}
                              </div>
                              <div>3. 반품 요청 가능 기간 </div>
                              <div className="text-[#888]">
                                ① 구매자 단순 변심은 상품 수령 후 14일 이내
                                (반품 배송비 구매자 부담)
                                <br />
                                ② 상품 내용이 표시/광고와 다르거나 상품하자의
                                경우 상품 수령 후 3개월 이내 혹은 그 사실을 안
                                날 또는 알 수 있었던 날로부터 30일 이내 <br />
                                (반품 배송비 회사 부담){" "}
                              </div>
                              <div>4. 반품 배송비</div>
                              <div className="text-[#888]">
                                반품회수배송비 3,000원, 최초배송비 3,000원
                                <br />
                                (무료 배송의 경우 결제금액에 최초 배송비
                                포함으로 인하여 반품배송비 6,000원으로 표기){" "}
                              </div>
                              <div>5. 반품 절차</div>
                              <div className="text-[#888]">
                                ① 환불 예상 금액 등 반품 예상 정보 확인 후 반품
                                접수 완료
                                <br />
                                ② CJ 대한 통운에서 상품 회수
                                <br />
                                ③ 반품된 상품의 상태를 확인한 이후 3영업일
                                이내에 환불 처리(카드 결제의 경우 카드사의
                                사정에 따라 처리시간이 추가로 소요됨)
                                <br />※ 상품 입고 후 2~3일 정도 검수 및 확인
                                작업시간이 소요될 수 있습니다.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ContentLayout>
          <Footer />
        </>
      )}
      <style jsx>{`
        input::-webkit-inner-spin-button {
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
        }
        input:focus {
          outline-width: 0;
        }
      `}</style>
    </div>
  );
}
