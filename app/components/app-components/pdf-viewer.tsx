import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";

type PagePosition = "left" | "right";

export default function PdfFlipBookReal({
  pdfUrl1,
  title,
}: {
  pdfUrl1: string;
  title: string;
}) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [error, setError] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const [pdfImages, setPdfImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1.5);

  // Enhanced responsive state
  const [screenSize, setScreenSize] = useState<
    "xs" | "sm" | "md" | "lg" | "xl"
  >("lg");

  // Enhanced responsive detection
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setScreenSize("xs");
      } else if (width < 640) {
        setScreenSize("sm");
      } else if (width < 768) {
        setScreenSize("md");
      } else if (width < 1024) {
        setScreenSize("lg");
      } else {
        setScreenSize("xl");
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Enhanced responsive sizes with better scaling
  const getResponsiveSizes = () => {
    switch (screenSize) {
      case "xs": // Extra small mobile (0-480px)
        return {
          mode: "single" as const,
          bookWidth: Math.min(320, window.innerWidth - 40),
          bookHeight: 400,
          pageWidth: Math.min(300, window.innerWidth - 60),
          pageHeight: 380,
          zoomLevel: 1.2,
        };
      case "sm": // Small mobile (480-640px)
        return {
          mode: "single" as const,
          bookWidth: Math.min(380, window.innerWidth - 40),
          bookHeight: 480,
          pageWidth: Math.min(360, window.innerWidth - 60),
          pageHeight: 460,
          zoomLevel: 1.3,
        };
      case "md": // Tablet (640-768px)
        return {
          mode: "double" as const,
          bookWidth: Math.min(700, window.innerWidth - 40),
          bookHeight: 500,
          pageWidth: 340,
          pageHeight: 480,
          zoomLevel: 1.4,
        };
      case "lg": // Small desktop (768-1024px)
        return {
          mode: "double" as const,
          bookWidth: Math.min(900, window.innerWidth - 40),
          bookHeight: 580,
          pageWidth: 440,
          pageHeight: 560,
          zoomLevel: 1.5,
        };
      case "xl": // Large desktop (1024px+)
      default:
        return {
          mode: "double" as const,
          bookWidth: Math.min(1200, window.innerWidth - 80),
          bookHeight: 700,
          pageWidth: 580,
          pageHeight: 680,
          zoomLevel: 1.6,
        };
    }
  };

  const {
    mode,
    bookWidth,
    bookHeight,
    pageWidth,
    pageHeight: basePageHeight,
    zoomLevel: responsiveZoom,
  } = getResponsiveSizes();

  const containerRef = useRef<HTMLDivElement>(null);
  const pdfUrl = pdfUrl1;

  // Set responsive zoom on mount and screen size change
  useEffect(() => {
    if (isClient) {
      setZoomLevel(responsiveZoom);
    }
  }, [screenSize, isClient, responsiveZoom]);

  // Client-side only
  useEffect(() => {
    setIsClient(true);
    loadPdfAsImages();
  }, []);

  // Reload PDF when zoom level changes
  useEffect(() => {
    if (isClient && pdfImages.length > 0) {
      loadPdfAsImages();
    }
  }, [zoomLevel]);

  // Function to load PDF and convert to images
  const loadPdfAsImages = async () => {
    try {
      setIsLoading(true);

      // Load PDF.js dynamically
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      // Fetch the PDF file
      const response = await fetch(pdfUrl);
      const arrayBuffer = await response.arrayBuffer();

      // Load the PDF document
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setNumPages(pdf.numPages);

      // Convert each page to image
      const images = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: zoomLevel });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Fix for TypeScript error: Check if context exists
        if (!context) {
          throw new Error("Could not get canvas context");
        }

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Fixed render parameters - use the new API with canvas property
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas, // Add the canvas element to the render parameters
        };

        await page.render(renderContext).promise;

        images.push(canvas.toDataURL());
      }

      setPdfImages(images);
      setError("");
    } catch (err) {
      console.error("Error loading PDF:", err);
      setError("Failed to load PDF. Please try downloading the file.");
    } finally {
      setIsLoading(false);
    }
  };

  const flipPage = async (direction: "next" | "prev") => {
    if (isFlipping || numPages === 0) return;

    setIsFlipping(true);
    setFlipDirection(direction);

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (direction === "next") {
      if (mode === "single") {
        setCurrentPage((prev) => Math.min(prev + 1, numPages));
      } else {
        setCurrentPage((prev) => Math.min(prev + 2, numPages));
      }
    } else if (direction === "prev") {
      if (mode === "single") {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      } else {
        setCurrentPage((prev) => Math.max(prev - 2, 1));
      }
    }

    setIsFlipping(false);
  };

  const goToPrevPage = () => flipPage("prev");
  const goToNextPage = () => flipPage("next");

  // Enhanced zoom functions with responsive limits
  const zoomIn = () => {
    const maxZoom = screenSize === "xs" ? 2.5 : screenSize === "sm" ? 2.7 : 3;
    setZoomLevel((prev) => Math.min(prev + 0.2, maxZoom));
  };

  const zoomOut = () => {
    const minZoom = screenSize === "xs" ? 0.8 : screenSize === "sm" ? 0.9 : 0.5;
    setZoomLevel((prev) => Math.max(prev - 0.2, minZoom));
  };

  const resetZoom = () => {
    setZoomLevel(responsiveZoom);
  };

  interface VisiblePage {
    pageNumber: number;
    position: PagePosition;
  }

  const getVisiblePages = (): VisiblePage[] => {
    const pages: VisiblePage[] = [];

    if (mode === "single") {
      // mobile → show only current page
      pages.push({ pageNumber: currentPage, position: "right" });
      return pages;
    }

    // double-page mode (tablet & desktop)
    const leftPage = currentPage > 1 ? currentPage - 1 : null;
    const rightPage = currentPage;

    if (leftPage) pages.push({ pageNumber: leftPage, position: "left" });
    pages.push({ pageNumber: rightPage, position: "right" });

    return pages;
  };

  // Calculate dynamic dimensions with better mobile scaling
  const getScaledDimensions = () => {
    const baseScale = zoomLevel / responsiveZoom;
    const scaleFactor =
      screenSize === "xs" ? 0.9 : screenSize === "sm" ? 0.95 : 1;

    return {
      scaledBookWidth: bookWidth * baseScale * scaleFactor,
      scaledBookHeight: bookHeight * baseScale * scaleFactor,
      scaledPageWidth: pageWidth * baseScale * scaleFactor,
      scaledPageHeight: basePageHeight * baseScale * scaleFactor,
    };
  };

  const {
    scaledBookWidth,
    scaledBookHeight,
    scaledPageWidth,
    scaledPageHeight,
  } = getScaledDimensions();

  const renderPageWithFlip = (pageNumber: number, position: PagePosition) => {
    const isLeftPage = position === "left";
    const pageImage = pdfImages[pageNumber - 1];

    return (
      <motion.div
        key={`${pageNumber}-${position}`}
        className={`absolute ${isLeftPage ? "left-0" : "right-0"} 
          bg-white border border-gray-200 ${isLeftPage ? "rounded-l-lg" : "rounded-r-lg"} 
          overflow-hidden shadow-lg`}
        style={{
          width: scaledPageWidth,
          height: scaledPageHeight,
          transformStyle: "preserve-3d",
          transformOrigin: isLeftPage ? "right center" : "left center",
        }}
        initial={
          isFlipping
            ? {
                rotateY: isLeftPage
                  ? flipDirection === "next"
                    ? 0
                    : -180
                  : flipDirection === "next"
                    ? 0
                    : 180,
              }
            : {
                rotateY: 0,
              }
        }
        animate={
          isFlipping
            ? {
                rotateY: isLeftPage
                  ? flipDirection === "next"
                    ? -180
                    : 0
                  : flipDirection === "next"
                    ? 180
                    : 0,
              }
            : {
                rotateY: 0,
              }
        }
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-full h-full relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of page - Actual PDF content */}
          <div
            className="absolute inset-0 w-full h-full bg-white"
            style={{ backfaceVisibility: "hidden" as const }}
          >
            {pageImage ? (
              <img
                src={pageImage}
                alt={`Page ${pageNumber}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <div className="text-gray-500 text-xs sm:text-sm">
                    Loading page {pageNumber}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Back of page - shows when flipped */}
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-50 to-gray-100"
            style={{
              backfaceVisibility: "hidden" as const,
              transform: "rotateY(180deg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderLeft: isLeftPage ? "1px solid #e5e7eb" : "none",
              borderRight: !isLeftPage ? "1px solid #e5e7eb" : "none",
            }}
          >
            <div className="text-gray-400 text-xs sm:text-sm">
              Page {pageNumber}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const visiblePages = getVisiblePages();

  // Enhanced page display text
  const getPageDisplayText = () => {
    if (mode === "single") {
      return `Page ${currentPage} of ${numPages}`;
    } else {
      if (currentPage > 1) {
        return `Pages ${currentPage - 1}-${currentPage} of ${numPages}`;
      } else {
        return `Pages 1-${currentPage} of ${numPages}`;
      }
    }
  };

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-4 sm:py-6 md:py-10 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen px-4">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {title}
          </h2>
        </div>
        <div className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[900px] h-[300px] sm:h-[400px] md:h-[580px] bg-white rounded-xl shadow-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-blue-500 mx-auto mb-2 sm:mb-3 md:mb-4"></div>
            <div className="text-gray-500 text-sm sm:text-base">
              Initializing PDF Viewer...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full py-4 sm:py-6 md:py-10 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4 sm:mb-6 md:mb-8"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {title}
        </h2>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl text-center w-full max-w-md mx-auto"
        >
          <p className="text-red-600 text-sm sm:text-base">{error}</p>
        </motion.div>
      )}

      {!error && (
        <div className="relative w-full flex flex-col items-center">
          {/* Zoom Controls */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center mb-4 sm:mb-6 w-full"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-3 py-1 sm:px-4 sm:py-2 flex items-center gap-2 sm:gap-4">
              <button
                onClick={zoomOut}
                disabled={
                  zoomLevel <=
                    (screenSize === "xs"
                      ? 0.8
                      : screenSize === "sm"
                        ? 0.9
                        : 0.5) || isLoading
                }
                className="p-1 sm:p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Zoom Out"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>

              <span className="text-xs sm:text-sm font-medium text-gray-700 min-w-[50px] sm:min-w-[60px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>

              <button
                onClick={zoomIn}
                disabled={
                  zoomLevel >=
                    (screenSize === "xs"
                      ? 2.5
                      : screenSize === "sm"
                        ? 2.7
                        : 3) || isLoading
                }
                className="p-1 sm:p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Zoom In"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>

              <div className="h-4 w-px bg-gray-300"></div>

              <button
                onClick={resetZoom}
                disabled={zoomLevel === responsiveZoom || isLoading}
                className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Reset
              </button>
            </div>
          </motion.div>

          {/* Book Container */}
          <motion.div
            ref={containerRef}
            className="relative flex items-center justify-center"
            style={{
              width: scaledBookWidth,
              height: scaledBookHeight,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Pages Container */}
            <div
              className="relative flex justify-center"
              style={{
                width: scaledBookWidth,
                height: scaledPageHeight,
              }}
            >
              <AnimatePresence mode="wait">
                {visiblePages.map(({ pageNumber, position }) => (
                  <div key={`container-${pageNumber}-${position}`}>
                    {renderPageWithFlip(pageNumber, position)}
                  </div>
                ))}
              </AnimatePresence>
            </div>

            {/* Page Curl Effect */}
            {isFlipping && (
              <motion.div
                className="absolute top-0 bottom-0 w-4 sm:w-6 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50 z-20"
                initial={{
                  x:
                    flipDirection === "next"
                      ? -(scaledPageWidth / (mode === "single" ? 1 : 2))
                      : scaledPageWidth / (mode === "single" ? 1 : 2),
                }}
                animate={{
                  x:
                    flipDirection === "next"
                      ? scaledPageWidth
                      : -scaledPageWidth,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            )}
          </motion.div>

          {/* Navigation Controls */}
          {numPages > (mode === "single" ? 1 : 2) && !error && (
            <motion.div
              className="flex items-center gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8 flex-col sm:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto justify-between">
                <button
                  onClick={goToPrevPage}
                  disabled={
                    (mode === "single" ? currentPage <= 1 : currentPage <= 1) ||
                    isFlipping ||
                    isLoading
                  }
                  className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white rounded-full shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-1 sm:gap-2 border border-gray-200 hover:bg-gray-50 text-sm sm:text-base"
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
                  <span className="hidden xs:inline">Previous</span>
                </button>

                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 bg-white/80 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full shadow-lg text-sm sm:text-base">
                  <span className="text-xs text-gray-600 hidden xs:inline">
                    {mode === "single" ? "Page" : "Spread"}
                  </span>
                  <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                    {getPageDisplayText()}
                  </span>
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={
                    (mode === "single"
                      ? currentPage >= numPages
                      : currentPage >= numPages - 1) ||
                    isFlipping ||
                    isLoading
                  }
                  className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white rounded-full shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-1 sm:gap-2 border border-gray-200 hover:bg-gray-50 text-sm sm:text-base"
                >
                  <span className="hidden xs:inline">Next</span>
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
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Download Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-md sm:max-w-lg mt-4 sm:mt-6 md:mt-8 p-4 sm:p-5 md:p-6 bg-white rounded-xl shadow-lg border border-gray-200 text-center"
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
          Download Full Report
        </h3>
        <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
          Click below to download the complete Fire Safety Compliance Report PDF
        </p>
        <Link
          to={pdfUrl}
          download="Fire-Safety-Compliance-Report.pdf"
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download PDF
        </Link>
      </motion.div>
    </div>
  );
}
