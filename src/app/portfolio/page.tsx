// src/app/portfolio/page.tsx
import Image from "next/image";
import Link from "next/link";

// 1) Define your item type
interface Item {
  _id: string;
  title: string;
  description: string;
  mediaType: "image" | "video";
  files: string[];
}

// 2) Props include searchParams
type Props = {
  searchParams: {
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  };
};

const BASE_URL = "https://grafixr-backend.vercel.app";

export default async function PortfolioPage({ searchParams }: Props) {
  // 3) Destructure with defaults
  const {
    search = "",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = searchParams;

  // 4) Build query for fetch
  const params = new URLSearchParams();
  if (search)   params.set("search", search);
                params.set("sortBy", sortBy);
                params.set("sortOrder", sortOrder);

  const url = `${BASE_URL}/portfolio?${params.toString()}`;

  // 5) Fetch on the server (this runs at build or on‑demand SSR / ISR)
  const res = await fetch(url, { next: { revalidate: 60 } });
  const items: Item[] = res.ok ? await res.json() : [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl mb-4">Our Portfolio</h1>

      {/* 6) A GET form to update the URL and re‑render the page */}
      <form method="get" className="flex gap-2 mb-4">
        <input
          name="search"
          defaultValue={search}
          placeholder="Search…"
          className="border p-2"
        />
        <select
          name="sortBy"
          defaultValue={sortBy}
          className="border p-2"
        >
          <option value="createdAt">Date</option>
          <option value="title">Title</option>
        </select>
        <select
          name="sortOrder"
          defaultValue={sortOrder}
          className="border p-2"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4">
          Apply
        </button>
      </form>

      {/* 7) Display grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((it) => (
          <Link
            key={it._id}
            href={`/portfolio/${it._id}`}
            className="block cursor-pointer bg-white shadow rounded overflow-hidden"
          >
            {it.mediaType === "image" && it.files[0] && (
              <Image
                src={it.files[0]}
                alt={it.title}
                width={400}
                height={250}
                className="object-cover"
              />
            )}
            {it.mediaType === "video" && it.files[0] && (
              <video
                src={it.files[0]}
                className="w-full h-48 object-cover"
                muted
                controls
              />
            )}
            <div className="p-4">
              <h2 className="font-semibold">{it.title}</h2>
              <p className="text-gray-600 text-sm">{it.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
