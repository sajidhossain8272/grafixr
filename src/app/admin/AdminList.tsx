"use client";

import React from "react";
import Image from "next/image";

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

interface AdminListProps {
  items: PortfolioItem[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function AdminList({
  items,
  loading,
  onDelete,
}: AdminListProps) {
  if (loading) {
    return <div className="text-center p-4">Loading items...</div>;
  }
  if (!items.length) {
    return (
      <div className="text-center text-gray-600 p-4">
        No portfolio items found.
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Existing Portfolio Items
      </h2>
      <div className="divide-y divide-gray-200">
        {items.map((item) => {
          const thumb = item.files[0] || "";
          return (
            <div
              key={item._id}
              className="py-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                  {thumb && item.mediaType === "image" ? (
                    <Image
                      src={thumb}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : thumb && item.mediaType === "video" ? (
                    <video
                      src={thumb}
                      className="w-full h-full object-cover"
                      muted
                      controls={false}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500">
                      No preview
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.mainCategory} / {item.subCategory}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDelete(item._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
