"use client";
import React, { ChangeEvent, FormEvent } from "react";

// Defines the shape of category mapping
interface CategoriesMap {
  [key: string]: string[];
}

interface AdminUploadFormProps {
  title: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  mediaType: "image" | "video";
  previewUrls: string[];
  loading: boolean;
  error: string;
  success: string;
  // Dynamic categories mapping
  categoriesMap: CategoriesMap;
  // Event handlers
  handleTitleChange: (value: string) => void;
  handleDescriptionChange: (value: string) => void;
  handleMainCategoryChange: (value: string) => void;
  handleSubCategoryChange: (value: string) => void;
  handleMediaTypeChange: (value: "image" | "video") => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function AdminUploadForm(props: AdminUploadFormProps) {
  const {
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
  } = props;

  // For subcategory options, use dynamic data if available; otherwise an empty array
  const subCategoryOptions = categoriesMap[mainCategory] || [];

  return (
    <div className="bg-white shadow-md rounded-md p-6 mb-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Upload Portfolio Item</h1>

      {error && <div className="mb-4 text-red-500 font-medium">{error}</div>}
      {success && <div className="mb-4 text-green-500 font-medium">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter title"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter a brief description"
          />
        </div>

        {/* Main Category */}
        <div className="mb-4">
          <label htmlFor="mainCategory" className="block text-gray-700 font-medium mb-2">
            Main Category
          </label>
          <select
            id="mainCategory"
            value={mainCategory}
            onChange={(e) => handleMainCategoryChange(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          >
            {Object.keys(categoriesMap).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sub Category */}
        <div className="mb-4">
          <label htmlFor="subCategory" className="block text-gray-700 font-medium mb-2">
            Sub Category
          </label>
          <select
            id="subCategory"
            value={subCategory}
            onChange={(e) => handleSubCategoryChange(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          >
            {subCategoryOptions.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Media Type */}
        <div className="mb-4">
          <span className="block text-gray-700 font-medium mb-2">Media Type</span>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="mediaType"
                value="image"
                checked={mediaType === "image"}
                onChange={() => handleMediaTypeChange("image")}
                className="form-radio"
              />
              <span className="ml-2">Image(s)</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="mediaType"
                value="video"
                checked={mediaType === "video"}
                onChange={() => handleMediaTypeChange("video")}
                className="form-radio"
              />
              <span className="ml-2">Video</span>
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {mediaType === "image" ? "Multiple images allowed" : "Only one video file allowed"}
          </p>
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label htmlFor="files" className="block text-gray-700 font-medium mb-2">
            {mediaType === "image" ? "Select Images" : "Select Video"}
          </label>
          <input
            type="file"
            id="files"
            accept={mediaType === "image" ? "image/*" : "video/*"}
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            multiple={mediaType === "image"}
            required
          />
        </div>

        {/* Preview Section (for images) */}
        {mediaType === "image" && previewUrls.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Image Preview</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {previewUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-full h-40 object-cover rounded shadow"
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Portfolio Item"}
        </button>
      </form>
    </div>
  );
}
