import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { GoSearch, GoX } from "react-icons/go";
import { FiMenu } from "react-icons/fi";
import { BsCart2, BsPerson } from "react-icons/bs";

export default function Header({ title, description }: HeaderProps) {
  const [search, setSearch] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchKeywordReset, setSearchKeywordReset] = useState<boolean>(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setSearch(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const onSearchClick = () => {
    setSearch(true);
    inputRef.current?.focus();
    document.addEventListener("mousedown", handleClickOutside);
  };

  const onSearchKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKeywordReset(value ? true : false);
    setSearchKeyword(value);
  };

  const onResetClick = () => {
    setSearchKeywordReset(false);
    setSearchKeyword("");
    inputRef.current?.focus();
  };

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?keyword=${searchKeyword}`);
  };
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="border-b-[#999] border-b fixed top-0 left-0 w-[100%] z-[99] bg-white">
        <div className="flex items-center max-w-[1800px] m-auto px-[90px] pt-5 pb-1 max-lg:px-[0] max-md:hidden">
          <div className="flex flex-wrap flex-1 pl-4">
            {/* <Link href={""}>
              <a
                className={`mr-7 text-[15px] hover:text-[#6846b7] ${
                  router.pathname === "/shop" ? "active" : ""
                }`}
              >
                SHOP
              </a>
            </Link> */}
            <Link href={"/about"}>
              <a
                className={`mr-7 text-[15px] hover:text-[#6846b7] ${
                  router.pathname === "/about" ? "active" : ""
                }`}
              >
                ABOUT
              </a>
            </Link>
            <Link href={"/dshop"}>
              <a
                className={`mr-7 text-[15px] hover:text-[#6846b7] ${
                  router.pathname === "/dshop" ? "active" : ""
                }`}
              >
                DSHOP
              </a>
            </Link>
            <Link href={"/live"}>
              <a
                className={`text-[15px] hover:text-[#6846b7] ${
                  router.pathname === "/live" ? "active" : ""
                }`}
              >
                LIVE
              </a>
            </Link>
          </div>
          <div>
            <Link href={"/"}>
              <a className="block w-[300px] text-center h-[76px] leading-[76px] text-[36px] bg-[#333] text-white font-black">
                ADAMMALL
              </a>
            </Link>
          </div>
          <div className="flex flex-wrap flex-1 justify-end pr-4 relative">
            <div
              className={`${
                !search || router.pathname === "/search"
                  ? "z-10"
                  : "opacity-0 z-0"
              } ease-in-out duration-300 relative text-right`}
            >
              <a
                className={`mr-7 text-[15px] cursor-pointer hover:text-[#6846b7] ${
                  router.pathname === "/search" ? "active" : ""
                }`}
                onClick={onSearchClick}
              >
                Search
              </a>
              <Link href={"/login"}>
                <a
                  className={`mr-7 text-[15px] hover:text-[#6846b7] ${
                    router.pathname === "/login" ? "active" : ""
                  }`}
                >
                  Log In
                </a>
              </Link>
              <Link href={"/cart"}>
                <a
                  className={`text-[15px] hover:text-[#6846b7] ${
                    router.pathname === "/cart" ? "active" : ""
                  }`}
                >
                  Cart
                </a>
              </Link>
            </div>
            <div
              ref={searchRef}
              className={`${
                !search || router.pathname === "/search"
                  ? "opacity-0 z-0"
                  : "z-10"
              } ease-in-out duration-300 absolute top-0 right-0 w-[10rem]`}
            >
              <form onSubmit={onSearchSubmit}>
                <div className="flex items-end justify-between group relative">
                  <button
                    type="submit"
                    className="text-xl mr-1 group-hover:text-[#6846b7] ease-in-out duration-300"
                  >
                    <GoSearch />
                  </button>
                  <input
                    type="text"
                    name="keyword"
                    className="border-b border-[#999] w-[100%] group-hover:border-[#6846b7] group-hover:text-[#6846b7] ease-in-out duration-300"
                    ref={inputRef}
                    autoComplete="off"
                    value={searchKeyword}
                    onChange={(e) => onSearchKeywordChange(e)}
                  />
                  {searchKeywordReset && (
                    <a
                      className="absolute top-[50%] right-0 translate-y-[-50%] group-hover:text-[#6846b7] cursor-pointer"
                      onClick={onResetClick}
                    >
                      <GoX />
                    </a>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden items-center px-4 py-2 max-md:flex">
          <div className="flex flex-wrap flex-1">
            <button className="text-[24px]">
              <FiMenu />
            </button>
          </div>
          <div>
            <Link href={"/"}>
              <a className="block w-[180px] text-center h-[42px] leading-[42px] text-[20px] bg-[#333] text-white font-black">
                ADAMMALL
              </a>
            </Link>
          </div>
          <div className="flex flex-wrap flex-1 justify-end">
            <Link href={"/login"}>
              <a
                className={`mr-2 text-[26px] hover:text-[#6846b7] ${
                  router.pathname === "/login" ? "active" : ""
                }`}
              >
                <BsPerson />
              </a>
            </Link>
            <Link href={"/cart"}>
              <a
                className={`text-[22px] hover:text-[#6846b7] ${
                  router.pathname === "/cart" ? "active" : ""
                }`}
              >
                <BsCart2 />
              </a>
            </Link>
          </div>
        </div>
        <style jsx>{`
          .active {
            color: #6846b7;
          }
        `}</style>
      </header>
    </>
  );
}
