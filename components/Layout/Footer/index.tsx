import Link from "next/link";
import { store } from "@stores/index";
import { useCookies } from "react-cookie";
import API from "@services/API";
import { useEffect } from "react";

export default function Footer() {
  const [cookies, setCookies, removeCookies] = useCookies(["shopInfo"]);
  const shopInfo = store.shop.useShopInfo();
  const {
    company,
    ceo,
    manager,
    companyNumber,
    email,
    address,
    businessNumber,
    tel,
    operatingTime,
    lunchTime,
  } = shopInfo.shopInfo;

  const shopInfoApi = async () => {
    const res = await API.shopInfo.shopInfo();
    if (res.statusCode === 2000) {
      shopInfo.setShopInfo(res.result);
      setCookies("shopInfo", res.result, {
        path: "/",
      });
    } else alert(res.message);
  };

  useEffect(() => {
    if (!shopInfo.shopInfo.company) {
      // 회사정보가 store에 없을 때
      if (cookies.shopInfo) {
        // 쿠키에 회사정보가 있다면 store에 저장
        shopInfo.setShopInfo(cookies.shopInfo);
      } else {
        // 쿠키에 회사정보가 없다면 api로 불러와서 저장
        shopInfoApi();
      }
    }
  }, [shopInfo.shopInfo.company, shopInfo.shopInfo, cookies.shopInfo]);

  return (
    <footer>
      <div className="max-w-[1800px] px-[90px] pt-10 pb-5 m-auto max-lg:px-3 max-md:text-xs">
        <div className="flex justify-center">
          <Link href={"/about"}>
            <a className="mx-[0.5em] hover:text-[#6846b7]">ABOUT</a>
          </Link>
          <Link href={"/dshop"}>
            <a className="mx-[0.5em] hover:text-[#6846b7]">DSHOP</a>
          </Link>
          {/* <Link href={"/live"}>
            <a className="mx-[0.5em] hover:text-[#6846b7]">LIVE</a>
          </Link> */}
          <Link href={"/policy"}>
            <a className="mx-[0.5em] hover:text-[#6846b7]">이용약관</a>
          </Link>
          <Link href={"/privacy"}>
            <a className="mx-[0.5em] hover:text-[#6846b7]">개인정보처리방침</a>
          </Link>
          {/* <Link href={""}>
            <a className="mx-[0.5em] hover:text-[#6846b7]">사업자정보확인</a>
          </Link> */}
        </div>
        <div className="text-center py-4 leading-7 break-keep max-md:leading-5">
          <div className="flex justify-center flex-wrap">
            <p className="max-lg:w-[100%]">
              상호: {company} <span className="px-1">|</span>
              대표: {ceo} <span className="px-1">|</span>
              개인정보관리책임자: {manager}{" "}
              <span className="px-1 max-lg:hidden">|</span>
            </p>
            <p className="max-lg:w-[100%]">
              사업자등록번호: {companyNumber}
              <span className="px-1">|</span> 이메일: {email}
            </p>
          </div>
          <div className="flex justify-center flex-wrap">
            <p className="max-lg:w-[100%]">
              주소: {address}
              <span className="px-1 max-lg:hidden">|</span>
            </p>
            <p className="max-lg:w-[100%]">통신판매: 2021-서울강남-05787</p>
          </div>
        </div>
        <div className="text-center">
          <div className="flex justify-center flex-wrap">
            <p className="max-lg:w-[100%]">
              고객센터: {tel} <span className="px-1 max-lg:hidden">|</span>
            </p>
            <p className="max-lg:w-[100%]">
              운영시간: {operatingTime} <span className="px-1">|</span>
              점심시간: {lunchTime}{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
