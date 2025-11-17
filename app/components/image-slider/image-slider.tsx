import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { getAllProfileImages } from "~/redux/features/ProfileImageSlice";
import SliderSkeleton from "../app-components/image-slider-skeleton";

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeID, setTimeID] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();
  const { loading, dataList, refresh } = useAppSelector(
    (state) => state.profile_images
  );
  const token = "";

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getAllProfileImages({ token }));
  }, [refresh]);
  const filterImages = dataList?.result?.filter(
    (item) => item?.searchText?.toLowerCase() === "slider"
  );

  // console.log(filterImages);

  // ✅ Autoplay
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [activeIndex]);

  const startAutoPlay = () => {
    stopAutoPlay();
    const id = setTimeout(() => {
      slideNext();
    }, 5000);
    setTimeID(id);
  };

  const stopAutoPlay = () => {
    if (timeID) {
      clearTimeout(timeID);
      setTimeID(null);
    }
  };

  // ✅ Looping logic
  const slideNext = () => {
    if (!filterImages || filterImages.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % filterImages.length);
  };

  const slidePrev = () => {
    if (!filterImages || filterImages.length === 0) return;
    setActiveIndex(
      (prev) => (prev - 1 + filterImages.length) % filterImages.length
    );
  };

  // ✅ Swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      slideNext();
    } else if (distance < -50) {
      slidePrev();
    }
  };

  return loading || !dataList?.result ? (
    <SliderSkeleton />
  ) : (
    <div
      className="relative w-full overflow-hidden bg-white"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* Slides wrapper */}
      <div
        ref={sliderRef}
        className="w-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {filterImages?.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-[300px] sm:h-[750px] xl:h-[850px] object-cover sm:object-bottom-left"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 flex">
        {filterImages?.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full border border-gray-400 mx-1 transition-colors duration-500 ${
              activeIndex === index ? "bg-black" : "bg-white"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition-all "
        onClick={slideNext}
      >
        <ArrowRightCircleIcon className="size-10" />
      </button>

      {/* Prev Button */}
      <button
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition-all"
        onClick={slidePrev}
      >
        <ArrowLeftCircleIcon className="size-10" />
      </button>
    </div>
  );
};

export default ImageSlider;
