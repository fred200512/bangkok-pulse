"use client";

import { useEffect, useRef } from "react";
import {
  Map,
  Marker,
  NavigationControl,
  Popup,
  setWorkerUrl,
} from "maplibre-gl";

type MapPlace = {
  id: string;
  name: string;
  category: string;
  area: string;
  accent: string;
  longitude: number;
  latitude: number;
};

type BangkokMapProps = {
  places: MapPlace[];
  mapTarget: {
    id: string;
    request: number;
  } | null;
};

export default function BangkokMap({
  places,
  mapTarget,
}: BangkokMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  // Create the map when this component mounts.
  useEffect(() => {
    if (!containerRef.current) return;

    setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

    const map = new Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/dark",
      center: [100.53, 13.74],
      zoom: 11.5,
      pitch: 20,
      bearing: 0,
      cooperativeGestures: true,
    });

    mapRef.current = map;

    // Supply the texture missing from the map style.
    map.setMissingStyleImageResolver((id) => {
      if (id !== "wood-pattern" || map.hasImage(id)) return;

      const size = 8;
      const pixels = new Uint8Array(size * size * 4);

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const offset = (y * size + x) * 4;
          const stripe = (x + y) % 4 === 0;

          pixels[offset] = stripe ? 37 : 29;
          pixels[offset + 1] = stripe ? 48 : 39;
          pixels[offset + 2] = stripe ? 39 : 32;
          pixels[offset + 3] = 255;
        }
      }

      map.addImage(id, {
        width: size,
        height: size,
        data: pixels,
      });
    });

    map.addControl(new NavigationControl(), "top-right");

    const observer = new ResizeObserver(() => {
      map.resize();
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Keep markers in sync with the filtered places.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const markers = places.map((place) => {
      const content = document.createElement("div");
      content.style.color = "#111827";
      content.style.padding = "6px";
      content.style.maxWidth = "220px";

      const title = document.createElement("strong");
      title.textContent = place.name;
      title.style.display = "block";
      title.style.fontSize = "14px";

      const detail = document.createElement("p");
      detail.textContent = `${place.category} · ${place.area}`;
      detail.style.marginTop = "6px";

      content.append(title, detail);

      const popup = new Popup({ offset: 28 }).setDOMContent(content);

      const marker = new Marker({ color: place.accent })
        .setLngLat([place.longitude, place.latitude])
        .setPopup(popup)
        .addTo(map);

      marker.getElement().setAttribute(
        "aria-label",
        `Show details for ${place.name}`,
      );

      return marker;
    });

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [places]);

  // Find the requested place among the visible results.
  const targetPlace = mapTarget
    ? places.find((place) => place.id === mapTarget.id)
    : undefined;

  const targetLongitude = targetPlace?.longitude;
  const targetLatitude = targetPlace?.latitude;
  const targetRequest = mapTarget?.request;

  // Move the camera when a card's button requests a location.
  // Depending on coordinates avoids moving again on every search edit.
  useEffect(() => {
    const map = mapRef.current;

    if (
      !map ||
      targetLongitude === undefined ||
      targetLatitude === undefined
    ) {
      return;
    }

    map.flyTo({
      center: [targetLongitude, targetLatitude],
      zoom: 15,
      pitch: 35,
      duration: 1200,
    });
  }, [targetLongitude, targetLatitude, targetRequest]);

  // Button handlers contain ordinary functions, not React hooks.
  function returnToBangkok() {
    mapRef.current?.flyTo({
      center: [100.53, 13.74],
      zoom: 11.5,
      pitch: 20,
      bearing: 0,
    });
  }

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-white/15 bg-[#101516]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
        <div>
          <h3 className="font-semibold text-white">
            Bangkok on the map
          </h3>

          <p className="mt-1 text-xs text-white/60">
            {places.length} matching{" "}
            {places.length === 1 ? "place" : "places"} · Select a marker
            for details
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
        aria-label="Interactive Bangkok map showing matching places"
        className="h-[360px] w-full sm:h-[460px]"
      />

      {places.length === 0 && (
        <p className="border-t border-white/10 px-5 py-4 text-sm text-white/70">
          No places match your filters. Reset them to restore the markers.
        </p>
      )}
    </div>
  );
}