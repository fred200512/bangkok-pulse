"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const BangkokMap = dynamic(() => import("./BangkokMap"), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      className="my-8 flex h-[430px] items-center justify-center rounded-3xl border border-white/15 bg-[#101516] text-white/60 sm:h-[530px]"
    >
      Loading map…
    </div>
  ),
});

const places = [
  {
    id: "bacc",
    name: "Bangkok Art and Culture Centre",
    category: "Culture",
    area: "Pathum Wan",
    description: "Make room for art in your next city afternoon.",
    accent: "#ff9676",
  },
  {
    id: "benjakitti",
    name: "Benjakitti Park",
    category: "Outdoors",
    area: "Khlong Toei",
    description: "A green escape surrounded by the Bangkok skyline.",
    accent: "#c6ff3d",
  },
  {
    id: "lumphini",
    name: "Lumphini Park",
    category: "Outdoors",
    area: "Pathum Wan",
    description: "Slow down and take a break from the city streets.",
    accent: "#78dcca",
  },
  {
    id: "museum-siam",
    name: "Museum Siam",
    category: "Culture",
    area: "Phra Nakhon",
    description: "Add a little discovery to your old-town exploration.",
    accent: "#c1b1ff",
  },
];

const categories = ["All", "Culture", "Outdoors"];

export default function ExploreSection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredPlaces = places.filter((place) => {
    const searchText =
      `${place.name} ${place.area} ${place.category}`.toLowerCase();

    const matchesSearch = searchText.includes(query.trim().toLowerCase());
    const matchesCategory =
      category === "All" || place.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section
      id="explore"
      aria-labelledby="explore-heading"
      className="scroll-mt-6 border-t border-white/10 py-16 sm:py-24"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#c6ff3d]">
        01 / Discover
      </p>

      <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <h2
          id="explore-heading"
          className="text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          Find your next stop.
        </h2>
        <p className="max-w-sm text-sm leading-6 text-white/60">
          Start with a small curated selection. Search by place,
          neighbourhood, or category.
        </p>
      </div>

      <div className="mt-8">
        <label
          htmlFor="place-search"
          className="mb-2 block text-sm text-white/70"
        >
          Search places
        </label>
        <input
          id="place-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try a park, culture, or Pathum Wan..."
          className="w-full rounded-2xl border border-white/20 bg-white/5 px-5 py-4 text-base text-white placeholder:text-white/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6ff3d]"
        />
      </div>

      <div
        role="group"
        aria-label="Filter places by category"
        className="mt-5 flex flex-wrap gap-3"
      >
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={`rounded-full border px-5 py-2.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6ff3d] ${
              category === item
                ? "border-[#c6ff3d] bg-[#c6ff3d] text-black"
                : "border-white/20 text-white/70 hover:border-white/50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p
        role="status"
        className="my-6 font-mono text-xs text-white/60"
      >
        {filteredPlaces.length}{" "}
        {filteredPlaces.length === 1 ? "place" : "places"} found
      </p>

<BangkokMap />
      <div className="grid gap-5 sm:grid-cols-2">
        {filteredPlaces.map((place) => (
          <article
            key={place.id}
            className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#101516] p-7"
          >
            <div
              aria-hidden="true"
              className="absolute -right-8 -top-8 size-36 rounded-full blur-3xl"
              style={{
                backgroundColor: place.accent,
                opacity: 0.12,
              }}
            />

            <p
              className="relative font-mono text-xs uppercase tracking-widest"
              style={{ color: place.accent }}
            >
              {place.category}
            </p>
            <h3 className="relative mt-6 text-2xl font-semibold tracking-tight">
              {place.name}
            </h3>
            <p className="mt-2 text-sm text-white/70">{place.area}</p>
            <p className="mt-5 text-sm leading-6 text-white/60">
              {place.description}
            </p>
          </article>
        ))}
      </div>

      {filteredPlaces.length === 0 && (
        <div className="rounded-3xl border border-dashed border-white/20 p-10 text-center">
          <h3 className="text-xl font-medium">No matching places</h3>
          <p className="mt-2 text-white/60">
            Try another search or reset your filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-5 rounded-full bg-[#c6ff3d] px-5 py-3 font-medium text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}