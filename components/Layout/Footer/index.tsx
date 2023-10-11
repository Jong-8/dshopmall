import Link from "next/link";

export default function Footer() {
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
          <Link href={"/live"}>
            <a className="mx-[0.5em] hover:text-[#6846b7]">LIVE</a>
          </Link>
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
              상호: 디샵몰 <span className="px-1">|</span>
              대표: 박제일 <span className="px-1">|</span>
              개인정보관리책임자: 박제일{" "}
              <span className="px-1 max-lg:hidden">|</span>
            </p>
            <p className="max-lg:w-[100%]">
              사업자등록번호: 743-86-02152<span className="px-1">|</span>{" "}
              이메일: contact@designershop.io
            </p>
          </div>
          <div className="flex justify-center flex-wrap">
            <p className="max-lg:w-[100%]">
              주소: 서울특별시 강남구 강남대로 324 역삼디오슈페리움 1층
              <span className="px-1 max-lg:hidden">|</span>
            </p>
            <p className="max-lg:w-[100%]">통신판매: 0000-서울강남-00000</p>
          </div>
        </div>
        <div className="text-center">
          <div className="flex justify-center flex-wrap">
            <p className="max-lg:w-[100%]">
              고객센터: 02-2088-1850{" "}
              <span className="px-1 max-lg:hidden">|</span>
            </p>
            <p className="max-lg:w-[100%]">
              운영시간: 평일 10:00am ~ 6:00pm <span className="px-1">|</span>
              점심시간: 12:00pm ~ 1:00pm{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
