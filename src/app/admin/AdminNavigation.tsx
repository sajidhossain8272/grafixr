"use client";
import React from "react";

interface AdminNavigationProps {
  activeTab: "upload" | "list" | "categories";
  onTabChange: (tab: "upload" | "list" | "categories") => void;
}

export default function AdminNavigation({ activeTab, onTabChange }: AdminNavigationProps) {
  return (
    <div className="flex border-b border-gray-300 mb-4 bg-white shadow-sm">
      <button
        onClick={() => onTabChange("upload")}
        className={`py-2 px-6 focus:outline-none ${
          activeTab === "upload"
            ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        Upload
      </button>
      <button
        onClick={() => onTabChange("list")}
        className={`py-2 px-6 focus:outline-none ${
          activeTab === "list"
            ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        Manage Items
      </button>
      <button
        onClick={() => onTabChange("categories")}
        className={`py-2 px-6 focus:outline-none ${
          activeTab === "categories"
            ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        Categories
      </button>
    </div>
  );
}
