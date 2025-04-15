"use client";
import React from "react";

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
  API_URL: string;
}

/**
 * Renders a simple list (table‐like) of portfolio items with delete buttons.
 * Each item shows a small thumbnail (if available).
 */
export default function AdminList({ items, loading, onDelete, API_URL }: AdminListProps) {
  if (loading) {
    return <div className="text-center p-4">Loading items...</div>;
  }

  if (items.length === 0) {
    return <div className="text-center text-gray-600 p-4">No portfolio items found.</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Existing Portfolio Items</h2>
      <div className="divide-y divide-gray-200">
        {items.map((item) => {
          const thumbnail = item.files.length > 0 ? item.files[0] : "";
          return (
            <div key={item._id} className="py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-200 flex-shrink-0 rounded overflow-hidden">
                  {item.mediaType === "image" && thumbnail ? (
                    <img
                      src={`${API_URL}/${thumbnail}`}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : item.mediaType === "video" && thumbnail ? (
                    <video
                      src={`${API_URL}/${thumbnail}`}
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
                  <h3 className="text-lg font-semibold">{item.title}</h3>
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
