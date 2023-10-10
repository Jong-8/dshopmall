import QtyBox from "./QtyBox";
import { AiOutlineClose } from "react-icons/ai";

export default function ProductQtyBox({
  item,
  qty,
  onQtyChange,
  onMinusClick,
  onPlusClick,
  onDeleteClick,
}: ProductQtyBoxProps) {
  return (
    <div className="py-2">
      <div className="flex items-center">
        <div className="w-[calc(100%-20px)] text-ellipsis whitespace-pre overflow-hidden">
          {item.name}
        </div>
        {/* 선택옵션 있을시 노출 */}
        {item.optionId > 0 && (
          <div
            className="w-5 cursor-pointer text-[#888] flex justify-center"
            onClick={onDeleteClick}
          >
            <AiOutlineClose />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-2">
        <QtyBox
          qty={qty}
          onQtyChange={onQtyChange}
          onMinusClick={onMinusClick}
          onPlusClick={onPlusClick}
        />
        <div>{item.price && item.price.toLocaleString()}원</div>
      </div>
    </div>
  );
}
