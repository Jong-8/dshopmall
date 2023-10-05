import ContentTitle from "@components/Layout/ContentTitle";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, itemList } from "../../services/dummy/dummy";

export default function Main() {
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
  const [tabs, setTabs] = useState("all");

  useEffect(() => {
    //axios.get("https://jsonplaceholder.typicode.com/photos").then((res) => {
    //  setDatas(res.data);
    //});
    itemList && setDatas(itemList);
  }, []);

  const onTabClick = (category: string) => {
    setTabs(category);
    //axios.get("https://jsonplaceholder.typicode.com/photos").then((res) => {
    //  const datas = res.data;
    //  const newDatas = datas.filter((data) => {
    //    if (category === "all") {
    //      return data;
    //    } else if (category === "cosmetics") {
    //      return data.albumId === 1;
    //    } else {
    //      return data.albumId === 2;
    //    }
    //  });
    //  setDatas(newDatas);
    //});
    const newDatas = itemList.filter((data) => {
      if (category !== "all") {
        return data.category === category;
      } else {
        return data;
      }
    });
    setDatas(newDatas);
  };

  return (
    <>
      <ContentTitle title="shop" />
      <div className="w-[100%] p-4 max-md:p-3">
        <div className="flex justify-center uppercase max-md:text-xs">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`mx-3 cursor-pointer ${
                category === tabs && "text-[#6846b7]"
              }`}
              onClick={() => onTabClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
        {datas.length === 0 && (
          <div className="text-center py-[20%]">
            <img src="/img/loading.gif" alt="" className="m-auto" />
          </div>
        )}
        <div className="grid grid-cols-2 gap-2.5 p-5 max-md:p-0 max-md:py-3">
          {datas.map((data) => (
            <div key={data.id} className="w-[100%] group">
              <Link href={`/${data.id}`}>
                <a className="block relative">
                  <img
                    src={data.thumbnailUrl}
                    alt={data.title}
                    className="w-[100%] object-contain "
                  />
                  <div className="w-[101%] h-[101%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hidden group-hover:flex justify-center items-center flex-col bg-white/[.7] text-lg max-md:group-hover:hidden">
                    <div>{data.title}</div>
                    <div>{data.price.toLocaleString()}원</div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
