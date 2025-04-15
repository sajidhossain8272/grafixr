"use client";

import React, { useState, useEffect, FormEvent, KeyboardEvent } from "react";

interface Category {
  _id: string;
  mainCategory: string;
  subCategories: string[];
  createdAt: string;
}

interface AdminCategoriesProps {
  API_URL: string;
}

export default function AdminCategories({ API_URL }: AdminCategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // For creating a new main category with tag-style subcategory input
  const [newMainCategory, setNewMainCategory] = useState<string>("");
  const [newSubCategories, setNewSubCategories] = useState<string[]>([]);
  const [newSubCategoryInput, setNewSubCategoryInput] = useState<string>("");

  // For editing subcategories using tag inputs
  const [editCategoryId, setEditCategoryId] = useState<string>("");
  const [editSubCategories, setEditSubCategories] = useState<string[]>([]);
  const [editSubCategoryInput, setEditSubCategoryInput] = useState<string>("");

  // Fetch categories from /admin/categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/categories`);
      if (!res.ok) throw new Error("Failed to load categories");
      const data = await res.json();
      setCategories(data);
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

  useEffect(() => {
    fetchCategories();
  }, [API_URL]);

  // CREATE: new main category
  const handleCreateCategory = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!newMainCategory.trim()) {
      setError("Main category is required");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/admin/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mainCategory: newMainCategory.trim(),
          subCategories: newSubCategories,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create category");
      }
      setSuccess("Category created successfully!");
      setNewMainCategory("");
      setNewSubCategories([]);
      setNewSubCategoryInput("");
      fetchCategories();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  // DELETE: entire category
  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete category");
      }
      alert("Category deleted successfully.");
      fetchCategories();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Error: " + err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  // Start editing a category
  const startEditing = (cat: Category) => {
    setEditCategoryId(cat._id);
    setEditSubCategories(cat.subCategories);
    setEditSubCategoryInput("");
  };

  // CANCEL editing
  const cancelEditing = () => {
    setEditCategoryId("");
    setEditSubCategories([]);
    setEditSubCategoryInput("");
  };

  // UPDATE subcategories
  const handleUpdateSubCategories = async (catId: string) => {
    if (editSubCategories.length === 0) {
      alert("Subcategories cannot be empty. Enter at least one or cancel.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/admin/categories/${catId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subCategories: editSubCategories }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update subcategories");
      }
      alert("Subcategories updated!");
      setEditCategoryId("");
      setEditSubCategories([]);
      setEditSubCategoryInput("");
      fetchCategories();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Error: " + err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  // Functions to handle adding/removing tags for new category
  const handleNewSubCategoryKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = newSubCategoryInput.trim();
      if (tag && !newSubCategories.includes(tag)) {
        setNewSubCategories([...newSubCategories, tag]);
      }
      setNewSubCategoryInput("");
    }
  };

  const handleRemoveNewTag = (tag: string) => {
    setNewSubCategories(newSubCategories.filter((t) => t !== tag));
  };

  // Functions for editing subcategory tags
  const handleEditSubCategoryKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEditTag();
    }
  };

  const addEditTag = () => {
    const tag = editSubCategoryInput.trim();
    if (tag && !editSubCategories.includes(tag)) {
      setEditSubCategories([...editSubCategories, tag]);
    }
    setEditSubCategoryInput("");
  };

  const handleEditSubCategoryBlur = () => {
    // On blur, commit any input if exists
    addEditTag();
  };

  const handleRemoveEditTag = (tag: string) => {
    setEditSubCategories(editSubCategories.filter((t) => t !== tag));
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Categories</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}

      {/* Create New Category Form */}
      <form onSubmit={handleCreateCategory} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Main Category
          </label>
          <input
            type="text"
            value={newMainCategory}
            onChange={(e) => setNewMainCategory(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter main category name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Sub Categories
          </label>
          <div className="flex flex-wrap gap-2 border p-2 rounded">
            {newSubCategories.map((tag) => (
              <div
                key={tag}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded flex items-center"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveNewTag(tag)}
                  className="ml-1 text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              type="text"
              value={newSubCategoryInput}
              onChange={(e) => setNewSubCategoryInput(e.target.value)}
              onKeyDown={handleNewSubCategoryKeyDown}
              className="flex-grow min-w-[100px] focus:outline-none"
              placeholder="Add subcategory..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Create Main Category
        </button>
      </form>

      {loading ? (
        <div className="text-center">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="text-center text-gray-600">No categories found.</div>
      ) : (
        <div className="divide-y divide-gray-300">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="py-4 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div className="mb-2 md:mb-0">
                <span className="text-lg font-semibold">{cat.mainCategory}</span>
                {editCategoryId === cat._id ? (
                  <div className="mt-2 flex flex-wrap gap-2 border p-2 rounded">
                    {editSubCategories.map((tag) => (
                      <div
                        key={tag}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded flex items-center"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveEditTag(tag)}
                          className="ml-1 text-red-500"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      value={editSubCategoryInput}
                      onChange={(e) => setEditSubCategoryInput(e.target.value)}
                      onKeyDown={handleEditSubCategoryKeyDown}
                      onBlur={handleEditSubCategoryBlur}
                      className="flex-grow min-w-[100px] focus:outline-none"
                      placeholder="Add subcategory..."
                    />
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm mt-1">
                    Subcategories: {cat.subCategories.join(", ")}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {editCategoryId === cat._id ? (
                  <>
                    <button
                      onClick={() => handleUpdateSubCategories(cat._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(cat)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
