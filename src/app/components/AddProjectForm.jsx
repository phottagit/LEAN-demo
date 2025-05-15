"use client";

import React from "react";

const AddProjectForm = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  setShowForm,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-lg font-medium mb-4">เพิ่มโปรเจค (Add new project)</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันที่ลงทะเบียน (Registation date)
            </label>
            <input
              type="date"
              name="registrationDate"
              value={formData.registrationDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ส่วนงาน (Department)
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Team Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อทีม (Team name)
            </label>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อโปรเจค (Project name)
            </label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Slogan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              สโลแกนทีม (Slogan)
            </label>
            <input
              type="text"
              name="teamSlogan"
              value={formData.teamSlogan}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Project Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ประเภทของโปรเจค (Project category)
            </label>
            <select
              name="projectCategory"
              value={formData.projectCategory}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Category</option>
              <option value="Quality">Quality</option>
              <option value="Cost">Cost</option>
              <option value="Delivery">Delivery</option>
              <option value="Safety">6S & Safety</option>
              <option value="Morale">Morale</option>
              <option value="Environment">Environment</option>
            </select>
          </div>

          {/* Members */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              สมาชิกทีม (one per line)
            </label>
            <textarea
              name="members"
              value={formData.members}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              placeholder="Enter each member on a new line"
            />
          </div>

          {/* Advisors */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ผู้ให้คำปรึกษา (one per line)
            </label>
            <textarea
              name="advisors"
              value={formData.advisors}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter each advisor on a new line"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              สถานะ (Status)
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="On progress">On progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Project Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Status
            </label>
            <select
              name="statusCategory"
              value={formData.statusCategory}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="Plan">Plan</option>
              <option value="Do">Do</option>
              <option value="Check">Check</option>
              <option value="Action">Action</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          {setShowForm && (
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;