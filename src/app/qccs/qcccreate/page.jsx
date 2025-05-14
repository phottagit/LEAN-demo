"use client";

import { useState } from "react";
import AddProjectForm from "@/app/components/AddProjectForm";

const QCCCreatePage = () => {
  const [formData, setFormData] = useState({
    registrationDate: "",
    department: "",
    teamName: "",
    projectName: "",
    teamSlogan: "",
    projectCategory: "",
    members: "",
    advisors: "",
    status: "On progress",
    statusCategory: "Plan",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit formData to backend
      console.log("Submitting: ", formData);
      // You can transform members/advisors from string to array if needed

      // Reset form
      setFormData({
        registrationDate: "",
        department: "",
        teamName: "",
        projectName: "",
        teamSlogan: "",
        projectCategory: "",
        members: "",
        advisors: "",
        status: "On progress",
        statusCategory: "Plan",
      });
    } catch (error) {
      console.error("Submit failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Create New QCC Project</h1>
      <AddProjectForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        setShowForm={null} // no cancel button in this context
      />
    </div>
  );
};

export default QCCCreatePage;
