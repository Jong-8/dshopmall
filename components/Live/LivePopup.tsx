import {
  useRef,
  useState,
  useEffect,
  useCallback,
  MouseEvent,
  RefObject,
} from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { FullGestureState, useDrag } from "@use-gesture/react";
import { IoClose } from "react-icons/io5";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { GrRotateLeft, GrRotateRight } from "react-icons/gr";
import Link from "next/link";
import BaseReactPlayer, { OnProgressProps } from "react-player/base";

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

export default function LivePopup({ id, onPopupBgClick }: LivePopupProps) {
  const [liveInfo, setLiveInfo] = useState({
    id: 0,
    thumb: "",
    title: "",
    itemId: 0,
    itemName: "",
    itemThumb: "",
    itemPrice: 0,
    itemSale: "",
    views: 0,
  });
  const [videoState, setVideoState] = useState({
    play: false,
    speed: 0,
    played: 0,
    currentTime: 0,
    endTime: 0,
  });
  const ref = useRef<BaseReactPlayer<ReactPlayerProps> | null>(null);

  const { play, speed, played, currentTime, endTime } = videoState;
  const speedList = [1, 2, 4];

  useEffect(() => {
    const info = liveLists.find((liveList) => {
      return liveList.id === id;
    });
    info && setLiveInfo(info);
  }, []);

  const onSpeedClick = () => {
    const nextSpeed = speed + 1 > 2 ? 0 : speed + 1;
    setVideoState({
      ...videoState,
      speed: nextSpeed,
    });
  };

  const onPrevClick = (time: number) => {
    if (ref.current) {
      const prevTime = ref.current.getCurrentTime() - time;
      ref.current.seekTo(prevTime);
    }
  };

  const onNextClick = (time: number) => {
    if (ref.current) {
      const nextTime = ref.current.getCurrentTime() + time;
      ref.current.seekTo(nextTime);
    }
  };

  const onPlayClick = () => {
    setVideoState({
      ...videoState,
      play: !play,
    });
  };

  const handlePlay = () => {
    setVideoState({
      ...videoState,
      play: true,
    });
  };

  const handleProgress = (state: OnProgressProps) => {
    //console.log(state);
    // We only want to update time slider if we are not currently seeking
    if (state.played < 1) {
      setVideoState({
        ...videoState,
        played: state.played,
        currentTime: state.playedSeconds,
      });
    } else {
      setVideoState({
        ...videoState,
        play: !play,
        played: state.played,
        currentTime: state.playedSeconds,
      });
    }
  };

  const handleDuration = (duration: number) => {
    setVideoState({
      ...videoState,
      endTime: duration,
    });
  };

  const onTotalProgressBarClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    const bar = (e.target as HTMLDivElement).clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const percent = clickX / bar;
    if (ref.current) {
      ref.current.seekTo(percent);
    }
  };

  const onProgressBarClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    const bar = ((e.target as HTMLDivElement).offsetParent as HTMLDivElement)
      .clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const percent = clickX / bar;
    if (ref.current) {
      ref.current.seekTo(percent);
    }
  };

  const bind = useDrag(
    (
      state: Omit<FullGestureState<"drag">, "event"> & {
        event:
          | globalThis.MouseEvent
          | PointerEvent
          | TouchEvent
          | KeyboardEvent;
      }
    ) => {
      const parent = (state.currentTarget as HTMLDivElement)
        .offsetParent as HTMLDivElement;
      const bar = parent.clientWidth;
      let movement = 0;
      if (played === 0) {
        // 시작일 때
        movement = state.movement[0] / bar;
      } else {
        if (state.first) {
          // 처음 클릭했을 때 중간일 때
          movement = played + state.movement[0] / bar;
        } else {
          // 마우스 이동 중 중간일 때
          movement = (state.values[0] - parent.getBoundingClientRect().x) / bar;
        }
      }
      if (ref.current) {
        ref.current.seekTo(movement);
      }
    }
  );

  const timeSet = (time: number) => {
    const hour = time > 3600 && time / 3600;
    const min = time > 60 && (time % 3600) / 60;
    const sec = time % 60;
    let hourSet = "";
    let minSet = "";
    let secSet = "";
    if (hour) {
      hourSet = hour >= 10 ? `${Math.floor(hour)}:` : `0${Math.floor(hour)}:`;
    }
    if (min) {
      minSet = min >= 10 ? `${Math.floor(min)}:` : `0${Math.floor(min)}:`;
    } else {
      minSet = "00:";
    }
    if (sec) {
      secSet = sec >= 10 ? `${Math.floor(sec)}` : `0${Math.floor(sec)}`;
    } else {
      secSet = "00";
    }
    return `${hourSet}${minSet}${secSet}`;
  };

  return (
    <div className="fixed w-[100%] h-[100%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[100]">
      {id !== 0 && (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[101] max-w-[400px] max-md:w-[calc(100%-6rem)]">
          <div className="w-[100%] rounded-2xl overflow-hidden relative">
            <ReactPlayer
              url={"/video/insta_video2.mp4"}
              width="100%"
              height="auto"
              playing={play}
              playbackRate={speedList[speed]}
              ref={ref}
              onPlay={handlePlay}
              onProgress={handleProgress}
              onDuration={handleDuration}
              className="relative z-0"
            />
            <div className="absolute bottom-0 w-[100%] text-white px-3 z-10">
              <div className="w-[100%] flex text-xs items-baseline">
                <div className="w-[14%] max-md:w-[16%]">
                  {timeSet(currentTime)}
                </div>
                <div className="w-[72%] h-[6px] rounded relative max-md:w-[68%]">
                  <div
                    className="w-[100%] h-[6px] bg-white/20 rounded absolute top-[50%] left-0 translate-y-[-50%] z-0"
                    onClick={(e) => onTotalProgressBarClick(e)}
                  ></div>
                  <div
                    className={`h-[6px] bg-[#7865a5] absolute top-[50%] left-0 translate-y-[-50%] z-10 rounded-s-md`}
                    onClick={(e) => onProgressBarClick(e)}
                    style={{ width: `${played * 100}%` }}
                  ></div>
                  <div
                    className={`w-[14px] h-[14px] bg-[#7865a5] rounded-lg absolute top-[50%] translate-y-[-50%] translate-x-[-50%] z-10 touch-none`}
                    //onMouseDown={(e) => onProgressCursorClick(e)}
                    //onMouseUp={(e) => onProgressCursorOut(e)}
                    style={{ left: `${played * 100}%` }}
                    {...bind()}
                  ></div>
                </div>
                <div className="w-[14%] text-right max-md:w-[16%]">
                  {timeSet(endTime)}
                </div>
              </div>
              <div className="relative flex justify-center">
                <div
                  className="absolute left-0 top-[52%] translate-y-[-50%] py-1 px-4 cursor-pointer bg-black/50 rounded-2xl flex items-center"
                  onClick={onSpeedClick}
                >
                  <IoClose />{" "}
                  <div>{speedList[speed + 1 > 2 ? 0 : speed + 1]}</div>
                </div>
                <div className="flex py-4">
                  <div
                    className="cursor-pointer relative text-[32px] flex justify-center items-center"
                    onClick={() => onPrevClick(10)}
                  >
                    <GrRotateLeft />
                    <div className="absolute top-[52%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[10px]">
                      10
                    </div>
                  </div>
                  <div
                    className="text-[32px] cursor-pointer px-4"
                    onClick={onPlayClick}
                  >
                    {play ? <IoMdPause /> : <IoMdPlay />}
                  </div>
                  <div
                    className="cursor-pointer relative text-[30px] flex justify-center items-center"
                    onClick={() => onNextClick(10)}
                  >
                    <GrRotateRight />
                    <div className="absolute top-[52%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[10px]">
                      10
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] mt-5">
            <Link href={`/${liveInfo.itemId}`}>
              <div className="flex overflow-hidden w-[100%] cursor-pointer">
                <div className="w-[80px] h-[80px] relative rounded-lg overflow-hidden max-md:w-[60px] max-md:h-[60px]">
                  <img
                    src={liveInfo.itemThumb}
                    alt={liveInfo.itemName}
                    className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                  />
                </div>
                <div className="w-[calc(100%-80px)] text-white flex flex-col px-3 justify-center max-md:w-[calc(100%-60px)] max-md:text-sm">
                  <div className="truncate mb-1">{liveInfo.itemName}</div>
                  <div className="flex">
                    <div className="mr-2 text-[#fd4f39]">
                      {liveInfo.itemSale}
                    </div>
                    <div className="font-bold">
                      {liveInfo.itemPrice.toLocaleString()}원
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
      <div
        className="fixed bg-black/80 w-[100%] h-[100%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        onClick={onPopupBgClick}
      ></div>
    </div>
  );
}
