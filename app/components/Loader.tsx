import { useEffect, useState } from "react";

export function Loader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Simulate load time
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => {
        setIsHidden(true);
        document.body.style.overflow = '';
      }, 1000);
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
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
