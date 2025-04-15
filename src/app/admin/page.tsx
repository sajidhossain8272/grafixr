"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

// Import child components
import AdminNavigation from "./AdminNavigation";
import AdminUploadForm from "./AdminUploadForm";
import AdminList from "./AdminList";
import AdminCategories from "./AdminCategories";

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
  // ---------- Tab State ----------
  const [activeTab, setActiveTab] = useState<"upload" | "list" | "categories">(
    "upload"
  );

  // ---------- Upload Form States ----------
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

  // ---------- Portfolio List States ----------
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [listLoading, setListLoading] = useState(false);

  // ---------- Dynamic Categories State (for syncing Upload & Categories) ----------
  const [dynamicCategories, setDynamicCategories] = useState<
    Record<string, string[]>
  >({});

  // ---------- Back-end URL ----------
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://grafixr-backend.vercel.app";

  // ---------- Fetch Portfolio Items (for Manage Items tab) ----------
  const fetchItems = async () => {
    setListLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/list`);
      if (!res.ok) throw new Error("Failed to load portfolio items");
      const data = await res.json();
      setPortfolioItems(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching items:", err.message);
      } else {
        console.error("Error fetching items:", err);
      }
    } finally {
      setListLoading(false);
    }
  };

  // ---------- Fetch Dynamic Categories (for use in upload form and category management) ----------
  const fetchDynamicCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/categories`);
      if (!res.ok) throw new Error("Failed to load categories");
      const data = await res.json(); // data is an array of Category objects
      // Transform the array into a mapping: { mainCategory: subCategories[] }
      const mapping: Record<string, string[]> = {};
      data.forEach((cat: { mainCategory: string; subCategories: string[] }) => {
        mapping[cat.mainCategory] = cat.subCategories;
      });
      setDynamicCategories(mapping);
      // Set default mainCategory and subCategory if not set
      const mainCats = Object.keys(mapping);
      if (mainCats.length > 0 && !mainCategory) {
        setMainCategory(mainCats[0]);
        setSubCategory(mapping[mainCats[0]][0] || "");
      }
    } catch (err: unknown) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Initially fetch portfolio items and dynamic categories on mount
    fetchItems();
    fetchDynamicCategories();
  }, []);

  // ---------- Delete Portfolio Item Handler ----------
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete the item");
      } else {
        alert("Item deleted successfully");
        fetchItems(); // Refresh the list
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Error: " + err.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  // ---------- Upload Form Handlers ----------
  const handleTitleChange = (value: string) => setTitle(value);
  const handleDescriptionChange = (value: string) => setDescription(value);

  const handleMainCategoryChange = (value: string) => {
    setMainCategory(value);
    // Reset subCategory based on dynamicCategories
    const availableSubs = dynamicCategories[value] || [];
    setSubCategory(availableSubs[0] || "");
  };

  const handleSubCategoryChange = (value: string) => setSubCategory(value);

  const handleMediaTypeChange = (value: "image" | "video") => {
    setMediaType(value);
    setFiles(null);
    setPreviewUrls([]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
    if (mediaType === "image") {
      const urls: string[] = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        urls.push(URL.createObjectURL(selectedFiles[i]));
      }
      setPreviewUrls(urls);
    } else {
      // For video, show a single preview (first file)
      setPreviewUrls([URL.createObjectURL(selectedFiles[0])]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      setError("Please select at least one file to upload.");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("mainCategory", mainCategory);
      formData.append("subCategory", subCategory);
      formData.append("mediaType", mediaType);
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      const response = await fetch(`${API_URL}/admin/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to upload portfolio item.");
      } else {
        setSuccess("Portfolio item uploaded successfully!");
        // Reset the form fields
        setTitle("");
        setDescription("");
        if (Object.keys(dynamicCategories).length > 0) {
          const mainCats = Object.keys(dynamicCategories);
          setMainCategory(mainCats[0]);
          setSubCategory(dynamicCategories[mainCats[0]][0] || "");
        } else {
          setMainCategory("");
          setSubCategory("");
        }
        setMediaType("image");
        setFiles(null);
        setPreviewUrls([]);
        fetchItems(); // Refresh the list
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError("Error: " + err.message);
      else setError("An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6 mx-auto max-w-7xl'>
      {/* Tabbed Navigation */}
      <AdminNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Render Upload Form Tab */}
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
          categoriesMap={dynamicCategories}
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}
          handleMainCategoryChange={handleMainCategoryChange}
          handleSubCategoryChange={handleSubCategoryChange}
          handleMediaTypeChange={handleMediaTypeChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
        />
      )}

      {/* Render Manage Items Tab */}
      {activeTab === "list" && (
        <AdminList
          items={portfolioItems}
          loading={listLoading}
          onDelete={handleDelete}
          API_URL={API_URL}
        />
      )}

      {/* Render Categories Management Tab */}
      {activeTab === "categories" && <AdminCategories API_URL={API_URL} />}
    </div>
  );
}
