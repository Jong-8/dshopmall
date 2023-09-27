import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="max-w-[1800px] px-[90px] pt-10 pb-5 m-auto">
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
          <Link href={""}>
            <a className="mx-[0.5em] hover:text-[#6846b7]">사업자정보확인</a>
          </Link>
        </div>
        <div className="text-center py-4 leading-7">
          <p>
            상호: 디샵몰 | 대표: 박제일 | 개인정보관리책임자: 박제일 | 전화:
            02-2088-1850 | 이메일: contact@designershop.io
          </p>
          <p>
            주소: 서울특별시 강남구 강남대로 324 역삼디오슈페리움 1층 |
            사업자등록번호: 743-86-02152 | 통신판매: 0000-서울강남-00000
          </p>
        </div>
      </div>
    </footer>
  );
}
