// import { useEffect } from "react";
// import { Link } from "react-router";
// import { getAllBlog } from "~/redux/features/blogSlice";
// import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
// import { format, parseISO } from "date-fns";
// import BlogGridSkeleton from "./blog-grid-skeleton";

// export default function BlogSummary() {
//   const dispatch = useAppDispatch();
//   const { loading, dataList } = useAppSelector((state) => state.blog);

//   useEffect(() => {
//     dispatch(getAllBlog({ token: "", cat: "posts" }));
//   }, [dispatch]);

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return "Unknown date";
//     try {
//       return format(parseISO(dateString), "MMMM dd, yyyy");
//     } catch {
//       return dateString;
//     }
//   };

//   return (
//     <div className="bg-white py-16 sm:py-24">
//       <div className="w-full px-6 lg:px-8">
//         <div className="flex items-center gap-10 group">
//           <h2 className="text-4xl font-semibold tracking-tight text-pretty text-indigo-600 sm:text-5xl">
//             Blogs
//           </h2>
//           <Link
//             to="/blogs"
//             className="text-sm/6 font-semibold text-red-600 transition-all inline-flex gap-1 duration-300 group-hover:gap-1"
//           >
//             See more
//             <span
//               aria-hidden="true"
//               className="transition-transform duration-300 group-hover:translate-x-1"
//             >
//               →
//             </span>
//           </Link>
//         </div>
//         {loading || !dataList?.result ? (
//           <BlogGridSkeleton />
//         ) : (
//           <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
//             {[...(dataList?.result || [])]
//               ?.sort(() => 0.5 - Math.random())
//               ?.slice(0, 3)
//               ?.map((post) => (
//                 <article
//                   key={post.id}
//                   className="flex flex-col items-start justify-between p-2"
//                 >
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                     <div>
//                       <div className="flex items-center gap-x-4 text-xs">
//                         <time
//                           dateTime={post.publishedAt}
//                           className="text-gray-500"
//                         >
//                           {formatDate(post.publishedAt ?? post?.createdAt)}
//                         </time>
//                         <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
//                           {post?.categoryName}
//                         </p>
//                         <p
//                           className={`relative z-10 rounded-full px-3 py-1.5 font-medium
//                               ${
//                                 post?.status === "published"
//                                   ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
//                                   : "bg-gray-50 text-red-600 hover:bg-red-100"
//                               }`}
//                         >
//                           {post?.status}
//                         </p>
//                       </div>
//                       <div className="group relative">
//                         <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 text-justify">
//                           <Link to={`/blogs/${post?.id}`}>
//                             <span className="absolute inset-0" />
//                             {post.title}
//                           </Link>
//                         </h3>
//                         <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600 leading-relaxed text-justify whitespace-pre-line">
//                           {post.excerpt}
//                         </p>
//                       </div>
//                       {/* Author Info */}
//                       <div className="flex items-center gap-4 py-4 border-t border-b border-gray-200 mb-6">
//                         <img
//                           src={post.authorAvatar}
//                           alt={post.authorName}
//                           className="w-12 h-12 rounded-full object-cover"
//                         />
//                         <div>
//                           <p className="font-medium text-gray-900">
//                             {post.authorName}
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             {formatDate(post.publishedAt ?? post?.createdAt)}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="mt-5 group">
//                         <Link
//                           to={`/blogs/${post?.id}`}
//                           className="text-sm/6 font-semibold text-red-600 transition-all inline-flex gap-1 duration-300 group-hover:gap-1"
//                         >
//                           Read more
//                           <span
//                             aria-hidden="true"
//                             className="transition-transform duration-300 group-hover:translate-x-1"
//                           >
//                             →
//                           </span>
//                         </Link>
//                       </div>
//                     </div>
//                     <div id="image">
//                       <img
//                         className="h-[18rem] rounded-2xl w-full object-cover"
//                         src={post.featuredImage}
//                       />
//                     </div>
//                   </div>
//                 </article>
//               ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo } from "react";
import { Link } from "react-router";
import { getAllBlog } from "~/redux/features/blogSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { format, parseISO } from "date-fns";
import BlogGridSkeleton from "./blog-grid-skeleton";

export default function BlogSummary() {
  const dispatch = useAppDispatch();
  const { loading, dataList } = useAppSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlog({ token: "", cat: "posts" }));
  }, [dispatch]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    try {
      return format(parseISO(dateString), "MMMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const displayedPosts = useMemo(() => {
    const posts = dataList?.result || [];
    return [...posts].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [dataList]);

  if (loading || !dataList?.result) {
    return (
      <section className="bg-white py-16 sm:py-24">
        <div className="px-6 lg:px-8">
          <Header />
          <BlogGridSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="px-6 lg:px-8">
        <Header />

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {displayedPosts.map((post) => (
            <Article key={post.id} post={post} formatDate={formatDate} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Subcomponents --------------------------- */

function Header() {
  return (
    <div className="flex items-center gap-10 group">
      <h2 className="text-4xl font-semibold tracking-tight text-pretty text-indigo-600 sm:text-5xl">
        Blogs
      </h2>
      <Link
        to="/blogs"
        className="text-sm font-semibold text-red-600 transition-all inline-flex items-center gap-1 duration-300 group-hover:gap-1"
      >
        See more
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </div>
  );
}

function Article({
  post,
  formatDate,
}: {
  post: any;
  formatDate: (dateString?: string) => string;
}) {
  return (
    <article className="flex flex-col items-start justify-between p-2">
      {/* ✅ Image first on mobile, text first on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:[&>*:first-child]:order-1 [&>*:first-child]:order-2">
        {/* Image */}
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="h-[18rem] rounded-2xl w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] order-1 sm:order-2"
          />
        )}

        {/* Text */}
        <div className="order-2 sm:order-1">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt ?? post.createdAt)}
            </time>
            {post.categoryName && (
              <span className="rounded-full bg-gray-50 px-3 py-1.5 font-medium hover:bg-gray-100">
                {post.categoryName}
              </span>
            )}
            <span
              className={`rounded-full px-3 py-1.5 font-medium ${
                post.status === "published"
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  : "bg-gray-50 text-red-600 hover:bg-red-100"
              }`}
            >
              {post.status}
            </span>
          </div>

          {/* Title & Excerpt */}
          <div className="group relative mt-3">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600 text-justify">
              <Link to={`/blogs/${post.id}`}>
                <span className="absolute inset-0" />
                {post.title}
              </Link>
            </h3>
            <p className="mt-4 line-clamp-3 text-sm text-gray-600 leading-relaxed text-justify whitespace-pre-line">
              {post.excerpt}
            </p>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-4 py-4 border-t border-b border-gray-200 mb-6">
            {post.authorAvatar && (
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-medium text-gray-900">{post.authorName}</p>
              <p className="text-sm text-gray-600">
                {formatDate(post.publishedAt ?? post.createdAt)}
              </p>
            </div>
          </div>

          {/* Read More */}
          <Link
            to={`/blogs/${post.id}`}
            className="text-sm font-semibold text-red-600 transition-all inline-flex items-center gap-1 duration-300 group-hover:gap-1"
          >
            Read more
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
