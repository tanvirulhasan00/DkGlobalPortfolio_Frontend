// // src/hooks/useInView.ts
// import { useEffect, useRef, useState } from "react";

// export function useInView<T extends HTMLElement>(
//   options?: IntersectionObserverInit
// ) {
//   const ref = useRef<T | null>(null);
//   const [isInView, setIsInView] = useState(false);

//   useEffect(() => {
//     const element = ref.current;
//     if (!element) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsInView(true);
//           observer.unobserve(entry.target); // uncomment to trigger only once
//         } else {
//           setIsInView(false);
//         }
//       },
//       { threshold: 0.2, ...options }
//     );

//     observer.observe(element);
//     return () => observer.disconnect();
//   }, [options]);

//   return { ref, isInView };
// }

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>({
  threshold = 0.1,
  rootMargin = "0px",
  once = false,
}: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
