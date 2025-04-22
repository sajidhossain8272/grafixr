"use client";

import React, {
  useState,
  FormEvent,
  KeyboardEvent,
} from "react";

interface Category {
  _id: string;
  mainCategory: string;
  subCategories: string[];
}

interface AdminCategoriesProps {
  categories: Category[];
  loading: boolean;
  API_URL: string;
  refresh: () => void;
}

const AdminCategories: React.FC<AdminCategoriesProps> = ({
  categories,
  loading,
  API_URL,
  refresh,
}) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // New‑category form
  const [newMainCategory, setNewMainCategory] = useState("");
  const [newSubCategories, setNewSubCategories] = useState<string[]>(
    []
  );
  const [newSubCategoryInput, setNewSubCategoryInput] =
    useState("");

  // Edit mode
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editSubCategories, setEditSubCategories] = useState<
    string[]
  >([]);
  const [editSubCategoryInput, setEditSubCategoryInput] =
    useState("");

  // Create
  const handleCreateCategory = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newMainCategory.trim()) {
      setError("Main category is required");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/admin/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mainCategory: newMainCategory.trim(),
          subCategories: newSubCategories,
        }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || `Error ${res.status}`);
      }

      setSuccess("Category created!");
      setNewMainCategory("");
      setNewSubCategories([]);
      setNewSubCategoryInput("");
      await refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  // Delete
  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || `Error ${res.status}`);
      }
      await refresh();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Unknown error");
    }
  };

  // Enter edit mode
  const startEditing = (cat: Category) => {
    setEditCategoryId(cat._id);
    setEditSubCategories(cat.subCategories);
    setEditSubCategoryInput("");
    setError("");
    setSuccess("");
  };

  const cancelEditing = () => {
    setEditCategoryId("");
    setEditSubCategories([]);
    setEditSubCategoryInput("");
  };

  // Save updates
  const handleUpdateSubCategories = async () => {
    if (!editCategoryId) return;
    if (editSubCategories.length === 0) {
      alert("Enter at least one subcategory or cancel.");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/admin/categories/${editCategoryId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subCategories: editSubCategories }),
        }
      );
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || `Error ${res.status}`);
      }
      setSuccess("Subcategories updated!");
      cancelEditing();
      await refresh();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Unknown error");
    }
  };

  // Helpers for tag inputs
  const addNewTag = (tag: string) => {
    if (tag && !newSubCategories.includes(tag)) {
      setNewSubCategories((prev) => [...prev, tag]);
    }
  };
  const addEditTag = (tag: string) => {
    if (tag && !editSubCategories.includes(tag)) {
      setEditSubCategories((prev) => [...prev, tag]);
    }
  };

  const handleNewKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addNewTag(newSubCategoryInput.trim());
      setNewSubCategoryInput("");
    }
  };
  const handleNewBlur = () => {
    addNewTag(newSubCategoryInput.trim());
    setNewSubCategoryInput("");
  };
  const removeNewTag = (tag: string) =>
    setNewSubCategories((prev) => prev.filter((t) => t !== tag));

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEditTag(editSubCategoryInput.trim());
      setEditSubCategoryInput("");
    }
  };
  const handleEditBlur = () => {
    addEditTag(editSubCategoryInput.trim());
    setEditSubCategoryInput("");
  };
  const removeEditTag = (tag: string) =>
    setEditSubCategories((prev) => prev.filter((t) => t !== tag));

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Manage Categories
      </h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}

      {/* Create New */}
      <form onSubmit={handleCreateCategory} className="mb-8">
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Main Category
          </label>
          <input
            type="text"
            value={newMainCategory}
            onChange={(e) =>
              setNewMainCategory(e.target.value)
            }
            required
            className="w-full border rounded px-2 py-1"
            placeholder="e.g. Graphic Design"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Sub Categories
          </label>
          <div className="flex flex-wrap gap-2 border rounded p-2">
            {newSubCategories.map((tag) => (
              <div
                key={tag}
                className="flex items-center bg-gray-200 px-2 py-1 rounded"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeNewTag(tag)}
                  className="ml-1 text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              type="text"
              value={newSubCategoryInput}
              onChange={(e) =>
                setNewSubCategoryInput(e.target.value)
              }
              onKeyDown={handleNewKeyDown}
              onBlur={handleNewBlur}
              className="flex-grow min-w-[120px] focus:outline-none"
              placeholder="Press Enter or comma to add"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Category
        </button>
      </form>

      {/* Existing */}
      {loading ? (
        <p className="text-center">Loading…</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-600">
          No categories found.
        </p>
      ) : (
        categories.map((cat) => (
          <div
            key={cat._id}
            className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center"
          >
            <div className="mb-3 md:mb-0">
              <span className="font-semibold text-lg">
                {cat.mainCategory}
              </span>

              {editCategoryId === cat._id ? (
                <div className="mt-2 flex flex-wrap gap-2 border rounded p-2">
                  {editSubCategories.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center bg-gray-200 px-2 py-1 rounded"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeEditTag(tag)}
                        className="ml-1 text-red-500"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    value={editSubCategoryInput}
                    onChange={(e) =>
                      setEditSubCategoryInput(e.target.value)
                    }
                    onKeyDown={handleEditKeyDown}
                    onBlur={handleEditBlur}
                    className="flex-grow min-w-[120px] focus:outline-none"
                    placeholder="Press Enter or comma to add"
                  />
                </div>
              ) : (
                <p className="text-gray-600 mt-1">
                  Subcategories:{" "}
                  {cat.subCategories.join(", ")}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              {editCategoryId === cat._id ? (
                <>
                  <button
                    onClick={handleUpdateSubCategories}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(cat)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteCategory(cat._id)
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminCategories;
