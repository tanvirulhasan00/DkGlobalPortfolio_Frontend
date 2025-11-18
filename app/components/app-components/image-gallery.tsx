import React, { useState, useEffect } from "react";

interface Image {
  id: number;
  src: string;
  alt: string;
  thumbnail: string;
}

const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  // Enhanced responsive state
  const [screenSize, setScreenSize] = useState<"sm" | "md" | "lg" | "xl">("lg");
  const [sliceNumber, setSliceNumber] = useState(0);
  console.log(screenSize, sliceNumber, window.innerWidth);

  // Enhanced responsive detection
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setScreenSize("sm");
        setSliceNumber(2);
      } else if (width <= 640) {
        setScreenSize("sm");
        setSliceNumber(2);
      } else if (width <= 768) {
        setScreenSize("md");
        setSliceNumber(2);
      } else if (width <= 1024) {
        setScreenSize("lg");
        setSliceNumber(4);
      } else {
        setScreenSize("xl");
        setSliceNumber(8);
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Fixed image URLs with proper Unsplash IDs and thumbnail sizes
  const images: Image[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Mountain landscape",
      thumbnail:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&crop=center",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Forest",
      thumbnail:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&crop=center",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
      alt: "Nature",
      thumbnail:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&crop=center",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Lake",
      thumbnail:
        "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&crop=center",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Valley",
      thumbnail:
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&crop=center",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Beach",
      thumbnail:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&crop=center",
    },
  ];
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const openModal = (image: Image, index: number): void => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = (): void => {
    setSelectedImage(null);
  };

  const nextImage = (): void => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = (): void => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (!selectedImage) return;

    switch (e.key) {
      case "Escape":
        closeModal();
        break;
      case "ArrowRight":
        nextImage();
        break;
      case "ArrowLeft":
        prevImage();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

  // Add error handling for images
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="animate-pulse text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-400 rounded-full mx-auto mb-3 sm:mb-4"></div>
          <p className="text-blue-600 font-medium text-sm sm:text-base">
            Loading Gallery...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="sm:min-h-screen  bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6">
      <div className="max-w-[100rem] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Gallery
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Click on any image to view all images in full size
          </p>
        </div>

        {/* Image Grid */}
        <div
          className={`${selectedImage ? "blur-sm" : ""} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-2 sm:px-0`}
        >
          {images.slice(0, sliceNumber).map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => openModal(image, index)}
            >
              <div className="bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={image.thumbnail}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-2 sm:p-3 transform rotate-0 group-hover:rotate-12 transition-transform duration-300">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-opacity-90 flex items-center justify-center z-50 p-3 sm:p-4 md:p-6"
            onClick={closeModal}
          >
            <div
              className="relative w-full max-w-6xl max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors duration-300 z-10 bg-black bg-opacity-50 rounded-full p-2 sm:p-3"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300 z-10 bg-black bg-opacity-50 rounded-full p-2 sm:p-3"
                aria-label="Previous image"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300 z-10 bg-black bg-opacity-50 rounded-full p-2 sm:p-3"
                aria-label="Next image"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Image Display */}
              <div
                className="relative w-full flex justify-center"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] object-contain rounded-lg"
                  style={{
                    animation: "fadeIn 0.3s ease-out",
                  }}
                  onError={handleImageError}
                />
              </div>

              {/* Image Counter */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm sm:text-base">
                {currentIndex + 1} / {images.length}
              </div>

              {/* Thumbnail Strip */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 max-w-full overflow-x-auto py-2 px-2 sm:px-4">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => {
                      setCurrentIndex(index);
                      setSelectedImage(images[index]);
                    }}
                    className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded sm:rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentIndex
                        ? "border-white scale-110"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={image.thumbnail}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add custom animations to CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Custom breakpoint for extra small screens */
        @media (min-width: 475px) {
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default ImageGallery;
