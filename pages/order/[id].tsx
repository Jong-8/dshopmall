import ContentLayout from "@components/Layout/ContentLayout";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useState } from "react";

export default function Order() {
  const [post, setPost] = useState(false);

  const onPostClick = () => {
    setPost(true);
  };

  const handleComplete = (data) => {
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
      <Header title="주문하기" description="주문하기" />
      <ContentLayout>
        <div className="max-w-[660px] m-auto pt-[60px] pb-[70px]">
          <form action="">
            {/* 주문 상품 */}
            <div className="od_box">
              <div className="od_title">주문 상품</div>
              <div>
                <div className="flex justify-between border-b border-[#e0e0e0] pb-10">
                  <div className="w-[160px] rounded-lg overflow-hidden">
                    <img
                      src="https://www.935.co.kr/upload/product/thumb_20230418161252037400.JPG"
                      alt=""
                      className="w-[100%]"
                    />
                  </div>
                  <div className="w-[450px] flex flex-col justify-between">
                    <div>
                      <div className="font-bold mb-1">
                        9:35 발라또 퍼플 세럼
                      </div>
                      <div className="text-sm text-[#888]">옵션 없음</div>
                    </div>
                    <div>1개 / 57,000원</div>
                  </div>
                </div>
                <div className="pt-[30px] flex justify-between items-center">
                  <div className="font-bold">상품합계</div>
                  <div className="font-bold text-2xl text-[#7c34d2]">
                    57,000원
                  </div>
                </div>
              </div>
            </div>
            {/* 주문자 */}
            <div className="od_box">
              <div className="od_title">주문자</div>
              <div>
                <div className="od_input_box">
                  <div className="od_label">이름</div>
                  <div>
                    <input type="text" className="od_input" />
                  </div>
                </div>
                <div className="od_input_box">
                  <div className="od_label">연락처</div>
                  <div className="flex justify-between items-center">
                    <input
                      type="number"
                      className="od_input"
                      minLength={3}
                      maxLength={3}
                    />
                    <div className="px-3">-</div>
                    <input
                      type="number"
                      className="od_input"
                      minLength={3}
                      maxLength={4}
                    />
                    <div className="px-3">-</div>
                    <input
                      type="number"
                      className="od_input"
                      minLength={4}
                      maxLength={4}
                    />
                  </div>
                </div>
                <div className="od_input_box">
                  <div className="od_label">이메일</div>
                  <div>
                    <input type="text" className="od_input" />
                  </div>
                </div>
              </div>
            </div>
            {/* 배송지 */}
            <div className="od_box">
              <div className="od_title">배송지</div>
              <div>
                <div className="flex mb-5">
                  <div className="relative">
                    <input
                      type="radio"
                      name="select_addr"
                      id="basicAddr"
                      className="w-0 h-0 absolute top-0 left-0 peer"
                    />{" "}
                    <label
                      htmlFor="basicAddr"
                      className="flex items-center group opacity-50 peer-checked:font-bold peer-checked:opacity-100"
                    >
                      <span className="relative block w-4 h-4 rounded-[50%] border border-[#aeaeae] mr-1 after:hidden after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[10px] after:h-[10px] after:rounded-[50%] after:bg-[#7a1cea] peer-checked:group-[]:after:block"></span>{" "}
                      기본 배송지
                    </label>
                  </div>
                  <div className="ml-4 relative">
                    <input
                      type="radio"
                      name="select_addr"
                      id="newAddr"
                      className="w-0 h-0 absolute top-0 left-0 peer"
                    />{" "}
                    <label
                      htmlFor="newAddr"
                      className="flex items-center group opacity-50 peer-checked:font-bold peer-checked:opacity-100"
                    >
                      <span className="relative block w-4 h-4 rounded-[50%] border border-[#aeaeae] mr-1 after:hidden after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[10px] after:h-[10px] after:rounded-[50%] after:bg-[#7a1cea] peer-checked:group-[]:after:block"></span>{" "}
                      신규 입력
                    </label>
                  </div>
                </div>
                <div className="border-b border-[#e0e0e0] pb-8">
                  <div className="od_input_box">
                    <div className="od_label">이름</div>
                    <div>
                      <input type="text" className="od_input" />
                    </div>
                  </div>
                  <div className="od_input_box">
                    <div className="od_label">우편번호</div>
                    <div className="flex justify-between">
                      <input
                        type="text"
                        className="od_input read-only:bg-[#f9f9f9]"
                        readOnly
                      />
                      <div
                        className="w-[100px] h-[56px] ml-3 text-center leading-[56px] text-[#7a1cea] border border-[#7a1cea] rounded-[3px] cursor-pointer"
                        onClick={onPostClick}
                      >
                        검색하기
                      </div>
                    </div>
                    {post && (
                      <div
                        id="wrap"
                        className="border w-[100%] h-[400px] my-[10px] relative"
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
                  <div className="od_input_box">
                    <div className="od_label">주소</div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="od_input read-only:bg-[#f9f9f9]"
                        readOnly
                      />
                    </div>
                    <div>
                      <input type="text" className="od_input" />
                    </div>
                  </div>
                  <div className="od_input_box">
                    <div className="od_label">연락처</div>
                    <div className="flex justify-between items-center">
                      <input
                        type="number"
                        className="od_input"
                        minLength={3}
                        maxLength={3}
                      />
                      <div className="px-3">-</div>
                      <input
                        type="number"
                        className="od_input"
                        minLength={3}
                        maxLength={4}
                      />
                      <div className="px-3">-</div>
                      <input
                        type="number"
                        className="od_input"
                        minLength={4}
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="setAddr"
                      className="mr-1 w-[15px] h-[15px] accent-[#7a1cea]"
                    />{" "}
                    <label htmlFor="setAddr">기본 배송지로 설정하기</label>
                  </div>
                </div>
                <div className="pt-8">
                  <div className="od_input_box">
                    <div className="od_label">배송 시 요청 사항</div>
                    <div>
                      <input type="text" className="od_input" />
                    </div>
                  </div>
                  <div className="mt-6">
                    제주 및 도서 산간 지역의 배송은 추가 배송비가 발생할 수
                    있습니다.
                  </div>
                </div>
              </div>
            </div>
            {/* 결제 정보 */}
            <div className="od_box">
              <div className="od_title">결제 정보</div>
              <div>
                <div className="border-b border-[#e0e0e0]">
                  <div className="od_input_box">
                    <div className="od_label">
                      DR포인트 (보유 포인트 0000원)
                    </div>
                    <div className="flex justify-between">
                      <input type="text" className="od_input" />
                      <div className="w-[100px] h-[56px] ml-3 text-center leading-[56px] text-[#7a1cea] border border-[#7a1cea] rounded-[3px]">
                        전액 사용
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-5 border-b border-[#e0e0e0]">
                  <div className="flex justify-between py-4">
                    <div>상품 합계</div>
                    <div>57,000원</div>
                  </div>
                  <div className="flex justify-between py-4">
                    <div>배송비</div>
                    <div>3,000원</div>
                  </div>
                  <div className="flex justify-between py-4">
                    <div>총 할인 DR</div>
                    <div>0 DR</div>
                  </div>
                </div>
                <div>
                  <div className="pt-[30px] flex justify-between items-center">
                    <div className="font-bold">상품합계</div>
                    <div className="font-bold text-2xl text-[#7c34d2]">
                      60,000원
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 결제 방법 */}
            <div className="od_box">
              <div className="od_title">결제 방법</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="radio"
                    name="payment"
                    id="creditCard"
                    className="w-0 h-0 absolute top-0 left-0 peer"
                    defaultChecked={true}
                  />{" "}
                  <label
                    htmlFor="creditCard"
                    className="flex items-center group opacity-50 border border-[#e0e0e0] rounded-md py-4 px-5 peer-checked:font-bold peer-checked:opacity-100"
                  >
                    <span className="relative block w-4 h-4 rounded-[50%] border border-[#aeaeae] mr-2 after:hidden after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[10px] after:h-[10px] after:rounded-[50%] after:bg-[#7a1cea] peer-checked:group-[]:after:block"></span>{" "}
                    신용/체크카드
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="radio"
                    name="payment"
                    id="accountTransfer"
                    className="w-0 h-0 absolute top-0 left-0 peer"
                  />{" "}
                  <label
                    htmlFor="accountTransfer"
                    className="flex items-center group opacity-50 border border-[#e0e0e0] rounded-md py-4 px-5 peer-checked:font-bold peer-checked:opacity-100"
                  >
                    <span className="relative block w-4 h-4 rounded-[50%] border border-[#aeaeae] mr-2 after:hidden after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[10px] after:h-[10px] after:rounded-[50%] after:bg-[#7a1cea] peer-checked:group-[]:after:block"></span>{" "}
                    계좌이체
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="radio"
                    name="payment"
                    id="virtualAccount"
                    className="w-0 h-0 absolute top-0 left-0 peer"
                  />{" "}
                  <label
                    htmlFor="virtualAccount"
                    className="flex items-center group opacity-50 border border-[#e0e0e0] rounded-md py-4 px-5 peer-checked:font-bold peer-checked:opacity-100"
                  >
                    <span className="relative block w-4 h-4 rounded-[50%] border border-[#aeaeae] mr-2 after:hidden after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[10px] after:h-[10px] after:rounded-[50%] after:bg-[#7a1cea] peer-checked:group-[]:after:block"></span>{" "}
                    가상계좌
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="radio"
                    name="payment"
                    id="withoutBankbook"
                    className="w-0 h-0 absolute top-0 left-0 peer"
                  />{" "}
                  <label
                    htmlFor="withoutBankbook"
                    className="flex items-center group opacity-50 border border-[#e0e0e0] rounded-md py-4 px-5 peer-checked:font-bold peer-checked:opacity-100"
                  >
                    <span className="relative block w-4 h-4 rounded-[50%] border border-[#aeaeae] mr-2 after:hidden after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[10px] after:h-[10px] after:rounded-[50%] after:bg-[#7a1cea] peer-checked:group-[]:after:block"></span>{" "}
                    무통장 입금
                  </label>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 pb-4">
              <button className="w-[100%] h-[70px] leading-[70px] text-center bg-[#7865a5] text-white text-xl">
                60,000원 결제하기
              </button>
            </div>
          </form>
        </div>
      </ContentLayout>
      <Footer />
      <style jsx>{`
        .od_title {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 20px;
        }
        .od_box {
          display: flex;
          flex-direction: column;
          border-bottom: 20px solid #f9f9f9;
          padding: 24px 16px;
        }
        .od_input_box {
          margin-bottom: 16px;
        }
        .od_label {
          margin-bottom: 5px;
        }
        .od_input {
          border: 1px solid #e8e8e8;
          border-radius: 3px;
          padding: 10px;
          width: 100%;
          height: 56px;
        }
      `}</style>
    </>
  );
}
