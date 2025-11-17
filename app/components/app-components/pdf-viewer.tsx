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
  const [zoomLevel, setZoomLevel] = useState<number>(1.5); // Default zoom level

  const containerRef = useRef<HTMLDivElement>(null);
  const pdfUrl = pdfUrl1;

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

    if (direction === "next" && currentPage < numPages - 1) {
      setCurrentPage((prev) => prev + 2);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 2);
    }

    setIsFlipping(false);
  };

  const goToPrevPage = () => flipPage("prev");
  const goToNextPage = () => flipPage("next");

  // Zoom functions
  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3)); // Max zoom 3x
  };

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5)); // Min zoom 0.5x
  };

  const resetZoom = () => {
    setZoomLevel(1.5);
  };

  interface VisiblePage {
    pageNumber: number;
    position: PagePosition;
  }

  const getVisiblePages = (): VisiblePage[] => {
    const pages: VisiblePage[] = [];

    // Always show current page as right page
    const leftPage = currentPage > 1 ? currentPage - 1 : null;
    const rightPage = currentPage;

    if (leftPage) {
      pages.push({ pageNumber: leftPage, position: "left" });
    }
    pages.push({ pageNumber: rightPage, position: "right" });

    return pages;
  };

  const renderPageWithFlip = (pageNumber: number, position: PagePosition) => {
    const isLeftPage = position === "left";
    const pageImage = pdfImages[pageNumber - 1];

    // Calculate dynamic dimensions based on zoom level
    const baseWidth = 780;
    const baseHeight = 700;
    const scaledWidth = baseWidth * (zoomLevel / 1.5);
    const scaledHeight = baseHeight * (zoomLevel / 1.5);

    return (
      <motion.div
        key={`${pageNumber}-${position}`}
        className={`absolute ${isLeftPage ? "left-0" : "right-0"} 
          bg-white border border-gray-200 ${isLeftPage ? "rounded-l-lg" : "rounded-r-lg"} 
          overflow-hidden shadow-lg`}
        style={{
          width: scaledWidth,
          height: scaledHeight,
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
          className="w-full h-full relative "
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
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <div className="text-gray-500 text-sm">
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
            <div className="text-gray-400 text-sm">Page {pageNumber}</div>
          </div>
        </div>
      </motion.div>
    );
  };

  const visiblePages = getVisiblePages();

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-10 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
        </div>
        <div className="w-[1560px] h-[720px] bg-white rounded-xl shadow-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-gray-500">Initializing PDF Viewer...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full py-10 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-center max-w-md"
        >
          <p className="text-red-600 mb-2">{error}</p>
        </motion.div>
      )}

      {!error && (
        <div className="relative">
          {/* Zoom Controls */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-4 py-2 flex items-center gap-4">
              <button
                onClick={zoomOut}
                disabled={zoomLevel <= 0.5 || isLoading}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Zoom Out"
              >
                <svg
                  className="w-5 h-5"
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

              <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>

              <button
                onClick={zoomIn}
                disabled={zoomLevel >= 3 || isLoading}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Zoom In"
              >
                <svg
                  className="w-5 h-5"
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
                disabled={zoomLevel === 1.5 || isLoading}
                className="px-3 py-1 text-xs bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
              width: 1560 * (zoomLevel / 1.5),
              height: 720 * (zoomLevel / 1.5),
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Book Spine */}
            {/* <div className="absolute inset-y-4 left-1/2 transform -translate-x-1/2 w-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg z-10 shadow-2xl" /> */}

            {/* Pages Container */}
            <div
              className="relative flex justify-center"
              style={{
                width: 1560 * (zoomLevel / 1.5),
                height: 700 * (zoomLevel / 1.5),
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
                className="absolute top-0 bottom-0 w-6 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50 z-20"
                initial={{
                  x:
                    flipDirection === "next"
                      ? -780 * (zoomLevel / 1.5)
                      : 780 * (zoomLevel / 1.5),
                }}
                animate={{
                  x:
                    flipDirection === "next"
                      ? 780 * (zoomLevel / 1.5)
                      : -780 * (zoomLevel / 1.5),
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            )}
          </motion.div>

          {/* Navigation Controls */}
          {numPages > 2 && !error && (
            <motion.div
              className="flex items-center gap-6 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={goToPrevPage}
                disabled={currentPage <= 1 || isFlipping || isLoading}
                className="px-8 py-4 bg-white rounded-full shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-lg"
              >
                <svg
                  className="w-6 h-6"
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
                Previous
              </button>

              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg text-lg">
                <span className="text-sm text-gray-600">Spread</span>
                <span className="font-semibold text-gray-800">
                  {currentPage > 1
                    ? `${currentPage - 1}-${currentPage}`
                    : `1-${currentPage}`}
                </span>
                <span className="text-gray-400">of</span>
                <span className="font-semibold text-gray-800">{numPages}</span>
              </div>

              <button
                onClick={goToNextPage}
                disabled={
                  currentPage >= numPages - 1 || isFlipping || isLoading
                }
                className="px-8 py-4 bg-white rounded-full shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-lg"
              >
                Next
                <svg
                  className="w-6 h-6"
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
            </motion.div>
          )}
        </div>
      )}

      {/* Download Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={` mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200 text-center`}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Download Full Report
        </h3>
        <p className="text-gray-600 mb-4">
          Click below to download the complete Fire Safety Compliance Report PDF
        </p>
        <Link
          to={pdfUrl}
          download="Fire-Safety-Compliance-Report.pdf"
          className={`inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md hover:shadow-lg`}
        >
          <svg
            className="w-5 h-5"
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
          Download PDF Report
        </Link>
      </motion.div>
    </div>
  );
}
