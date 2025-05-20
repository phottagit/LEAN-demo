"use client";

import React from "react";

const AddGBProjectForm = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  setShowForm,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Registration Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration Date
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

          {/* Project leader */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project leader - one per line
            </label>
            <textarea
              name="projectleader"
              value={formData.projectleader}
              onChange={handleChange}
              rows={1}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              placeholder="Enter each member on a new line"
            />
          </div>

          {/* Process */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Process
            </label>
            <select
              name="process"
              value={formData.process}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Process</option>
              <option value="Waxing">Waxing</option> // Add this option
              <option value="Casting">Casting</option> // Add this option
              <option value="Pre-plating">Pre-plating</option> // Add this option
              <option value="Plating">Plating</option> // Add this option
              <option value="QC After-plating">QC After-plating</option> // Add this option
              <option value="Post-plating">Post-plating</option> // Add this option
              <option value="QC Final">QC Final</option> // Add this option
              <option value="Packing">Packing</option> // Add this option
              <option value="Production engineering">Production engineering</option> // Add this option
              <option value="Support">Support</option> // Add this option
              <option value="IE">IE</option> // Add this option
            </select>
          </div>

          {/* Core Team Member */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Core Team Member - one per line
            </label>
            <textarea
              name="teammembers"
              value={formData.teammembers}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              placeholder="Enter each member on a new line"
            />
          </div>

          {/* Coach */}
          <div >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coach - one per line
            </label>
            <textarea
              name="coach"
              value={formData.coach}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              placeholder="Enter each member on a new line"
            />
          </div>

          {/* Sponser */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sponser - one per line
            </label>
            <textarea
              name="sponser"
              value={formData.sponser}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              placeholder="Enter each member on a new line"
            />
          </div>

          {/* Project Name */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
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

          {/* Problem statement */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Problem statement
            </label>
            <textarea
              name="problemstatement"
              value={formData.problemstatement}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter each member on a new line"
            />
          </div>

          {/* Project Objective */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Objective/ Goal
            </label>
            <textarea
              name="projectObjective"
              value={formData.projectObjective}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter each member on a new line"
            />
          </div>

          {/* Project Benefit */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Benefit
            </label>
            <textarea
              name="projectbenefit"
              value={formData.projectbenefit}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter each member on a new line"
            />
          </div>

          {/* Primary metric*/}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary metric - one per line
            </label>
            <textarea
              name="primarymetric"
              value={formData.primarymetric}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              placeholder="Enter each member on a new line"
            />
          </div>

          {/* Secondary metric*/}
          {/* Primary metric*/}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Secondary metric - one per line
            </label>
            <textarea
              name="secondarymetric"
              value={formData.secondarymetric}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter each member on a new line"
            />
          </div>

          {/* Project result */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Result
            </label>
            <textarea
              name="projectresult"
              value={formData.projectresult}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter each member on a new line"
            />
          </div>

          {/* Project Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Status
            </label>
            <select
              name="projectstatus"
              value={formData.projectstatus}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
            <option value="">Select Project Status</option>
              <option value="In progress">In progress</option> // Add this option
              <option value="Completed">Completed</option> // Add this option
              <option value="Cancelled">Cancelled</option> // Add this option
            </select>
          </div>

          {/* Status Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Category
            </label>
            <select
              name="statusCategory"
              value={formData.statusCategory}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Status Category</option> // Add this option
              <option value="Define">Define</option> // Add this option
              <option value="Measure">Measure</option> // Add this option
              <option value="Analyze">Analyze</option> // Add this option
              <option value="Improve">Improve</option> // Add this option
              <option value="Control">Control</option> // Add this option
            </select>
          </div>

          {/* Cost Saving */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Cost Saving (THB)
            </label>
            <input
                type="number"
                name="costsaving"
                value={formData.costsaving}
                onChange={handleChange}
                className="w-full p-2 border-2 border-blue-300 rounded-md"
                placeholder="e.g., 10000"
            />
            </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end">
          {setShowForm && (
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
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

export default AddGBProjectForm;