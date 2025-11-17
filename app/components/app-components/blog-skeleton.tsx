import { Skeleton } from "~/components/ui/skeleton";

export default function BlogAllGridSkeleton() {
  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <article
          key={i}
          className="flex flex-col items-start justify-between p-2 border rounded-md shadow-2xl"
        >
          <div className="flex gap-5 w-full items-center flex-col-reverse">
            {/* Text section */}
            <div className="w-full">
              {/* Meta info */}
              <div className="flex items-center gap-x-4 text-xs mb-2">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>

              {/* Title & Excerpt */}
              <div className="group relative">
                <Skeleton className="h-6 w-3/4 rounded mt-3" />
                <Skeleton className="h-4 w-full mt-3" />
                <Skeleton className="h-4 w-5/6 mt-2" />
                <Skeleton className="h-4 w-4/6 mt-2" />
              </div>

              {/* Author info */}
              <div className="relative mt-8 flex items-center gap-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
              </div>

              {/* Read more */}
              <div className="mt-5">
                <Skeleton className="h-4 w-24 rounded" />
              </div>
            </div>

            {/* Image section */}
            <div id="image" className="w-full">
              <Skeleton className="h-[10rem] w-full rounded-md" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
