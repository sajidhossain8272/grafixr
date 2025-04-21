"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import AdminNavigation from "./AdminNavigation";
import AdminUploadForm from "./AdminUploadForm";
import AdminList from "./AdminList";
import AdminCategories from "./AdminCategories";
import { uploadImageToFirebase } from "./uploadImageToFirebase";

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

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "list" | "categories">(
    "upload"
  );

  // upload form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // list state
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [listLoading, setListLoading] = useState(false);

  // categories state
  const [categoriesMap, setCategoriesMap] = useState<Record<string, string[]>>(
    {}
  );

  // always fetch against our same‑origin `/api`
  const API = "/api";

  useEffect(() => {
    // load items
    async function loadItems() {
      setListLoading(true);
      try {
        const res = await fetch(`${API}/admin/list`);
        const data = await res.json();
        setItems(data);
      } finally {
        setListLoading(false);
      }
    }
    // load categories
    async function loadCats() {
      const res = await fetch(`${API}/admin/categories`);
      const data = await res.json();
      const map: Record<string, string[]> = {};
      data.forEach((c: any) => {
        map[c.mainCategory] = c.subCategories;
      });
      setCategoriesMap(map);
      // pick defaults
      const mains = Object.keys(map);
      if (mains.length && !mainCategory) {
        setMainCategory(mains[0]);
        setSubCategory(map[mains[0]][0] || "");
      }
    }

    loadItems();
    loadCats();
  }, []);

  // handlers
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(e.target.files);
    if (mediaType === "image") {
      setPreviewUrls(
        Array.from(e.target.files).map((f) => URL.createObjectURL(f))
      );
    } else {
      setPreviewUrls([URL.createObjectURL(e.target.files[0])]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      setError("Please select a file.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // 1) upload to Firebase
      const urls = await Promise.all(
        Array.from(files).map((f) => uploadImageToFirebase(f, "portfolio"))
      );

      // 2) send to backend
      const res = await fetch(`${API}/admin/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          mainCategory,
          subCategory,
          mediaType,
          files: urls,
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Upload failed");
      setSuccess("Uploaded successfully!");
      // clear form
      setTitle("");
      setDescription("");
      const mains = Object.keys(categoriesMap);
      if (mains.length) {
        setMainCategory(mains[0]);
        setSubCategory(categoriesMap[mains[0]][0] || "");
      }
      setMediaType("image");
      setFiles(null);
      setPreviewUrls([]);
      // reload list
      const listRes = await fetch(`${API}/admin/list`);
      setItems(await listRes.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mx-auto max-w-7xl">
      <AdminNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "upload" && (
        <AdminUploadForm
          title={title}
          description={description}
          mainCategory={mainCategory}
          subCategory={subCategory}
          mediaType={mediaType}
          previewUrls={previewUrls}
          loading={loading}
          error={error}
          success={success}
          categoriesMap={categoriesMap}
          handleTitleChange={setTitle}
          handleDescriptionChange={setDescription}
          handleMainCategoryChange={setMainCategory}
          handleSubCategoryChange={setSubCategory}
          handleMediaTypeChange={setMediaType}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
        />
      )}

      {activeTab === "list" && (
        <AdminList items={items} loading={listLoading} />
      )}

      {activeTab === "categories" && (
        <AdminCategories
          categoriesMap={categoriesMap}
          refresh={() => window.location.reload()}
        />
      )}
    </div>
  );
}
