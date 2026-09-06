import { useState, useEffect, useRef, lazy, Suspense, useMemo } from "react";

const lazyCache = new Map();

function getLazy(importFunc) {
  if (!lazyCache.has(importFunc)) {
    lazyCache.set(importFunc, lazy(importFunc));
  }
  return lazyCache.get(importFunc);
}

export default function LazySection({
  importFunc,
  fallback,
  id,
  className = "",
  rootMargin = "200px 0px 200px 0px",
}) {
  const [shouldLoad, setShouldLoad] = useState(() => {
    return typeof window === "undefined" || !("IntersectionObserver" in window);
  });
  const containerRef = useRef(null);

  const LazyComp = getLazy(importFunc);

  useEffect(() => {
    if (shouldLoad) return;
    
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldLoad(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, [rootMargin, shouldLoad]);

  return (
    <div ref={containerRef} id={id} className={`min-h-[300px] ${className}`}>
      {shouldLoad ? (
        <Suspense fallback={fallback}>
          <LazyComp />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
