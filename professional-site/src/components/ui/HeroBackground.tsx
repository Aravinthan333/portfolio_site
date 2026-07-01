"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  videoSrc?: string;
  posterSrc?: string;
};

export function HeroBackground({
  videoSrc = "/videos/hero-bg.mp4",
  posterSrc = "/images/hero-poster.svg",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setVideoReady(true);
    const onError = () => setVideoReady(false);

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    video.play().catch(() => setVideoReady(false));

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, []);

  return (
    <div className="hero-bg" aria-hidden>
      <video
        ref={videoRef}
        className={`hero-bg-video ${videoReady ? "is-visible" : ""}`}
        autoPlay
        muted
        loop
        playsInline
        poster={posterSrc}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="hero-bg-mesh" />
      <div className="hero-bg-grid" />
      <div className="hero-bg-glow" />
      <div className="hero-bg-overlay" />
    </div>
  );
}
