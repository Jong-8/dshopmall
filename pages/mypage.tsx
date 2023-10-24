import ContentLayout from "@components/Layout/ContentLayout";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Button from "@components/Member/Button";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { store } from "@stores/index";
import { useRouter } from "next/router";
import API from "@services/API";

const orderList = [
  {
    id: 1,
    date: "23.09.20",
    name: "화장품명1",
    price: 72000,
    state: "입금 대기",
  },
  {
    id: 2,
    date: "23.09.18",
    name: "화장품명2",
    price: 90000,
    state: "배송 준비",
  },
  {
    id: 3,
    date: "23.09.15",
    name: "화장품명2",
    price: 90000,
    state: "주문 완료",
  },
];

export default function Mypage() {
  const [orderHistory, setOrderHistory] = useState(orderList);
  const [accumulation, setAccumulation] = useState([]);
  const [userInfos, setUserInfos] = useState({
    name: "",
    email: "",
    phone1: "",
    phone2: "",
    phone3: "",
    code: "",
    deliveryInfo: {
      zipcode: "",
      address: "",
      detailed: "",
    },
    marketing: false,
  });
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { token, user, setToken } = store.auth.useToken();
  const router = useRouter();
  const [post, setPost] = useState(false);

  const { name, email, phone1, phone2, phone3, code, deliveryInfo, marketing } =
    userInfos;

  const phoneForm = (num: string, type: number) => {
    let result = "";
    if (num.length == 11) {
      if (type === 1) {
        result = num.substr(0, 3);
      } else if (type === 2) {
        result = num.substr(3, 4);
      } else {
        result = num.substr(7);
      }
    } else {
    }
    return result;
  };

  useEffect(() => {
    setOrderHistory(orderList);
    setUserInfos({
      ...userInfos,
      name: user.name,
      phone1: phoneForm(user.phone, 1),
      phone2: phoneForm(user.phone, 2),
      phone3: phoneForm(user.phone, 3),
      code: user.code,
      email: user.email,
      deliveryInfo: {
        zipcode: user.deliveryInfo.zipcode,
        address: user.deliveryInfo.address,
        detailed: user.deliveryInfo.detailed,
      },
      marketing: user.marketing,
    });
  }, [
    user.email,
    user.deliveryInfo.zipcode,
    user.deliveryInfo.address,
    user.deliveryInfo.detailed,
    user.marketing,
  ]);

  const onInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfos({
      ...userInfos,
      [name]: e.target.type === "checkbox" ? e.target.checked : value,
    });
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

    //console.log(data); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setUserInfos({
      ...userInfos,
      deliveryInfo: {
        ...userInfos.deliveryInfo,
        zipcode: data.zonecode,
        address: fullAddress,
      },
    });
    setPost(false);
  };

  const foldDaumPostcode = () => {
    // iframe을 넣은 element를 안보이게 한다.
    setPost(false);
  };

  const onDeliveryInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfos({
      ...userInfos,
      deliveryInfo: {
        ...userInfos.deliveryInfo,
        [name]: value,
      },
    });
  };

  const onLogoutClick = () => {
    removeCookie("token");
    setToken("", {
      username: "",
      role: "",
      name: "",
      phone: "",
      email: "",
      mycode: "",
      code: "",
      profile: "",
      marketing: false,
      point: 0,
      deliveryInfo: {
        name: "",
        zipcode: "",
        address: "",
        detailed: "",
        phone: "",
        requests: "",
      },
    });
    router.replace("/");
  };

  const onUnsubscribeClick = async () => {
    const confirmUnsubscribe = confirm("회원을 탈퇴하시겠습니까?");
    if (confirmUnsubscribe) {
      const res = await API.auth.unsubscribe(cookies.token);
      //console.log(cookies.token);
      if (res.statusCode === 2000) {
        alert("회원이 탈퇴되었습니다. 감사합니다.");
        router.replace("/");
      } else alert(res.message);
    }
  };

  const onInfoSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let infos = {};
    if (!deliveryInfo.zipcode) {
      infos = {
        email: email,
        marketing: marketing,
      };
    } else {
      infos = {
        email: email,
        marketing: marketing,
        deliveryInfo: {
          zipcode: deliveryInfo.zipcode,
          address: deliveryInfo.address,
          detailed: deliveryInfo.detailed ? deliveryInfo.detailed : "-",
          name: "-",
          phone: "-",
          requests: "-",
        },
      };
    }
    console.log(infos);

    const res = await API.auth.modify(cookies.token, infos);
    if (res.statusCode === 2000) {
      alert("회원 정보가 변경되었습니다.");
      router.push("/mypage");
    } else alert(res.message);
  };
  return (
    <>
      <Header title="마이페이지" description="마이페이지" />
      <ContentLayout>
        <div className="max-w-[960px] m-auto">
          {/* 마이페이지 레이아웃 */}
          <div className="px-4 pt-[60px] pb-[70px] flex justify-between flex-wrap max-md:flex-col-reverse">
            {/* 마이페이지 왼쪽 컨텐츠 */}
            <div className="w-[45%] max-md:w-[100%]">
              {/* 주문 내역 */}
              <div className="mb-[70px] max-md:mb-10">
                <div className="my_title">주문 내역</div>
                <div>
                  {orderHistory.length > 0 ? (
                    <>
                      <div className="grid grid-cols-[20%_40%_20%_20%] border-b border-b-[#ddd] text-sm pb-3 max-md:text-xs">
                        <div>주문일자</div>
                        <div>상품 정보</div>
                        <div className="text-right">가격</div>
                        <div className="text-right">상태</div>
                      </div>
                      {orderHistory.map((order) => (
                        <Link href={`/orderDetails/${order.id}`} key={order.id}>
                          <div className="grid grid-cols-[20%_40%_20%_20%] border-b border-b-[#ddd] text-sm py-4 items-center cursor-pointer max-md:text-xs max-md:py-3">
                            <div>{order.date}</div>
                            <div>{order.name}</div>
                            <div className="text-right">
                              {order.price.toLocaleString()}원
                            </div>
                            <div className="text-right">{order.state}</div>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <div className="py-[100px] text-center max-md:py-[60px] max-md:text-sm">
                      주문 내역이 없습니다.
                    </div>
                  )}
                </div>
              </div>
              {/* 적립금 내역 */}
              <div>
                <div className="my_title">적립금 내역</div>
                <div>
                  {accumulation.length > 0 ? (
                    <></>
                  ) : (
                    <div className="py-[100px] text-center max-md:py-[60px] max-md:text-sm">
                      적립금 내역이 없습니다.
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* 마이페이지 오른쪽 컨텐츠 */}
            <div className="w-[45%] max-md:w-[100%] max-md:mb-10">
              <div className="my_title">회원 정보</div>
              <div className="my-5 flex justify-end text-sm max-md:text-xs max-md:my-3">
                <div
                  className="text-[#999] cursor-pointer"
                  onClick={onLogoutClick}
                >
                  로그아웃
                </div>
              </div>
              <div className="text-sm">
                <form onSubmit={onInfoSubmit}>
                  <div className="my_input_box">
                    <div className="my_label">이메일</div>
                    <div>
                      <input
                        type="text"
                        name="email"
                        className="my_input"
                        value={email}
                        onChange={onInfoChange}
                      />
                    </div>
                  </div>
                  <div className="my_input_box">
                    <div className="my_label">이름</div>
                    <div>
                      <input
                        type="text"
                        name="name"
                        className="my_input"
                        value={name}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="my_input_box">
                    <div className="my_label">연락처</div>
                    <div className="flex justify-between items-center">
                      <input
                        type="number"
                        name="phone1"
                        className="my_input"
                        minLength={3}
                        maxLength={3}
                        value={phone1}
                        readOnly={true}
                      />
                      <div className="px-3">-</div>
                      <input
                        type="number"
                        name="phone2"
                        className="my_input"
                        minLength={3}
                        maxLength={4}
                        value={phone2}
                        readOnly={true}
                      />
                      <div className="px-3">-</div>
                      <input
                        type="number"
                        name="phone3"
                        className="my_input"
                        minLength={4}
                        maxLength={4}
                        value={phone3}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="my_input_box">
                    <div className="my_label">우편번호</div>
                    <div className="flex justify-between">
                      <input
                        type="text"
                        name="zipcode"
                        className="my_input read-only:bg-[#f9f9f9]"
                        readOnly
                        value={deliveryInfo.zipcode}
                      />
                      <div
                        className="w-[140px] h-[45px] ml-3 text-center leading-[45px] text-[#6846b7] border border-[#6846b7] rounded-[23px] cursor-pointer md:hover:bg-[#6846b7] md:hover:text-white ease-in-out duration-300 max-md:h-[40px] max-md:leading-[40px] max-md:text-xs"
                        onClick={onPostClick}
                      >
                        검색하기
                      </div>
                    </div>
                    {post && (
                      <div
                        id="wrap"
                        className="border border-[#333] w-[420px] h-[402px] my-[10px] fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-md:w-[calc(100%-1.5rem)]"
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
                  <div className="my_input_box">
                    <div className="my_label">주소</div>
                    <div className="mb-3 max-md:mb-2">
                      <input
                        type="text"
                        name="address"
                        className="my_input read-only:bg-[#f9f9f9]"
                        readOnly
                        value={deliveryInfo.address}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="detailed"
                        className="my_input"
                        value={deliveryInfo.detailed}
                        onChange={onDeliveryInfoChange}
                      />
                    </div>
                  </div>
                  {/* <div className="my_input_box">
                    <div className="my_label">추천코드</div>
                    <div>
                      <input
                        type="text"
                        name="code"
                        className="my_input"
                        value={code}
                        onChange={onInfoChange}
                      />
                    </div>
                  </div> */}
                  <div className="my_input_box">
                    <div className="mb-3 max-md:text-xs">
                      마케팅 정보 수신 동의
                    </div>
                    <div className="flex">
                      <div className="flex items-center max-md:text-xs">
                        <input
                          type="checkbox"
                          name="marketing"
                          id="agreeEmail"
                          className="mr-2 w-[14px] h-[14px] accent-[#7a1cea] max-md:w-3 max-md:h-3"
                          checked={marketing}
                          onChange={onInfoChange}
                        />{" "}
                        <label htmlFor="agreeEmail">
                          이메일 및 SMS 마케팅 정보 수신에 동의합니다.
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center text-[#999] mt-5 mb-[30px] max-md:text-xs">
                    <Link href={"/changePassword"}>
                      <div className="mr-5 cursor-pointer">
                        비밀번호 변경하기
                      </div>
                    </Link>
                    <div
                      onClick={onUnsubscribeClick}
                      className="cursor-pointer"
                    >
                      탈퇴하기
                    </div>
                  </div>
                  <div className="text-center">
                    <Button text="변경 사항 저장하기" type="submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
      <Footer />
      <style jsx>{`
        .my_title {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 40px;
        }
        .my_input_box {
          margin-bottom: 16px;
        }
        .my_label {
          margin-bottom: 5px;
        }
        .my_input {
          border: 1px solid #d8d8d8;
          border-radius: 3px;
          padding: 10px;
          width: 100%;
          height: 45px;
        }
        @media not all and (min-width: 768px) {
          .my_title {
            font-size: 18px;
            margin-bottom: 30px;
          }
          .my_input_box {
            margin-bottom: 12px;
          }
          .my_label {
            font-size: 12px;
          }
          .my_input {
            height: 40px;
          }
        }
      `}</style>
    </>
  );
}
