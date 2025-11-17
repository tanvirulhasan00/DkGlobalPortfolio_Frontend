import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { format, parseISO } from "date-fns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { getAllBlog, getBlog } from "~/redux/features/blogSlice";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  authorId: number;
  authorName: string;
  authorAvatar: string;
  categoryId: number;
  categoryName: string;
  status: string;
  readingTime: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

const BlogDetails: React.FC = () => {
  const { id } = useParams();
  const blogId = Number(id);
  const token = "";
  const cat = "posts";
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { loading, data, dataList, refresh } = useAppSelector(
    (state) => state.blog
  );
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    // This only runs on the client
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const handleShare = (platform: string) => {
    if (!url) return;
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }

    // open in new tab
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  // Fetch blog post data
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        // setLoading(true);
        dispatch(getBlog({ token, blogId, cat }));
        dispatch(getAllBlog({ token, cat }));
      } catch (err) {
        setError("Failed to load blog post");
        console.error("Error fetching blog post:", err);
      } finally {
        // setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  console.log("data-list", dataList?.result);

  if (error || loading || !data?.result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Blog post not found
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "The blog post you're looking for doesn't exist."}
          </p>
          <Link
            to="/blogs"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            to="/blogs"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Blog
          </Link>
        </nav>

        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Featured Image */}
          {data?.result?.featuredImage && (
            <div className="w-full h-64 md:h-96 overflow-hidden">
              <img
                src={data?.result?.featuredImage}
                alt={data?.result?.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Category and Reading Time */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {data?.result?.categoryName}
              </span>
              <span>•</span>
              <span>{data?.result?.readingTime} min read</span>
              <span>•</span>
              <span>
                {formatDate(
                  data?.result?.publishedAt ?? data?.result?.createdAt
                )}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {data?.result?.title}
            </h1>

            {/* Excerpt */}
            {data?.result?.excerpt && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {data?.result?.excerpt}
              </p>
            )}

            {/* Author Info */}
            <div className="flex items-center gap-4 py-4 border-t border-b border-gray-200 mb-6">
              <img
                src={data?.result?.authorAvatar}
                alt={data?.result?.authorName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">
                  {data?.result?.authorName}
                </p>
                <p className="text-sm text-gray-600">
                  {formatDate(
                    data?.result?.publishedAt ?? data?.result?.createdAt
                  )}
                </p>
              </div>
            </div>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{
                __html: data?.result?.content ?? "",
              }}
            />

            {/* Tags */}
            {data?.result?.tags && data?.result?.tags?.length > 0 && (
              <div className="py-6 border-t border-gray-200">
                <h3 className="font-semibold text-lg mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {data?.result?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Share this post
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={() => handleShare("twitter")}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  Twitter
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Author Bio */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
          <div className="flex items-start gap-6">
            <img
              src={data?.result?.authorAvatar}
              alt={data?.result?.authorName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                About {data?.result?.authorName}
              </h3>
              <p className="text-gray-600 mt-2 leading-relaxed text-justify whitespace-pre-line">
                {data?.result?.authorBio}
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {[...(dataList?.result || [])].length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...(dataList?.result || [])]
                .filter((post) => post.slug !== data?.result?.slug) // exclude current article
                .sort(() => 0.5 - Math.random()) // shuffle safely
                .slice(0, 2) // limit to 2
                .map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {post.featuredImage && (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {formatDate(post.publishedAt ?? post.createdAt)}
                        </span>
                        <Link
                          to={`/blogs/${post?.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                        >
                          Read more
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
