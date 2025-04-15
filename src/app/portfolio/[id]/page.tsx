"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  mediaType: "image" | "video";
  files: string[];
  createdAt: string;
}

export default function SinglePortfolioPage() {
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams(); // from [id]
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://grafixr-backend.vercel.app";

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`${API_URL}/portfolio/${id}`);
        if (!res.ok) throw new Error("Failed to load item");
        const data = await res.json();
        setItem(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchItem();
  }, [API_URL, id]);

  if (loading) {
    return <div className='p-8 text-center'>Loading item…</div>;
  }
  if (error) {
    return <div className='p-8 text-center text-red-600'>Error: {error}</div>;
  }
  if (!item) {
    return <div className='p-8 text-center'>Item not found.</div>;
  }

  // If this is an image item with multiple files, we display them all in vertical scroll
  // If it’s a video, display a single video.
  return (
    <div className='w-screen h-screen overflow-y-auto bg-black text-white'>
      <div className='max-w-screen-xl mx-auto py-8 px-4'>
        <h1 className='text-3xl font-bold mb-4'>{item.title}</h1>
        <p className='text-gray-300 mb-6'>{item.description}</p>

        {item.mediaType === "image" ? (
          <div className='flex flex-col space-y-8'>
            {item.files.map((filePath, index) => (
              <img
                key={index}
                src={`${API_URL}/${filePath}`}
                alt={`${item.title} - ${index}`}
                className='w-full h-screen object-cover'
              />
            ))}
          </div>
        ) : (
          // For video, we assume a single file
          <video
            src={`${API_URL}/${item.files[0]}`}
            className='w-full h-auto max-h-screen'
            controls
            autoPlay
          />
        )}
      </div>
    </div>
  );
}
