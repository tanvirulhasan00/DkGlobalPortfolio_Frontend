import { format, parseISO } from "date-fns";
import { useEffect } from "react";
import { Link } from "react-router";
import BlogAllGridSkeleton from "~/components/app-components/blog-skeleton";
import { getAllBlog } from "~/redux/features/blogSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";

export default function Blog() {
  const dispatch = useAppDispatch();
  const { loading, dataList, refresh } = useAppSelector((state) => state.blog);
  const token = "";
  const cat = "posts";

  useEffect(() => {
    dispatch(getAllBlog({ token, cat }));
  }, []);
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMMM dd, yyyy");
    } catch {
      return dateString;
    }
  };
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="w-full px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            From the blog lists
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        {loading || !dataList?.result ? (
          <BlogAllGridSkeleton />
        ) : (
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
            {dataList?.result?.map((post) => (
              <article
                key={post.id}
                className="flex flex-col items-start justify-between p-2 border hover:scale-[1.01] transition-all duration-500 rounded-md shadow-2xl "
              >
                <div className="flex gap-5 items-center flex-col-reverse">
                  <div>
                    <div className="flex items-center gap-x-4 text-xs">
                      <time
                        dateTime={post?.publishedAt}
                        className="text-gray-500"
                      >
                        {formatDate(post?.publishedAt ?? post?.createdAt)}
                      </time>
                      <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                        {post?.categoryName}
                      </p>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <Link to={`/blogs/${post.id}`}>
                          <span className="absolute inset-0" />
                          {post?.title}
                        </Link>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                        {post?.excerpt}
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <img
                        alt={post?.authorName}
                        src={post?.authorAvatar}
                        className="size-10 rounded-full bg-gray-50"
                      />
                      <div className="text-sm/6">
                        <p className="font-semibold text-gray-900">
                          <p>
                            <span className="absolute inset-0" />
                            {post.authorName}
                          </p>
                        </p>
                        <p className="text-gray-600">
                          {formatDate(post.publishedAt ?? post?.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5">
                      <Link
                        to={`/blogs/${post.id}`}
                        className="text-sm/6 font-semibold text-red-600"
                      >
                        Read more
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                  <div id="image">
                    <img
                      src={post.featuredImage}
                      className="h-[20rem] w-full object-center rounded-md"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
