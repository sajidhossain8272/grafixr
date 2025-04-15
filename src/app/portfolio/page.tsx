"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  mediaType: "image" | "video";
  files: string[]; // array of file paths
  createdAt: string;
}

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // States for dynamic filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<string>("desc");

  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract filter values from the URL
  const mainCategory = searchParams.get("mainCategory") || "";
  const subCategory = searchParams.get("subCategory") || "";
  const searchParam = searchParams.get("search") || "";
  const sortByParam = searchParams.get("sortBy") || "createdAt";
  const sortOrderParam = searchParams.get("sortOrder") || "desc";

  // Sync local state with URL parameters on mount or URL change
  useEffect(() => {
    setSearchQuery(searchParam);
    setSortBy(sortByParam);
    setSortOrder(sortOrderParam);
  }, [searchParam, sortByParam, sortOrderParam]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        let url = `${
          process.env.NEXT_PUBLIC_API_URL ||
          "https://grafixr-backend.vercel.app"
        }/portfolio`;
        const params = new URLSearchParams();
        if (mainCategory) params.set("mainCategory", mainCategory);
        if (subCategory) params.set("subCategory", subCategory);
        if (searchParam) params.set("search", searchParam);
        if (sortByParam) params.set("sortBy", sortByParam);
        if (sortOrderParam) params.set("sortOrder", sortOrderParam);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load portfolio items");
        const data = await res.json();
        setPortfolioItems(data);
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

    fetchPortfolio();
  }, [mainCategory, subCategory, searchParam, sortByParam, sortOrderParam]);

  const handleItemClick = (id: string) => {
    router.push(`/portfolio/${id}`);
  };

  // Update URL parameters to apply new filters; this triggers a re-fetch
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (mainCategory) params.set("mainCategory", mainCategory);
    if (subCategory) params.set("subCategory", subCategory);
    if (searchQuery) params.set("search", searchQuery);
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    router.push(`/portfolio?${params.toString()}`);
  };

  if (loading) {
    return <div className='p-8 text-center'>Loading portfolio…</div>;
  }
  if (error) {
    return <div className='p-8 text-center text-red-600'>Error: {error}</div>;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold text-center mb-8'>Our Portfolio</h1>

      {/* Filter & Sort UI */}
      <div className='mb-8 flex flex-col sm:flex-row justify-center items-center gap-4'>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='p-2 border border-gray-300 rounded-md'
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className='p-2 border border-gray-300 rounded-md'
        >
          <option value='createdAt'>Date</option>
          <option value='title'>Title</option>
          {/* Add additional sort options as needed */}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className='p-2 border border-gray-300 rounded-md'
        >
          <option value='desc'>Descending</option>
          <option value='asc'>Ascending</option>
        </select>
        <button
          onClick={applyFilters}
          className='px-4 py-2 bg-blue-600 text-white rounded-md'
        >
          Apply Filters
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {portfolioItems.map((item) => {
          const firstFile =
            item.files && item.files.length > 0 ? item.files[0] : null;
          return (
            <div
              key={item._id}
              onClick={() => handleItemClick(item._id)}
              className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer'
            >
              <div className='relative w-full aspect-[16/9] bg-gray-200 overflow-hidden'>
                {item.mediaType === "image" && firstFile ? (
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_API_URL ||
                      "https://grafixr-backend.vercel.app"
                    }/${firstFile}`}
                    alt={item.title}
                    className='w-full h-full object-cover'
                  />
                ) : item.mediaType === "video" && firstFile ? (
                  <video
                    className='w-full h-full object-cover'
                    src={`${
                      process.env.NEXT_PUBLIC_API_URL ||
                      "https://grafixr-backend.vercel.app"
                    }/${firstFile}`}
                    poster='/video-placeholder.png'
                    autoPlay={false}
                    muted
                  />
                ) : (
                  <div className='flex items-center justify-center w-full h-full text-gray-500'>
                    No file
                  </div>
                )}
                <div className='absolute inset-0 bg-black opacity-0 hover:opacity-25 transition-opacity duration-300' />
              </div>
              <div className='p-4'>
                <h2 className='text-xl font-semibold'>{item.title}</h2>
                <p className='text-gray-600 text-sm mt-2'>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
