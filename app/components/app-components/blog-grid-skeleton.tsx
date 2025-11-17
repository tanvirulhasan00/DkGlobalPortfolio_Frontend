import { Skeleton } from "~/components/ui/skeleton";

export default function BlogGridSkeleton() {
  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <article
          key={i}
          className="flex flex-col items-start justify-between p-2"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Text Section */}
            <div>
              {/* Meta Info */}
              <div className="flex items-center gap-x-4 text-xs mb-2">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>

              {/* Title & Excerpt */}
              <div className="group relative">
                <Skeleton className="h-6 w-3/4 rounded mt-3" />
                <Skeleton className="h-4 w-full mt-3" />
                <Skeleton className="h-4 w-5/6 mt-2" />
                <Skeleton className="h-4 w-4/6 mt-2" />
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 py-4 border-t border-b border-gray-200 mb-6 mt-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              {/* Read More */}
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Image Section */}
            <div id="image">
              <Skeleton className="h-[15rem] w-full rounded-md" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
