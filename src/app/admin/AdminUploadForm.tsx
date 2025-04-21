'use client';

import React, { ChangeEvent, FormEvent } from "react";

interface Props {
  title: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  mediaType: "image" | "video";
  previewUrls: string[];
  loading: boolean;
  error: string;
  success: string;
  categoriesMap: Record<string, string[]>;
  handleTitleChange:       (val: string) => void;
  handleDescriptionChange: (val: string) => void;
  handleMainCategoryChange:(val: string) => void;
  handleSubCategoryChange: (val: string) => void;
  handleMediaTypeChange:   (val: "image" | "video") => void;
  handleFileChange:        (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit:            (e: FormEvent<HTMLFormElement>) => void;
}

export default function AdminUploadForm({
  title,
  description,
  mainCategory,
  subCategory,
  mediaType,
  previewUrls,
  loading,
  error,
  success,
  categoriesMap,
  handleTitleChange,
  handleDescriptionChange,
  handleMainCategoryChange,
  handleSubCategoryChange,
  handleMediaTypeChange,
  handleFileChange,
  handleSubmit,
}: Props) {
  const mains = Object.keys(categoriesMap);
  const subs  = categoriesMap[mainCategory] || [];

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Portfolio Item</h2>

      {/* Title */}
      <div className="mb-2">
        <label className="block font-semibold">Title:</label>
        <input
          type="text"
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          className="border p-1 w-full"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-2">
        <label className="block font-semibold">Description:</label>
        <textarea
          value={description}
          onChange={e => handleDescriptionChange(e.target.value)}
          className="border p-1 w-full"
        />
      </div>

      {/* Main Category */}
      <div className="mb-2">
        <label className="block font-semibold">Main Category:</label>
        <select
          value={mainCategory}
          onChange={e => handleMainCategoryChange(e.target.value)}
          className="border p-1 w-full"
          required
        >
          <option value="" disabled>— Select main category —</option>
          {mains.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Sub Category */}
      <div className="mb-2">
        <label className="block font-semibold">Sub Category:</label>
        <select
          value={subCategory}
          onChange={e => handleSubCategoryChange(e.target.value)}
          className="border p-1 w-full"
          required
        >
          <option value="" disabled>— Select sub category —</option>
          {subs.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Media Type */}
      <div className="mb-2">
        <label className="block font-semibold">Media Type:</label>
        <select
          value={mediaType}
          onChange={e => handleMediaTypeChange(e.target.value as "image"|"video")}
          className="border p-1 w-full"
          required
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>

      {/* File Input */}
      <div className="mb-2">
        <label className="block font-semibold">Choose File(s):</label>
        <input
          type="file"
          accept={mediaType === "image" ? "image/*" : "video/*"}
          multiple={mediaType === "image"}
          onChange={handleFileChange}
          required
        />
      </div>

      {/* Preview */}
      {previewUrls.length > 0 && (
        <div className="mb-2">
          <p className="font-semibold">Preview:</p>
          {previewUrls.map((url, i) => (
            <div key={i} className="my-2">
              {mediaType === "image" ? (
                <img src={url} alt={`preview ${i}`} className="max-h-40" />
              ) : (
                <video src={url} controls className="max-h-40" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Uploading…" : "Upload"}
      </button>

      {error   && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </form>
  );
}
