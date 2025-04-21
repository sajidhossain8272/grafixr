'use client';

import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";

import AdminNavigation   from "./AdminNavigation";
import AdminUploadForm  from "./AdminUploadForm";
import AdminList        from "./AdminList";
import AdminCategories  from "./AdminCategories";

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
  const [activeTab, setActiveTab] = useState<"upload"|"list"|"categories">("upload");

  // upload form state
  const [title, setTitle]             = useState("");
  const [description, setDescription] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory]   = useState("");
  const [mediaType, setMediaType]     = useState<"image"|"video">("image");
  const [files, setFiles]             = useState<FileList|null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState("");

  // list + categories
  const [items, setItems]               = useState<PortfolioItem[]>([]);
  const [listLoading, setListLoading]   = useState(false);
  const [categoriesMap, setCategoriesMap] = useState<Record<string,string[]>>({});

  const API = "/api";

  useEffect(() => {
    // load categories first
    (async () => {
      try {
        const res = await fetch(`${API}/admin/categories`);
        const data: { mainCategory: string; subCategories: string[] }[] = await res.json();
        const map: Record<string,string[]> = {};
        data.forEach(c => (map[c.mainCategory] = c.subCategories));
        setCategoriesMap(map);

        // set defaults once categories arrive
        const mains = Object.keys(map);
        if (mains.length > 0) {
          setMainCategory(mains[0]);
          setSubCategory(map[mains[0]][0] || "");
        }
      } catch (e) {
        console.error("Failed loading categories", e);
      }
    })();

    // load existing portfolio items
    (async () => {
      setListLoading(true);
      try {
        const res = await fetch(`${API}/admin/list`);
        setItems(await res.json());
      } catch (e) {
        console.error("Failed loading items", e);
      } finally {
        setListLoading(false);
      }
    })();
  }, []);

  // file select + preview
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(e.target.files);
    if (mediaType === "image") {
      setPreviewUrls(Array.from(e.target.files).map(f => URL.createObjectURL(f)));
    } else {
      setPreviewUrls([URL.createObjectURL(e.target.files[0])]);
    }
  };

  // form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      setError("Please select at least one file.");
      return;
    }
    setError(""); setSuccess(""); setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("mainCategory", mainCategory);
      formData.append("subCategory", subCategory);
      formData.append("mediaType", mediaType);
      Array.from(files).forEach(f => formData.append("files", f));

      const res = await fetch(`${API}/admin/upload`, {
        method: "POST",
        body: formData,
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Upload failed");

      setSuccess("Uploaded successfully!");
      // reset form
      setTitle("");
      setDescription("");
      // reset back to first category
      const mains = Object.keys(categoriesMap);
      if (mains.length > 0) {
        setMainCategory(mains[0]);
        setSubCategory(categoriesMap[mains[0]][0] || "");
      }
      setMediaType("image");
      setFiles(null);
      setPreviewUrls([]);

      // refresh list
      const listRes = await fetch(`${API}/admin/list`);
      setItems(await listRes.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
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
        <AdminList items={items} loading={listLoading} onDelete={(id: string) => {
          setItems(prevItems => prevItems.filter(item => item._id !== id));
        }} API_URL={""} />
      )}

      {activeTab === "categories" && (
        <AdminCategories
          categoriesMap={categoriesMap}
          refresh={() => window.location.reload()} API_URL={""}        />
      )}
    </div>
  );
}
