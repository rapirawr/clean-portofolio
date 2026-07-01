import { useEffect, useRef, useState } from "react";

export function Loader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  // Track timers so we can clean them up on unmount
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => {
      setIsLoaded(true);
      const t2 = setTimeout(() => {
        setIsHidden(true);
        document.body.style.overflow = "";
      }, 1000);
      timers.current.push(t2);
    }, 2000);

    timers.current.push(t1);

    return () => {
      // Always restore scroll on cleanup (unmount, HMR, etc.)
      timers.current.forEach(clearTimeout);
      timers.current = [];
      document.body.style.overflow = "";
    };
  }, []);

  if (isHidden) return null;

  return (
    <div className={`loader ${isLoaded ? "loader--loaded" : ""}`}>
      <div className="loader__content">
        <div className="loading-svg">
          <svg height="48px" width="64px">
            <polyline id="back" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"></polyline>
            <polyline id="front" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"></polyline>
          </svg>
        </div>
      </div>
      <div className="loader__overlay loader__overlay--top"></div>
      <div className="loader__overlay loader__overlay--bottom"></div>
    </div>
  );
}
