import Link from "next/link";
import { AiOutlineEye } from "react-icons/ai";

export default function LiveBox({ info, onVideoClick }: LiveBoxProps) {
  const {
    id,
    thumb,
    title,
    itemId,
    itemName,
    itemThumb,
    itemPrice,
    itemSale,
    views,
  } = info;
  return (
    <div>
      <div className="relative rounded-md overflow-hidden">
        <div onClick={() => onVideoClick(id)} className="cursor-pointer">
          <div>
            <img src={thumb} alt={thumb} className="w-[100%]" />
          </div>
          <div className="flex absolute top-3 left-3 text-white bg-[#000]/40 px-3 py-1 rounded-3xl items-center text-sm max-md:text-[10px] max-md:leading-3 max-md:top-2 max-md:left-2">
            <div className="mr-1 text-lg max-md:text-base">
              <AiOutlineEye />
            </div>
            <div>{views.toLocaleString()} 시청</div>
          </div>
        </div>
        <div className="absolute left-[50%] translate-x-[-50%] bottom-3 px-3 w-[100%] text-sm max-md:px-2 max-md:text-[10px]">
          <Link href={`/${itemId}`}>
            <div className="flex rounded-lg overflow-hidden bg-[#000]/70 w-[100%] cursor-pointer">
              <div className="w-[76px] h-[76px] relative overflow-hidden max-md:w-[44px] max-md:h-[44px]">
                <img
                  src={itemThumb}
                  alt={itemName}
                  className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                />
              </div>
              <div className="w-[calc(100%-76px)] text-white flex flex-col px-3 justify-center max-md:w-[calc(100%-44px)] max-md:px-2 max-md:leading-[12px]">
                <div className="truncate mb-1">{itemName}</div>
                <div className="flex">
                  <div className="mr-2 text-red-600">{itemSale}</div>
                  <div className="font-bold">
                    {itemPrice.toLocaleString()}원
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="my-3 max-md:text-xs">
        <div>{title}</div>
      </div>
    </div>
  );
}
