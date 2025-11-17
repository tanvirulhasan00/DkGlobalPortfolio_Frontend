import { useEffect } from "react";
import { Link } from "react-router";
import { getAllCertificate } from "~/redux/features/certificateSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { Skeleton } from "../ui/skeleton";

const CertificateSummary = () => {
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.certificate);

  const token = "";

  useEffect(() => {
    dispatch(getAllCertificate({ token }));
  }, []);

  const filterImages = data?.result?.filter(
    (item) => item?.searchText?.toLowerCase() === "certificate"
  );

  // Show loading skeletons when data is being fetched
  if (loading) {
    return (
      <div className="bg-white mt-10">
        <div className="mx-auto px-6 lg:px-10">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Our Certificates
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4"></div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 items-center">
            {/* Show 5 skeleton loaders */}
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-32 bg-gray-200 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show not found section when no certificates are available
  if (!filterImages || filterImages.length === 0) {
    return (
      <div className="bg-white mt-10">
        <div className="mx-auto px-6 lg:px-10">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Our Certificates
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4"></div>

          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Certificates Found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We're currently working on adding our certificates. Please check
              back soon to see our achievements and accreditations.
            </p>
            <button
              onClick={() => dispatch(getAllCertificate({ token }))}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white mt-10">
      <div className="mx-auto px-6 lg:px-10">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Our Certificates
        </h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4"></div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 items-center">
          {filterImages?.map((img) => (
            <img
              key={img?.id}
              alt="Transistor"
              src={img?.imageUrl}
              className=" w-full object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificateSummary;
