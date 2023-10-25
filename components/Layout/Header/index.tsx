import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, FormEvent, ChangeEvent, useEffect } from "react";
import { GoSearch, GoX } from "react-icons/go";
import { FiMenu } from "react-icons/fi";
import { BsCart2, BsPerson } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import useAuth from "@hooks/useAuth";
import { store } from "@stores";
import { useCookies } from "react-cookie";

export default function Header({ title, description }: HeaderProps) {
  const [menu, setMenu] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchKeywordReset, setSearchKeywordReset] = useState<boolean>(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBgRef = useRef<HTMLDivElement>(null);
  const auth = store.auth.useToken();
  const [cookies, setCookie, removeCookie] = useCookies(["cartCount"]);
  const [cartCount, setCartCount] = useState(0);

  useAuth();

  useEffect(() => {
    if (auth.token) {
      setCartCount(auth.cartCount);
    } else {
      if (cookies.cartCount) {
        setCartCount(cookies.cartCount);
      }
    }
  }, [auth.token, auth.cartCount, cookies.cartCount]);

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

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const onMenuClick = async () => {
    menuRef.current && menuRef.current.classList.add("max-md:flex");
    await sleep(0);
    menuRef.current && menuRef.current.classList.add("show");
  };

  const onMenuBgClick = async () => {
    menuRef.current && menuRef.current.classList.remove("show");
    await sleep(350);
    menuRef.current && menuRef.current.classList.remove("max-md:flex");
  };

  const onMenuCloseClick = async () => {
    menuRef.current && menuRef.current.classList.remove("show");
    await sleep(350);
    menuRef.current && menuRef.current.classList.remove("max-md:flex");
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
                DSHOPMALL
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
              {auth.user.username ? (
                <Link href={"/mypage"}>
                  <a
                    className={`mr-7 text-[15px] hover:text-[#6846b7] ${
                      router.pathname === "/mypage" ? "active" : ""
                    }`}
                  >
                    Mypage
                  </a>
                </Link>
              ) : (
                <Link href={"/login"}>
                  <a
                    className={`mr-7 text-[15px] hover:text-[#6846b7] ${
                      router.pathname === "/login" ? "active" : ""
                    }`}
                  >
                    Log In
                  </a>
                </Link>
              )}
              {auth.user.username ? (
                <Link href={"/cart"}>
                  <a
                    className={`text-[15px] hover:text-[#6846b7] ${
                      router.pathname === "/cart" ? "active" : ""
                    }`}
                  >
                    Cart({cartCount})
                  </a>
                </Link>
              ) : (
                <Link href={"/login?url=cart"}>
                  <a
                    className={`text-[15px] hover:text-[#6846b7] ${
                      router.pathname === "/cart" ? "active" : ""
                    }`}
                  >
                    Cart{cartCount > 0 && `(${cartCount})`}
                  </a>
                </Link>
              )}
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
        <div className="hidden items-center px-3 py-2 max-md:flex">
          <div className="flex flex-wrap flex-1">
            <button className="text-[20px]" onClick={onMenuClick}>
              <FiMenu />
            </button>
          </div>
          <div>
            <Link href={"/"}>
              <a className="block w-[180px] text-center h-[42px] leading-[42px] text-[20px] bg-[#333] text-white font-black">
                DSHOPMALL
              </a>
            </Link>
          </div>
          <div className="flex flex-wrap flex-1 justify-end">
            <Link href={"/login"}>
              <a
                className={`mr-2 text-[24px] md:hover:text-[#6846b7] ${
                  router.pathname === "/login" ? "active" : ""
                }`}
              >
                <BsPerson />
              </a>
            </Link>
            <Link href={"/cart"}>
              <a
                className={`text-[20px] md:hover:text-[#6846b7] ${
                  router.pathname === "/cart" ? "active" : ""
                }`}
              >
                <BsCart2 />
              </a>
            </Link>
          </div>
        </div>
        <div
          className={`hidden w-[100%] h-[100%] fixed left-0 top-0 group`}
          ref={menuRef}
        >
          <div className="w-[80%] h-[100%] fixed left-[-100%] top-0 bg-white transition-all ease-linear duration-300 z-10 group-[.show]:left-0">
            <div
              className="text-white absolute top-[16px] right-[-36px] text-[24px]"
              onClick={onMenuCloseClick}
            >
              <AiOutlineClose />
            </div>
            <div className="flex justify-between uppercase px-6 py-5 text-sm text-gray-500">
              <Link href={"/login"}>
                <div>login</div>
              </Link>
              <Link href={"/signup"}>
                <div>join us</div>
              </Link>
              <Link href={"/mypage"}>
                <div>mypage</div>
              </Link>
              <Link href={"/login?member=no"}>
                <div>order</div>
              </Link>
            </div>
            <div className="px-6 pb-5">
              <form onSubmit={onSearchSubmit}>
                <div className="flex items-center justify-between group relative border-b border-[#6846b7] pb-2">
                  <button
                    type="submit"
                    className="text-xl mr-3 text-[#6846b7] ease-in-out duration-300"
                  >
                    <GoSearch />
                  </button>
                  <input
                    type="text"
                    name="keyword"
                    className=" w-[100%] text-[#6846b7] ease-in-out duration-300 pr-5"
                    ref={inputRef}
                    autoComplete="off"
                    value={searchKeyword}
                    onChange={(e) => onSearchKeywordChange(e)}
                  />
                  {searchKeywordReset && (
                    <a
                      className="absolute top-[4px] right-0 text-[#6846b7] cursor-pointer"
                      onClick={onResetClick}
                    >
                      <GoX />
                    </a>
                  )}
                </div>
              </form>
            </div>{" "}
            <div className="px-6 uppercase font-jamsilMedium leading-[3.2rem] tracking-wider">
              <Link href={"/"}>
                <div>shop</div>
              </Link>
              <Link href={"/about"}>
                <div>about</div>
              </Link>
              <Link href={"/dshop"}>
                <div>dshop</div>
              </Link>
              <Link href={"/live"}>
                <div>live</div>
              </Link>
            </div>
          </div>
          <div
            className="w-[100%] h-[100%] fixed left-0 top-0 bg-black/70 transition ease-linear duration-300 opacity-0 group-[.show]:opacity-100"
            onClick={onMenuBgClick}
            ref={menuBgRef}
          ></div>
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

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
