import ContentLayout from "@components/Layout/ContentLayout";
import ContentTitle from "@components/Layout/ContentTitle";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import LiveBox from "@components/Live/LiveBox";
import LivePopup from "@components/Live/LivePopup";
import { useState } from "react";

const liveLists = [
  {
    id: 4,
    thumb: "/img/live_thumb03.png",
    title: "[썸머썸머 추천템] 화장품1",
    itemId: 1,
    itemName: "9:35 발라또 퍼플 세럼",
    itemThumb:
      "https://www.935.co.kr/upload/product/thumb_20230418161252037400.JPG",
    itemPrice: 57000,
    itemSale: "20%",
    views: 1200,
  },
  {
    id: 3,
    thumb: "/img/live_thumb03.png",
    title: "[썸머썸머 추천템] 화장품1",
    itemId: 1,
    itemName: "9:35 발라또 퍼플 세럼",
    itemThumb:
      "https://www.935.co.kr/upload/product/thumb_20230418161252037400.JPG",
    itemPrice: 57000,
    itemSale: "20%",
    views: 1200,
  },
  {
    id: 2,
    thumb: "/img/live_thumb02.png",
    title: "피부 속으로 깊훅하게 밀어 넣어주는 강력한 스킨부스터",
    itemId: 2,
    itemName: "9:35 발라또 퍼플 오일미스트",
    itemThumb:
      "https://www.935.co.kr/upload/product/thumb_20230418161839810305.JPG",
    itemPrice: 66000,
    itemSale: "20%",
    views: 860,
  },
  {
    id: 1,
    thumb: "/img/live_thumb01.png",
    title:
      "임시제목입니다. 임시제목입니다. 임시제목입니다. 임시제목입니다. 임시제목입니다.",
    itemId: 3,
    itemName: "9:35 발라또 퍼플 부스터",
    itemThumb:
      "https://www.935.co.kr/upload/product/thumb_20230418161305601800.JPG",
    itemPrice: 42000,
    itemSale: "20%",
    views: 3500,
  },
];

export default function Live() {
  const [popup, setPopup] = useState(false);
  const [popupId, setPopupId] = useState<number>();

  const onVideoClick = (id: number) => {
    setPopupId(id);
    setPopup(true);
  };

  const onPopupBgClick = () => {
    setPopup(false);
  };

  return (
    <>
      <Header title="DSHOPMALL | LIVE" description="LIVE" />
      <ContentLayout>
        <ContentTitle title="live" />
        <div className="grid grid-cols-4 gap-5 mt-8 max-xl:px-4 max-lg:grid-cols-3 max-md:px-3 max-md:pb-8 max-md:mt-4 max-sm:grid-cols-2 max-sm:gap-3">
          {liveLists.map((liveList) => (
            <LiveBox
              key={liveList.id}
              info={liveList}
              onVideoClick={() => onVideoClick(liveList.id)}
            />
          ))}
        </div>
        {popup && (
          <LivePopup id={popupId ?? 0} onPopupBgClick={onPopupBgClick} />
        )}
      </ContentLayout>
      <Footer />
    </>
  );
}
