"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ConfiguratorSectionProps {
  kicker: string;
  title: string;
  description: string;
  bullets: string[];
  cta1Text: string;
  cta2Text: string;
  videoLabel: string;
  videoId: string;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  destroy: () => void;
}

export function ConfiguratorSection({
  kicker,
  title,
  description,
  bullets,
  cta1Text,
  cta2Text,
  videoLabel,
  videoId,
}: ConfiguratorSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const initPlayer = useCallback(() => {
    if (typeof window !== "undefined" && window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player("cfg-yt-player", {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          mute: 1,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          controls: 1,
        },
        events: {
          onReady: () => {
            setPlayerReady(true);
            if (playerRef.current) {
              playerRef.current.mute();
            }
          },
        },
      });
    }
  }, [videoId]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = initPlayer;

    if (window.YT && window.YT.Player) {
      initPlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [initPlayer]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      videoObserver.observe(sectionRef.current);
    }

    return () => videoObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!playerReady || !playerRef.current) return;

    if (isInViewport) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isInViewport, playerReady]);

  return (
    <section
      ref={sectionRef}
      className="atm-quiet py-20 md:py-32 px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Text Content */}
        <div
          className={`max-w-[520px] transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-[10px] md:text-xs tracking-[0.3em] text-white/45 mb-3">
            {kicker}
          </p>
          <h2 className="text-xl md:text-[28px] tracking-[0.12em] font-semibold mb-5 leading-tight">
            {title}
          </h2>
          <p className="text-white/75 text-sm md:text-[15px] leading-[1.65] mb-7">
            {description}
          </p>
          <div className="space-y-2.5">
            {bullets.map((txt, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60 mt-[7px] flex-shrink-0" />
                <p className="text-white/70 text-sm leading-relaxed">{txt}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#booking"
              className="btn-primary px-10 py-3 rounded-full text-xs tracking-[0.2em] font-semibold bg-white text-black border border-white whitespace-nowrap inline-flex items-center justify-center"
            >
              {cta1Text}
            </a>
            <a
              href="#projects"
              className="btn-secondary px-10 py-3 rounded-full text-xs tracking-[0.2em] font-medium text-white/80 border border-white/20 hover:border-white/40 hover:text-white whitespace-nowrap inline-flex items-center justify-center"
            >
              {cta2Text}
            </a>
          </div>
        </div>

        {/* Video */}
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <p className="cfg-video-label">{videoLabel}</p>
          <div className="cfg-video-wrapper">
            <div id="cfg-yt-player" className="w-full aspect-video" />
          </div>
        </div>
      </div>
    </section>
  );
}
