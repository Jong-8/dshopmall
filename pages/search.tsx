import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { GoSearch, GoX } from "react-icons/go";
import { itemList } from "../services/dummy/dummy";

export default function Search() {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string | string[] | undefined>(
    router.query.keyword
  );
  const [keywordReset, setKeywordReset] = useState<boolean>(
    keyword ? true : false
  );
  const [datas, setDatas] = useState([
    {
      id: 0,
      title: "",
      price: 0,
      category: "",
      thumbnailUrl: "",
      stock: 0,
      isSelectOption: false,
      images: [""],
      description: "",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setKeyword(router.query.keyword);
    setDatas(itemList);
  }, [router.query.keyword]);

  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeywordReset(value ? true : false);
    setKeyword(value);
  };

  const onResetClick = () => {
    setKeywordReset(false);
    setKeyword("");
    inputRef.current?.focus();
  };

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?keyword=${keyword}`);
  };

  return (
    <>
      <Header
        title={`DSHOPMALL | ${keyword} 검색`}
        description={`${keyword} 검색`}
      />
      <div className="pt-[100px] max-w-[1800px] m-auto">
        <div className="pt-[60px] px-[106px] pb-[70px]">
          <div className="border border-[#ddd] mb-10">
            <form onSubmit={onSearchSubmit}>
              <div className="flex relative">
                <button
                  type="submit"
                  className="text-[30px] py-5 pr-[10px] pl-5"
                >
                  <GoSearch />
                </button>
                <input
                  type="text"
                  name="keyword"
                  className="w-[100%] py-[10px] px-[15px]"
                  ref={inputRef}
                  autoComplete="off"
                  value={keyword}
                  onChange={onKeywordChange}
                />
                {keywordReset && (
                  <a
                    className="absolute top-[50%] right-5 translate-y-[-50%] cursor-pointer text-lg"
                    onClick={onResetClick}
                  >
                    <GoX />
                  </a>
                )}
              </div>
            </form>
          </div>
          <div>
            {datas.length === 0 && (
              <div className="text-center py-[20%]">
                <img src="/img/loading.gif" alt="" className="m-auto" />
              </div>
            )}
            <div className="grid grid-cols-3 gap-2.5 py-5">
              {datas.map((data) => (
                <div key={data.id} className="w-[100%] group">
                  <Link href={`/${data.id}`}>
                    <a className="block relative">
                      <img
                        src={data.thumbnailUrl}
                        alt={data.title}
                        className="w-[100%] object-contain "
                      />
                      <div className="w-[101%] h-[101%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hidden group-hover:flex justify-center items-center flex-col bg-white/[.7] text-lg">
                        <div>{data.title}</div>
                        <div>{data.price.toLocaleString()}원</div>
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
