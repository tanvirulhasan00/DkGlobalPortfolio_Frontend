import React, { useEffect, useState } from "react";
import { BsZoomIn, BsX } from "react-icons/bs";
import { Card, CardContent } from "~/components/ui/card";
import { getAllCertificate } from "~/redux/features/certificateSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";

const Certificate = () => {
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.certificate);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const token = "";

  useEffect(() => {
    dispatch(getAllCertificate({ token }));
  }, []);

  const filterImages = data?.result?.filter(
    (item) => item?.searchText?.toLowerCase() === "certificate"
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 sm:py-16">
      {/* Minimal Title */}
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-2xl sm:text-3xl font-light text-gray-800 tracking-wide">
          Certificates
        </h1>
        <div className="w-20 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4"></div>
      </div>

      {/* Masonry-style Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
        {filterImages?.map((item, index) => (
          <div
            key={item?.id || index}
            className="break-inside-avoid group relative"
            onMouseEnter={() => setIsHovering(index)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <Card className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group-hover:border-blue-200">
              <CardContent className="p-0">
                <div className="relative overflow-hidden bg-gray-50">
                  <img
                    alt={item?.title || "Certificate"}
                    src={item?.imageUrl}
                    className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/0 group-hover:to-black/20 transition-all duration-500" />

                  {/* Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div
                        className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg cursor-pointer hover:bg-white hover:scale-110 transition-all duration-300"
                        onClick={() => setSelectedImage(item?.imageUrl)}
                      >
                        <BsZoomIn className="text-gray-700 text-xl" />
                      </div>
                    </div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
              </CardContent>
            </Card>

            {/* Floating Shadow Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 transform group-hover:scale-105" />
          </div>
        ))}
      </div>

      {/* Alternative Grid Layout (if you prefer equal heights) */}
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {filterImages?.map((item, index) => (
          <div
            key={item.id || index}
            className="group relative aspect-square"
            onMouseEnter={() => setIsHovering(index)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <Card className="w-full h-full bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500">
              <CardContent className="p-0 h-full">
                <div className="relative w-full h-full overflow-hidden bg-gray-50">
                  <img
                    alt={item.title || "Certificate"}
                    src={item.imageUrl}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                      <div 
                        className="bg-white/90 rounded-full p-2 shadow-lg cursor-pointer hover:bg-white transition-all"
                        onClick={() => setSelectedImage(item.imageUrl)}
                      >
                        <BsZoomIn className="text-gray-700" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div> */}

      {/* Loading Skeleton */}
      {loading && (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="break-inside-avoid aspect-video bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && (!filterImages || filterImages?.length === 0) && (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <BsZoomIn className="text-4xl text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No certificates available</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-full">
            <img
              src={selectedImage}
              alt="Certificate view"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute -top-4 -right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-2xl w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              onClick={() => setSelectedImage(null)}
            >
              <BsX />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;
