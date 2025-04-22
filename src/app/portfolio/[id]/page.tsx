import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Item {
  title: string;
  description: string;
  mediaType: "image" | "video";
  files: string[];
}

const BASE_URL = "https://grafixr-backend.vercel.app";

interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function SinglePortfolioPage({
  params,
}: PageProps) {
  const { id } = params;
  const res = await fetch(`${BASE_URL}/portfolio/${id}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    return notFound();
  }
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.statusText}`);
  }

  const item: Item = await res.json();

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-screen-lg mx-auto p-6">
        <h1 className="text-3xl mb-4">{item.title}</h1>
        <p className="mb-6">{item.description}</p>

        {item.mediaType === "image" ? (
          item.files.map((url, i) => (
            <div key={i} className="mb-6">
              <Image
                src={url}
                alt={`${item.title} ${i + 1}`}
                width={800}
                height={600}
                className="object-contain w-full h-auto"
                priority={i === 0}
              />
            </div>
          ))
        ) : (
          <video
            src={item.files[0]}
            controls
            autoPlay
            className="w-full mb-6"
          />
        )}
      </div>
    </div>
  );
}