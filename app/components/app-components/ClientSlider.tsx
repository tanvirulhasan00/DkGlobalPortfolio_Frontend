import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { getAllPartner } from "~/redux/features/partnerSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { Spinner } from "../ui/spinner";

const ClientSlider = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(40);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.partner);

  useEffect(() => {
    dispatch(getAllPartner({ token: "" }));
  }, [dispatch]);

  // Wait for images to load before measuring
  useEffect(() => {
    if (!data?.result?.length) return;

    let loadedCount = 0;
    const total = data.result.length;

    data.result.forEach((logo) => {
      const img = new Image();
      img.src = logo.imageUrl;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === total) setImagesLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === total) setImagesLoaded(true);
      };
    });
  }, [data]);

  // Measure width only after images loaded
  useEffect(() => {
    if (imagesLoaded && trackRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const speed = 100; // px/sec
      setDuration(trackWidth / speed);
    }
  }, [imagesLoaded]);

  return (
    <div className="w-full h-[18rem] flex items-center bg-gray-50 overflow-hidden">
      <div className="relative overflow-hidden group w-full">
        <div className="py-10">
          <h1 className="text-2xl font-bold text-center">
            Our Valuable <span className="text-indigo-600">Clients</span>
          </h1>
        </div>

        <div
          className={`flex ${imagesLoaded ? "animate-marquee" : ""}`}
          style={{ ["--marquee-duration" as any]: `${duration}s` }}
        >
          {loading && (
            <div className="flex justify-center items-center w-full">
              <Spinner />
            </div>
          )}

          {/* First track */}
          <div ref={trackRef} className="flex shrink-0 items-center gap-12">
            {data?.result?.map((logo, i) => (
              <Link to={logo.link} key={`first-${i}`} target="_blank">
                <img
                  src={logo.imageUrl}
                  alt={`Client ${i}`}
                  className="h-[6rem] w-auto object-contain rounded-2xl"
                />
              </Link>
            ))}
          </div>

          {/* Duplicate track */}
          <div className="flex shrink-0 items-center gap-12 px-6">
            {data?.result?.map((logo, i) => (
              <Link to={logo.link} key={`second-${i}`} target="_blank">
                <img
                  src={logo.imageUrl}
                  alt={`Client duplicate ${i}`}
                  className="h-[6rem] w-auto object-contain rounded-2xl"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSlider;
