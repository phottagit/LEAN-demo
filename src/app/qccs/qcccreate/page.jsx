"use client";

import React, { useState, useEffect } from 'react';
import AddProjectForm from '@/app/components/AddProjectForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const QCCCreatePage = () => {
  
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    registrationDate: new Date().toISOString().split('T')[0],
    department: "",
    teamName: "",
    projectName: "",
    teamSlogan: "",
    projectCategory: "",
    members: "",
    advisors: "",
    status: "On progress",
    statusCategory: "Plan",
    costsaving: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch('/api/qccs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        members: formData.members.split('\n').filter(Boolean),
        advisors: formData.advisors.split('\n').filter(Boolean),
      }),
    });

    const result = await res.json();

    if (!res.ok) {
    throw new Error(result.message || 'Failed to create project');
    }
    
    alert('Project created successfully!');
    console.log('Created:', result.data);

    // Reset form
    setFormData({
      registrationDate: new Date().toISOString().split('T')[0],
      department: "",
      teamName: "",
      projectName: "",
      teamSlogan: "",
      projectCategory: "",
      members: "",
      advisors: "",
      status: "On progress",
      statusCategory: "Plan",
      costsaving: "",
    });

  } catch (error) {
    console.error("Submit failed", error);
    alert('Error: ' + error.message);
  } finally {
    setLoading(false);
  }
};

// 6. Authentication effect
      useEffect(() => {
        if (status === "unauthenticated") {
          router.replace("/login");
        }
      }, [status, router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">เพิ่มโปรเจค (Add new project)</h1>
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
