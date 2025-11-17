import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllClientTestimonial } from "~/redux/features/clientTestimonialSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";

export default function ClientTestimonialSlider() {
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.clientTestimonial);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: next, 1: prev

  useEffect(() => {
    dispatch(getAllClientTestimonial({ token: "" }));
  }, [dispatch]);

  const testimonials = data?.result ?? [];
  const visibleCount = 3;

  const slidePrev = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const slideNext = () => {
    setDirection(0);
    setActiveIndex((prev) =>
      testimonials.length > 0 ? (prev + 1) % testimonials.length : 0
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 0 : 1);
    setActiveIndex(index);
  };

  // Get visible testimonials for the carousel
  const getVisibleTestimonials = () => {
    if (testimonials.length <= visibleCount) {
      return testimonials;
    }

    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (activeIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  // Animation variants for one-by-one sliding
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction === 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction === 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    }),
  };

  // Stagger animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      backgroundColor: "rgb(253, 242, 248)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  // Auto-slide effect
  //   useEffect(() => {
  //     if (testimonials.length > visibleCount) {
  //       const interval = setInterval(() => {
  //         slideNext();
  //       }, 4000); // Change every 4 seconds

  //       return () => clearInterval(interval);
  //     }
  //   }, [testimonials.length, activeIndex]);

  // ✅ Loading state
  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-100">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading testimonials...
          </motion.p>
        </div>
      </section>
    );
  }

  // ✅ Empty state
  if (!testimonials.length) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-100">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            No testimonials found.
          </motion.p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Client <span className="text-pink-600">Testimonials</span>
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Trusted by fashion brands worldwide
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative h-80 md:h-72">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={activeIndex}
              className="flex justify-center gap-6 md:gap-8 absolute inset-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {visibleTestimonials.map((testimonial, index) => {
                const rating = Number(testimonial?.reviewStars) || 0;
                const fullStars = Math.floor(rating);
                const hasHalf = rating % 1 >= 0.5;

                return (
                  <motion.div
                    key={`${testimonial?.id}-${index}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-sm flex-shrink-0"
                    style={{
                      zIndex: visibleCount - index, // Stack cards properly
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -8,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <motion.div
                      className="flex items-center mb-4"
                      variants={itemVariants}
                    >
                      <motion.img
                        src={testimonial?.imageUrl}
                        alt={testimonial?.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {testimonial?.name}
                        </h4>
                        <p className="text-pink-600 text-sm">
                          {testimonial?.companyName}
                        </p>
                      </div>
                    </motion.div>

                    <motion.p
                      className="text-gray-600 italic mb-4"
                      variants={itemVariants}
                    >
                      "{testimonial?.message}"
                    </motion.p>

                    {/* ⭐ Rating */}
                    <motion.div
                      className="flex items-center text-yellow-400"
                      variants={itemVariants}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.3 + i * 0.1,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              i < fullStars
                                ? "fill-current"
                                : hasHalf && i === fullStars
                                  ? "fill-current opacity-50"
                                  : "text-gray-300"
                            }`}
                          />
                        </motion.div>
                      ))}
                      <motion.span
                        className="ml-2 text-gray-500 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        {rating.toFixed(1)}
                      </motion.span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {testimonials.length > visibleCount && (
          <>
            <motion.button
              onClick={slidePrev}
              className="absolute left-4 sm:left-20 top-2/3 sm:top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-pink-100 transition z-20"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <ChevronLeft className="w-6 h-6 text-pink-600" />
            </motion.button>

            <motion.button
              onClick={slideNext}
              className="absolute right-4 sm:right-20 top-2/3 sm:top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-pink-100 transition z-20"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <ChevronRight className="w-6 h-6 text-pink-600" />
            </motion.button>
          </>
        )}

        {/* Dots Indicator */}
        {testimonials.length > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? "bg-pink-600" : "bg-gray-300"
                }`}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: index === activeIndex ? 1.2 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
