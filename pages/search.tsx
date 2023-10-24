import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { GoSearch, GoX } from "react-icons/go";
import useSearch from "@hooks/useSearch";

export default function Search() {
  const router = useRouter();
  const search = useSearch(router.query.keyword);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {}, []);

  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    search.setKeywordReset(value ? true : false);
    search.setKeyword(value);
  };

  const onResetClick = () => {
    search.setKeywordReset(false);
    search.setKeyword("");
    inputRef.current?.focus();
  };

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.replace(`/search?keyword=${search.keyword}`);
  };

  return (
    <>
      <Header
        title={`DSHOPMALL | ${search.keyword} 검색`}
        description={`${search.keyword} 검색`}
      />
      <div className="pt-[100px] max-w-[1800px] m-auto max-md:pt-[58px]">
        <div className="pt-[60px] px-[106px] pb-[70px] max-md:px-3 max-md:pt-5">
          <div className="border border-[#ddd] mb-10 max-md:mb-4">
            <form onSubmit={onSearchSubmit}>
              <div className="flex relative">
                <button
                  type="submit"
                  className="text-[30px] py-5 pr-[10px] pl-5 max-md:py-3 max-md:pl-4 max-md:text-[20px]"
                >
                  <GoSearch />
                </button>
                <input
                  type="text"
                  name="keyword"
                  className="w-[100%] py-[10px] px-[15px] max-md:py-[6px] max-md:text-xs"
                  ref={inputRef}
                  autoComplete="off"
                  value={search.keyword}
                  onChange={onKeywordChange}
                />
                {search.keywordReset && (
                  <a
                    className="absolute top-[50%] right-5 translate-y-[-50%] cursor-pointer text-lg max-md:right-4"
                    onClick={onResetClick}
                  >
                    <GoX />
                  </a>
                )}
              </div>
            </form>
          </div>
          <div>
            {search.items?.length === 0 && (
              <div className="text-center py-[20%]">
                <div>등록된 제품이 없습니다.</div>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2.5 py-5 max-md:py-3 max-md:grid-cols-2">
              {search.items?.map((item) => (
                <div key={item.counter} className="w-[100%] group">
                  <Link href={`/${item.counter}`}>
                    <a className="block relative">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-[100%] object-contain "
                      />
                      <div className="w-[101%] h-[101%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hidden md:group-hover:flex justify-center items-center flex-col bg-white/[.7] text-lg">
                        <div>{item.title}</div>
                        <div>
                          {item.isAvailable ? (
                            `${item.price.toLocaleString()}원`
                          ) : (
                            <div className="text-red-500">품절된 상품</div>
                          )}
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
