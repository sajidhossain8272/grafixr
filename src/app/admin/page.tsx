"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
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

interface Category {
  _id: string;
  mainCategory: string;
  subCategories: string[];
  createdAt: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] =
    useState<"upload" | "list" | "categories">("upload");

  // Categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesMap, setCategoriesMap] = useState<
    Record<string, string[]>
  >({});
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Portfolio items
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [listLoading, setListLoading] = useState(false);

  // Upload form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">(
    "image"
  );
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  // stable fetch for categories
  const fetchCategories = useCallback(async () => {
    setCategoriesLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/categories`);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: Category[] = await res.json();
      setCategories(data);

      // build map
      const map: Record<string, string[]> = {};
      data.forEach((c) => (map[c.mainCategory] = c.subCategories));
      setCategoriesMap(map);

      // defaults
      if (data.length) {
        if (!map[mainCategory]) {
          const first = data[0].mainCategory;
          setMainCategory(first);
          setSubCategory(map[first][0] || "");
        } else if (
          !map[mainCategory].includes(subCategory)
        ) {
          setSubCategory(map[mainCategory][0] || "");
        }
      }
    } catch (e) {
      console.error("Failed loading categories", e);
    } finally {
      setCategoriesLoading(false);
    }
  }, [API_URL, mainCategory, subCategory]);

  // stable fetch for items
  const fetchItems = useCallback(async () => {
    setListLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/list`);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setItems(await res.json());
    } catch (e) {
      console.error("Failed loading items", e);
    } finally {
      setListLoading(false);
    }
  }, [API_URL]);

  // run once on mount
  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, [fetchCategories, fetchItems]);

  // file input + preview
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(e.target.files);
    if (mediaType === "image") {
      setPreviewUrls(
        Array.from(e.target.files).map((f) =>
          URL.createObjectURL(f)
        )
      );
    } else {
      setPreviewUrls([URL.createObjectURL(e.target.files[0])]);
    }
  };

  // upload submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      setUploadError("Please select at least one file.");
      return;
    }
    setUploadError("");
    setUploadSuccess("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("mainCategory", mainCategory);
      formData.append("subCategory", subCategory);
      formData.append("mediaType", mediaType);
      Array.from(files).forEach((f) => formData.append("files", f));

      const res = await fetch(`${API_URL}/admin/upload`, {
        method: "POST",
        body: formData,
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Upload failed");

      setUploadSuccess("Uploaded successfully!");
      setTitle("");
      setDescription("");
      setMediaType("image");
      setFiles(null);
      setPreviewUrls([]);

      // reset selects to first category
      const mains = Object.keys(categoriesMap);
      if (mains.length) {
        setMainCategory(mains[0]);
        setSubCategory(categoriesMap[mains[0]][0] || "");
      }

      await fetchItems();
    } catch (err: unknown) {
      setUploadError(
        err instanceof Error ? err.message : "Unknown error"
      );
    } finally {
      setUploading(false);
    }
  };

  // delete handler
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || `Error ${res.status}`);
      }
      setItems((prev) =>
        prev.filter((i) => i._id !== id)
      );
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Unknown");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mx-auto max-w-7xl">
      <AdminNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "upload" && (
        <AdminUploadForm
          title={title}
          description={description}
          mainCategory={mainCategory}
          subCategory={subCategory}
          mediaType={mediaType}
          previewUrls={previewUrls}
          loading={uploading}
          error={uploadError}
          success={uploadSuccess}
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
        <AdminList
          items={items}
          loading={listLoading}
          onDelete={handleDelete}
        />
      )}

      {activeTab === "categories" && (
        <AdminCategories
          categories={categories}
          loading={categoriesLoading}
          refresh={fetchCategories}
          API_URL={API_URL}
        />
      )}
    </div>
  );
}
