import { Skeleton } from "~/components/ui/skeleton";
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from "lucide-react";

export default function SliderSkeleton() {
  return (
    <div className="relative w-full overflow-hidden bg-gray-300">
      {/* Slides wrapper */}
      <div className="flex transition-transform duration-700 ease-in-out">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <Skeleton className="w-full h-[300px] sm:h-[650px] rounded-none" />
          </div>
        ))}
      </div>

      {/* Dots (pagination indicators) */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 flex">
        {[...Array(3)].map((_, index) => (
          <Skeleton
            key={index}
            className="w-2 h-2 mx-1 rounded-full border border-gray-300"
          />
        ))}
      </div>

      {/* Next Button (right arrow) */}
      <button
        type="button"
        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
        disabled
      >
        <ArrowRightCircleIcon className="size-10 opacity-40" />
      </button>

      {/* Prev Button (left arrow) */}
      <button
        type="button"
        className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
        disabled
      >
        <ArrowLeftCircleIcon className="size-10 opacity-40" />
      </button>
    </div>
  );
}
