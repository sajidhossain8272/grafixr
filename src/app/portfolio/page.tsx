"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Item {
  _id: string;
  title: string;
  description: string;
  mediaType: "image" | "video";
  files: string[];
}

export default function PortfolioPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setSortBy(searchParams.get("sortBy") || "createdAt");
    const sortOrderValue = searchParams.get("sortOrder");
    setSortOrder(sortOrderValue === "asc" || sortOrderValue === "desc" ? sortOrderValue : "desc");
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      try {
        let url = `/api/portfolio`;
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        params.set("sortBy", sortBy);
        params.set("sortOrder", sortOrder);
        if ([...params].length) url += `?${params}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load");
        setItems(await res.json());
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [search, sortBy, sortOrder]);

  const apply = () => {
    const qs = new URLSearchParams();
    if (search) qs.set("search", search);
    qs.set("sortBy", sortBy);
    qs.set("sortOrder", sortOrder);
    router.push(`/portfolio?${qs}`);
  };

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl mb-4">Our Portfolio</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search…"
          className="border p-2"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2"
        >
          <option value="createdAt">Date</option>
          <option value="title">Title</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value as "asc" | "desc")
          }
          className="border p-2"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <button onClick={apply} className="bg-blue-600 text-white px-4">
          Apply
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((it) => (
          <div
            key={it._id}
            onClick={() => router.push(`/portfolio/${it._id}`)}
            className="cursor-pointer bg-white shadow rounded overflow-hidden"
          >
            {it.mediaType === "image" && it.files[0] && (
              <img
                src={it.files[0]}
                alt={it.title}
                className="w-full h-48 object-cover"
              />
            )}
            {it.mediaType === "video" && it.files[0] && (
              <video
                src={it.files[0]}
                className="w-full h-48 object-cover"
                muted
                controls={false}
              />
            )}
            <div className="p-4">
              <h2 className="font-semibold">{it.title}</h2>
              <p className="text-gray-600 text-sm">{it.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
