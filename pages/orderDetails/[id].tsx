import ContentLayout from "@components/Layout/ContentLayout";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { useState } from "react";
import Button from "@components/Member/Button";
import Link from "next/link";

const orderItems = [
  {
    id: 1,
    name: "9:35 발라또 퍼플 세럼",
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161252037400.JPG",
    option: "9:35 발라또 퍼플 세럼 + 소량",
    qty: 1,
    price: 59000,
  },
  {
    id: 2,
    name: "9:35 발라또 퍼플 오일미스트",
    thumbnailUrl:
      "https://www.935.co.kr/upload/product/thumb_20230418161839810305.JPG",
    option: "",
    qty: 1,
    price: 66000,
  },
];

const orderInfos = [
  {
    infoName: "주문번호",
    value: "0000000000000",
  },
  {
    infoName: "주문 일자",
    value: "2023.09.14 09:10:11",
  },
  {
    infoName: "주문 상태",
    value: "입금 대기",
  },
  {
    infoName: "배송 정보",
    value: "-",
  },
];

const paymentInfos = [
  {
    infoName: "상품 합계",
    value: "125,000원",
  },
  {
    infoName: "배송비",
    value: "무료",
  },
  {
    infoName: "결제 금액",
    value: "125,000원",
  },
  {
    infoName: "주문자",
    value: "홍길동",
  },
  {
    infoName: "결제 방법",
    value: "무통장 입금",
  },
  {
    infoName: "입금 계좌",
    value: "신한은행(00000000000000) 디샵몰",
  },
  {
    infoName: "입금 기한",
    value: "2023.09.15 23:59:59",
  },
  {
    infoName: "입금자",
    value: "홍길동",
  },
  {
    infoName: "환불 계좌",
    value: "신한은행(00000000000000) 홍길동",
  },
];

export default function OrderDetails() {
  const [post, setPost] = useState(false);

  const calculateDelivery = (
    arr: {
      id: number;
      name: string;
      thumbnailUrl: string;
      option: string;
      qty: number;
      price: number;
    }[]
  ) => {
    let deliveryFee = 0;
    arr.map((orderItem: any) => {
      deliveryFee += orderItem.price * orderItem.qty;
    });

    return deliveryFee > 100000 ? "무료" : "3,000원";
  };

  const onPostClick = () => {
    setPost(true);
  };

  const handleComplete = (data: Address) => {
    //console.log(data);
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    //console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setPost(false);
  };

  const foldDaumPostcode = () => {
    // iframe을 넣은 element를 안보이게 한다.
    setPost(false);
  };
  return (
    <>
      <Header title="주문 상세 정보" description="주문 상세 정보" />
      <ContentLayout>
        <div className="max-w-[960px] m-auto">
          {/* 주문 상세 정보 레이아웃 */}
          <div className="px-4 pt-[60px] pb-[70px]">
            <div className="text-2xl mb-8 font-semibold">주문 상세 정보</div>
            <div className="mb-[80px]">
              {/* 주문 상세 정보 상단 */}
              <div className="flex border-b border-[#ccc] text-sm pb-4">
                <div className="flex-[4] flex">
                  <div className="w-[70%]">상품 정보</div>
                  <div className="w-[15%] text-center">수량</div>
                  <div className="w-[15%] text-center">가격</div>
                </div>
                <div className="flex-[1] text-center">배송비</div>
              </div>
              {/* 주문 상품 리스트 */}
              <div className="flex border-b border-[#ccc] text-sm">
                <div className="flex-[4]">
                  {orderItems.map((orderItem, index) => (
                    <div
                      className={`py-5 flex ${
                        index > 0 && "border-t border-[#ccc]"
                      }`}
                      key={index}
                    >
                      <div className="flex items-center w-[70%]">
                        <div className="w-[16%]">
                          <Link href={`/${orderItem.id}`}>
                            <img
                              src={orderItem.thumbnailUrl}
                              alt={orderItem.name}
                              className="w-[100%] cursor-pointer"
                            />
                          </Link>
                        </div>
                        <div className="pl-[4%]">
                          <div>
                            <Link href={`/${orderItem.id}`}>
                              {orderItem.name}
                            </Link>
                          </div>
                          {orderItem.option && (
                            <div className="text-xs">
                              {`
                              선택옵션 : 
                              ${orderItem.option}`}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-[15%]">
                        {orderItem.qty}
                      </div>
                      <div className="flex justify-center items-center w-[15%]">
                        {(orderItem.price * orderItem.qty).toLocaleString()}원
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex-[1] flex justify-center items-center flex-col">
                  {calculateDelivery(orderItems)}
                </div>
              </div>
            </div>
            {/* 주문 상세 정보 하단 */}
            <div className="flex justify-between">
              {/* 주문 상세 정보 하단 왼쪽 컨텐츠 */}
              <div className="w-[45%]">
                <div className="mb-[70px]">
                  <div className="odd_title">주문 정보</div>
                  <div className="text-sm">
                    {orderInfos &&
                      orderInfos.map((orderInfo, index) => (
                        <div
                          key={index}
                          className={`flex border-b border-[#dfdfdf] ${
                            index === 0 ? "pb-4" : "py-4"
                          }`}
                        >
                          <div className="w-[40%] leading-[45px]">
                            {orderInfo.infoName}
                          </div>
                          <div
                            className={`w-[60%] leading-[45px] ${
                              orderInfo.value === "입금 대기" &&
                              "flex justify-between items-center"
                            }`}
                          >
                            {orderInfo.value}{" "}
                            {orderInfo.value === "입금 대기" && (
                              <div className="w-[100px] h-[45px] ml-3 text-center leading-[45px] text-[#6846b7] border border-[#6846b7] rounded-[23px] cursor-pointer hover:bg-[#6846b7] hover:text-white ease-in-out duration-300">
                                취소 요청
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <div className="odd_title">배송지 정보</div>
                  <div className="text-sm">
                    <form action="">
                      <div className="odd_input_box">
                        <div className="odd_label">이름</div>
                        <div>
                          <input type="text" className="odd_input" />
                        </div>
                      </div>
                      <div className="odd_input_box">
                        <div className="odd_label">우편번호</div>
                        <div className="flex justify-between">
                          <input
                            type="text"
                            className="odd_input read-only:bg-[#f9f9f9]"
                            readOnly
                          />
                          <div
                            className="w-[140px] h-[45px] ml-3 text-center leading-[45px] text-[#6846b7] border border-[#6846b7] rounded-[23px] cursor-pointer hover:bg-[#6846b7] hover:text-white ease-in-out duration-300"
                            onClick={onPostClick}
                          >
                            검색하기
                          </div>
                        </div>
                        {post && (
                          <div
                            id="wrap"
                            className="border border-[#333] w-[420px] h-[402px] my-[10px] fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                          >
                            <img
                              src="//t1.daumcdn.net/postcode/resource/images/close.png"
                              className="cursor-pointer absolute right-0 top-[-1px] z-10"
                              onClick={foldDaumPostcode}
                              alt="접기 버튼"
                            />
                            <DaumPostcodeEmbed onComplete={handleComplete} />
                          </div>
                        )}
                      </div>
                      <div className="odd_input_box">
                        <div className="odd_label">주소</div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="odd_input read-only:bg-[#f9f9f9]"
                            readOnly
                          />
                        </div>
                        <div>
                          <input type="text" className="odd_input" />
                        </div>
                      </div>
                      <div className="odd_input_box">
                        <div className="odd_label">휴대폰 번호</div>
                        <div className="flex justify-between items-center">
                          <input
                            type="number"
                            className="odd_input"
                            minLength={3}
                            maxLength={3}
                          />
                          <div className="px-3">-</div>
                          <input
                            type="number"
                            className="odd_input"
                            minLength={3}
                            maxLength={4}
                          />
                          <div className="px-3">-</div>
                          <input
                            type="number"
                            className="odd_input"
                            minLength={4}
                            maxLength={4}
                          />
                        </div>
                      </div>
                      <div className="odd_input_box">
                        <div className="odd_label">배송 시 요청 사항</div>
                        <div>
                          <input type="text" className="odd_input" />
                        </div>
                      </div>
                      <div className="text-center mt-10">
                        <Button text="변경 사항 저장하기" type="submit" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* 주문 상세 정보 하단 오른쪽 컨텐츠 */}
              <div className="w-[45%]">
                <div>
                  <div className="odd_title">결제 정보</div>
                  <div className="text-sm">
                    {paymentInfos &&
                      paymentInfos.map((paymentInfo, index) => (
                        <div
                          key={index}
                          className={`flex border-b border-[#dfdfdf] ${
                            index === 0 ? "pb-4" : "py-4"
                          }`}
                        >
                          <div className="w-[40%] leading-[45px]">
                            {paymentInfo.infoName}
                          </div>
                          <div className={`w-[60%] leading-[45px]`}>
                            {paymentInfo.value}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
      <Footer />
      <style jsx>{`
        .odd_title {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 40px;
        }
        .odd_input_box {
          margin-bottom: 16px;
        }
        .odd_label {
          margin-bottom: 5px;
        }
        .odd_input {
          border: 1px solid #d8d8d8;
          border-radius: 3px;
          padding: 10px;
          width: 100%;
          height: 45px;
        }
      `}</style>
    </>
  );
}
