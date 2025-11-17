import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { getAllClientTestimonial } from "~/redux/features/clientTestimonialSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";

export default function ClientTestimonialSlider() {
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.clientTestimonial);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(getAllClientTestimonial({ token: "" }));
  }, [dispatch]);

  const testimonials = data?.result ?? [];
  const visibleCount = 3;

  const slidePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const slideNext = () => {
    setActiveIndex((prev) =>
      testimonials.length > 0 ? (prev + 1) % testimonials.length : 0
    );
  };

  const visibleTestimonials =
    testimonials.slice(activeIndex, activeIndex + visibleCount).length ===
    visibleCount
      ? testimonials.slice(activeIndex, activeIndex + visibleCount)
      : [
          ...testimonials.slice(activeIndex),
          ...testimonials.slice(
            0,
            visibleCount - (testimonials.length - activeIndex)
          ),
        ];

  // ✅ Loading state
  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xl text-gray-600 animate-pulse">
            Loading testimonials...
          </p>
        </div>
      </section>
    );
  }

  // ✅ Empty state
  if (!testimonials.length) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xl text-gray-600">No testimonials found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Client <span className="text-pink-600">Testimonials</span>
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Trusted by fashion brands worldwide
        </p>

        {/* Slider Wrapper */}
        <div className="relative">
          <div className="flex justify-center gap-8 transition-transform duration-500 ease-in-out">
            {visibleTestimonials.map((testimonial) => {
              const rating = Number(testimonial?.reviewStars) || 0;
              const fullStars = Math.floor(rating);
              const hasHalf = rating % 1 >= 0.5;

              return (
                <div
                  key={testimonial?.id}
                  className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-500 w-full max-w-sm flex-shrink-0"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial?.imageUrl}
                      alt={testimonial?.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {testimonial?.name}
                      </h4>
                      <p className="text-pink-600 text-sm">
                        {testimonial?.companyName}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 italic mb-4">
                    "{testimonial?.message}"
                  </p>

                  {/* ⭐ Rating */}
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < fullStars
                            ? "fill-current"
                            : hasHalf && i === fullStars
                              ? "fill-current opacity-50"
                              : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-500 text-sm">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > visibleCount && (
            <>
              <button
                onClick={slidePrev}
                className="absolute -left-20 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-pink-100 transition"
              >
                <ChevronLeft className="w-6 h-6 text-pink-600" />
              </button>

              <button
                onClick={slideNext}
                className="absolute -right-20 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-pink-100 transition"
              >
                <ChevronRight className="w-6 h-6 text-pink-600" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
