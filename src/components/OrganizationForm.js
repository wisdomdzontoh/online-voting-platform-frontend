// src/components/OrganizationForm.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService"; // Import your API service

const OrganizationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone_number: "",
    website: "",
    contact_person: "",
    organization_photo: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await apiService.createOrganization(data); // Use the consolidated function
      toast.success("Organization created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to create organization.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 p-8 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-600">
        Create New Organization
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Organization Inputs */}
        {[
          { label: "Organization Name", name: "name", type: "text", required: true },
          { label: "Email", name: "email", type: "email", required: true },
          { label: "Address", name: "address", type: "text", required: true },
          { label: "Phone Number", name: "phone_number", type: "tel" },
          { label: "Website", name: "website", type: "url" },
          { label: "Contact Person", name: "contact_person", type: "text" },
        ].map((field) => (
          <div key={field.name} className="grid grid-cols-1 gap-2">
            <label className="font-semibold text-gray-800">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className="rounded-md border-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-3 w-full"
              required={field.required}
            />
          </div>
        ))}

        {/* Organization Photo */}
        <div className="grid grid-cols-1 gap-2">
          <label className="font-semibold text-gray-800">Organization Photo</label>
          <input
            type="file"
            name="organization_photo"
            onChange={handleChange}
            className="rounded-md border-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-6 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Create Organization
        </button>
      </form>
    </div>
  );
};

export default OrganizationForm;
