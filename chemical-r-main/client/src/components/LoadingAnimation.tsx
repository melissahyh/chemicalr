import React, { useEffect, useState } from "react";

export default function LoadingAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if loading animation has already played in this session
    const hasPlayed = sessionStorage.getItem("cr-loader-played");
    if (hasPlayed) {
      setIsVisible(false);
      setShouldRender(false);
      return;
    }

    // Play animation for 2.5 seconds, then fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("cr-loader-played", "true");
    }, 2500);

    // Completely remove from DOM after fade out completes (0.5s)
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 3000);

    // Fallback safety: auto-dismiss after 4 seconds regardless
    const fallbackTimer = setTimeout(() => {
      setIsVisible(false);
      setShouldRender(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#EFE1D3] transition-opacity duration-500 ease-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Revolving Hearts Container */}
        <div className="relative w-24 h-24 animate-[spin_4s_linear_infinite]">
          {/* Heart 1 */}
          <div className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center animate-[pulse_1.5s_ease-in-out_infinite]">
            <span className="text-4xl select-none" style={{ color: "#7F0F1D" }}>
              ❤️
            </span>
          </div>
          {/* Heart 2 */}
          <div className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center animate-[pulse_1.5s_ease-in-out_infinite_0.75s]">
            <span className="text-4xl select-none" style={{ color: "#7F0F1D" }}>
              ❤️
            </span>
          </div>
        </div>

        {/* Brand Text below the revolving hearts */}
        <div className="absolute bottom-0 flex flex-col items-center">
          <h1 className="font-serif text-2xl tracking-[0.2em] text-[#330505] font-light">
            CHEMICAL <span className="italic font-normal font-serif">R</span>
          </h1>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#665555] mt-1">
            SINGAPORE
          </p>
        </div>
      </div>
    </div>
  );
}
