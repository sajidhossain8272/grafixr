"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import type { NextPage } from "next";
import {
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  requirements: string;
  budget: string;
  deadline: string;
}

const Page: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    requirements: "",
    budget: "",
    deadline: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Replace this with your submission logic (e.g., API call)
    console.log("Form submitted:", formData);
    // Optionally, reset the form:
    // setFormData({ name: "", email: "", phone: "", projectType: "", requirements: "", budget: "", deadline: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative">
      {/* Form Section */}
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg px-10 py-16">
        <h1 className="text-3xl font-bold text-center mb-6">
          Contact Us for Your Project
        </h1>
        <p className="text-center text-xs mb-8 text-gray-600">
          Please fill out the form below with your project details and
          requirements. We&apos;ll get back to you with a tailored solution.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Two Column Layout */}
          <div className="flex flex-wrap -mx-4">
            {/* Left Column */}
            <div className="w-full md:w-1/2 px-4 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
            </div>
            {/* Right Column */}
            <div className="w-full md:w-1/2 px-4 space-y-6">
              <div>
                <label
                  htmlFor="projectType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Type
                </label>
                <select
                  name="projectType"
                  id="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
                >
                  <option value="">Select a project type</option>
                  <option value="graphicDesign">Graphic Design</option>
                  <option value="webDevelopment">Web Development</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700"
                >
                  Budget (optional)
                </label>
                <input
                  type="text"
                  name="budget"
                  id="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. $5000 - $10000"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
              <div>
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Deadline (optional)
                </label>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
            </div>
          </div>
          {/* Full-width Requirements */}
          <div>
            <label
              htmlFor="requirements"
              className="block text-sm font-medium text-gray-700"
            >
              Project Requirements / Ideas
            </label>
            <textarea
              name="requirements"
              id="requirements"
              rows={5}
              required
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Describe your project, idea, or requirements in detail..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>

      {/* Email Icon - Bottom Left */}
      <div className="group fixed bottom-4 left-4">
        <div className="bg-gray-900 text-white rounded-full p-4 cursor-pointer transform transition-transform hover:scale-110">
          <FaEnvelope className="w-8 h-8" />
        </div>
        <div className="absolute bottom-[60px] left-[50px] transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Grafixr07@gmail.com
        </div>
      </div>

      {/* WhatsApp Icon - Bottom Right */}
      <div className="group fixed bottom-4 right-4">
        <div className="bg-green-500 text-white rounded-full p-4 cursor-pointer transform transition-transform hover:scale-110">
          <FaWhatsapp className="w-8 h-8" />
        </div>
        <div className="absolute bottom-[60px] left-1/3 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          +8801628083370
        </div>
      </div>
    </div>
  );
};

export default Page;
