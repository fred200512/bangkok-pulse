"use client";

import { useEffect, useRef } from "react";
import { Map, NavigationControl, setWorkerUrl } from "maplibre-gl";

export default function BangkokMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

    const map = new Map({
      container: containerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [100.5018, 13.7563],
      zoom: 5,
      cooperativeGestures: true,
    });

    mapRef.current = map;

    map.addControl(
      new NavigationControl({ showCompass: true }),
      "top-right",
    );

    const observer = new ResizeObserver(() => map.resize());
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  function returnToBangkok() {
    mapRef.current?.flyTo({
      center: [100.5018, 13.7563],
      zoom: 5,
    });
  }

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-white/15 bg-[#101516]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
        <div>
          <h3 className="font-semibold text-white">Bangkok on the map</h3>
          <p className="mt-1 text-xs text-white/60">
            Development preview · Demo map tiles
          </p>
        </div>

        <button
          type="button"
          onClick={returnToBangkok}
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-[#c6ff3d] hover:text-[#c6ff3d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6ff3d]"
        >
          Return to Bangkok
        </button>
      </div>

      <div
        ref={containerRef}
        role="region"
        aria-label="Interactive map centred on Bangkok"
        className="h-[360px] w-full sm:h-[460px]"
      />
    </div>
  );
}