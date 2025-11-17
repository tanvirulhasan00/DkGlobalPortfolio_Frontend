import { motion, type Variants } from "motion/react";
import { isRouteErrorResponse } from "react-router";
import BlogSummary from "~/components/app-components/BlogSummary";
import ErrorPage from "~/components/app-components/ErrorPage";
import TeamSummary from "~/components/app-components/TeamSummary";
import ImageSlider from "~/components/image-slider/image-slider";
import type { Route } from "./+types/home";
import ClientSlider from "~/components/app-components/ClientSlider";
import ServiceSummary from "~/components/app-components/service-summary";
import CertificateSummary from "~/components/app-components/certificate-summary";
import { useInView } from "~/components/hook/useInView";
import { useEffect, useState } from "react";

/* --------------------------- Responsive animation --------------------------- */
// Adjust animation based on screen width (mobile vs desktop)
const useResponsiveVariants = (): Variants => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return {
    hidden: {
      opacity: 0,
      y: isMobile ? 25 : 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.45 : 0.8,
        ease: isMobile ? [0.4, 0.0, 0.2, 1] : "easeOut",
      },
    },
  };
};

/* --------------------------- Main component --------------------------- */

const Home = () => {
  const fadeUpVariants = useResponsiveVariants();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Each section gets its own ref + visibility state

  const serviceRef = useInView<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
    once: true,
  });
  const certificateRef = useInView<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
    once: true,
  });
  const blogRef = useInView<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
    once: true,
  });
  const teamRef = useInView<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
    once: true,
  });
  const clientRef = useInView<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
    once: true,
  });

  return (
    <div>
      {/* image slider (no animation) */}
      <section>
        <ImageSlider />
      </section>

      {/* service summary */}
      <motion.section
        ref={serviceRef.ref}
        variants={fadeUpVariants}
        initial="hidden"
        animate={
          isMobile ? "visible" : serviceRef.isInView ? "visible" : "hidden"
        }
      >
        <ServiceSummary />
      </motion.section>

      {/* certificate summary */}
      <motion.section
        ref={certificateRef.ref}
        variants={fadeUpVariants}
        initial="hidden"
        animate={certificateRef.isInView ? "visible" : "hidden"}
      >
        <CertificateSummary />
      </motion.section>

      {/* blog section */}
      <motion.section
        ref={blogRef.ref}
        variants={fadeUpVariants}
        initial="hidden"
        animate={blogRef.isInView ? "visible" : "hidden"}
      >
        <BlogSummary />
      </motion.section>

      {/* team section */}
      <motion.section
        ref={teamRef.ref}
        variants={fadeUpVariants}
        initial="hidden"
        animate={teamRef.isInView ? "visible" : "hidden"}
      >
        <TeamSummary />
      </motion.section>

      {/* client section */}
      <motion.section
        ref={clientRef.ref}
        variants={fadeUpVariants}
        initial="hidden"
        animate={clientRef.isInView ? "visible" : "hidden"}
      >
        <ClientSlider />
      </motion.section>
    </div>
  );
};

export default Home;

/* --------------------------- Error Boundary --------------------------- */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let status: number | undefined;
  let title = "Oops!";
  let message = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    title = error.status === 404 ? "404" : `Error ${error.status}`;
    message =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || message;
  } else if (import.meta.env.DEV && error instanceof Error) {
    message = error.message;
    stack = error.stack;
  }

  return (
    <ErrorPage status={status} title={title} message={message} stack={stack} />
  );
}
