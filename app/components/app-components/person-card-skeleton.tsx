import { Skeleton } from "~/components/ui/skeleton";

export default function PersonListSkeleton() {
  return [...Array(2)].map((_, i) => (
    <div className="flex w-full flex-col items-start gap-5" key={i}>
      {/* Image */}
      <Skeleton className="w-full h-[15rem] rounded-xl bg-gray-300" />

      <div className="w-full">
        {/* Name */}
        <Skeleton className="h-6 w-2/3 rounded bg-gray-300" />
        {/* Designation */}
        <Skeleton className="h-4 w-1/2 mt-2 rounded bg-gray-300" />

        {/* Contact Icons */}
        <div className="flex gap-5 mt-4">
          <Skeleton className="h-5 w-5 rounded-full bg-gray-300" />
          <Skeleton className="h-5 w-5 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  ));
}
