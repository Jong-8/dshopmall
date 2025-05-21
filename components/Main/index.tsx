import ContentTitle from "@components/Layout/ContentTitle";
import Link from "next/link";
import { useState } from "react";
import useItems from "@hooks/useItems";

export default function Main() {
  const items = useItems();
  const [tabs, setTabs] = useState("all");

  const onTabClick = (category: string) => {
    setTabs(category);
    const newDatas = items.originItems?.filter((item) => {
      if (category !== "all") {
        return item.category === category;
      } else {
        return item;
      }
    });
    items.setItems(newDatas);
  };

  return (
    <>
      <ContentTitle title="shop" />
      <div className="w-[100%] p-4 max-md:p-3">
        <div className="flex justify-center uppercase max-md:text-xs">
          {/* <div
            className={`mx-3 cursor-pointer ${
              tabs === "all" && "text-[#6846b7]"
            }`}
            onClick={() => onTabClick("all")}
          >
            ALL
          </div> */}
          {items.categories?.map((category, index) => (
            <div
              key={index}
              className={`mx-3 cursor-pointer ${
                category.name === tabs && "text-[#6846b7]"
              }`}
              onClick={() => onTabClick(category.name)}
            >
              {category.name}
            </div>
          ))}
        </div>
        {items.items?.length === 0 && (
          <div className="text-center py-[20%]">
            <div>판매중인 제품이 없습니다.</div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2.5 p-5 max-md:p-0 max-md:py-3">
          {items.items?.map((item) => (
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
                    {item.price ? (
                      <div className="flex">
                        <div className="text-red-500 mr-2">
                          {item.price.toLocaleString()}원
                        </div>
                        <div className="line-through">
                          {item.price.toLocaleString()}원
                        </div>
                      </div>
                    ) : (
                      <div>{item.price.toLocaleString()}원</div>
                    )}
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
