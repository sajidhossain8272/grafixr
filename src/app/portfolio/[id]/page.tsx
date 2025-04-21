"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Item {
  title: string;
  description: string;
  mediaType: "image" | "video";
  files: string[];
}

export default function SinglePortfolioPage() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchItem() {
      try {
        const res = await fetch(`/api/portfolio/${id}`);
        if (!res.ok) throw new Error("Not found");
        setItem(await res.json());
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-screen-lg mx-auto p-6">
        <h1 className="text-3xl mb-4">{item.title}</h1>
        <p className="mb-6">{item.description}</p>

        {item.mediaType === "image" ? (
          item.files.map((u, i) => (
            <img
              key={i}
              src={u}
              alt={`${item.title} ${i}`}
              className="w-full mb-6"
            />
          ))
        ) : (
          <video src={item.files[0]} controls autoPlay className="w-full" />
        )}
      </div>
    </div>
  );
}
