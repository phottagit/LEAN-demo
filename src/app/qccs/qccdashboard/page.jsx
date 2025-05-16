"use client";

import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, FileText, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import QCCLayout from '@/app/components/QCCLayout'; // ✅ Ensure this path is correct

export default function QccDashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    registrationDate: new Date().toISOString().split('T')[0],
    department: '',
    teamName: '',
    projectName: '',
    teamSlogan: '',
    projectCategory: '',
    members: '',
    advisors: '',
    status: 'On progress',
    statusCategory: '',
    costsaving: ''
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/qccs');
        const result = await response.json();
        if (result.success) {
          setProjects(result.data);
        } else {
          console.error('Failed to fetch projects:', result.message);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formattedData = {
        ...formData,
        members: formData.members.split('\n').filter(m => m.trim() !== ''),
        advisors: formData.advisors.split('\n').filter(a => a.trim() !== '')
      };

      const response = await fetch('/api/qccs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();

      if (result.success) {
        setProjects(prev => [result.data, ...prev]);
        setFormData({
          registrationDate: new Date().toISOString().split('T')[0],
          department: '',
          teamName: '',
          projectName: '',
          teamSlogan: '',
          projectCategory: '',
          members: '',
          advisors: '',
          status: 'On progress',
          statusCategory: '',
          costsaving: ''
        });
        setShowForm(false);
      } else {
        alert(`Failed to create project: ${result.message}`);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('An error occurred while creating the project');
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'On progress').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    //costsaving: [...new Set(projects.map(p => p.costsaving))].length
    costsaving: projects.reduce((sum, p) => sum + (parseFloat(p.costsaving) || 0), 0)
  };

  // StatusCategory Distribution
  const statusCategoryCounts = ['Plan', 'Do', 'Check', 'Action'].reduce((acc, phase) => {
    acc[phase] = projects.filter((p) => p.statusCategory === phase).length;
    return acc;
  }, {});

  const totalStatus = Object.values(statusCategoryCounts).reduce((sum, count) => sum + count, 0);

  return (

      <div className="p-4">
        <h1 className="text-3xl font-semibold mb-6">QCC Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Projects"
            value={stats.total}
            icon={<FileText className="h-8 w-8 text-blue-500" />}
            color="bg-blue-50"
          />
          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            icon={<CheckCircle className="h-8 w-8 text-yellow-500" />}
            color="bg-yellow-50"
          />
          <StatsCard
            title="Completed"
            value={stats.completed}
            icon={<CheckCircle className="h-8 w-8 text-green-500" />}
            color="bg-green-50"
          />
          <StatsCard
            title="Project Cost Saving"
            value={`$${stats.costsaving.toLocaleString()}`}
            icon={<DollarSign className="h-8 w-8 text-purple-500" />}
            color="bg-purple-50"
          />

        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
            <div className="space-y-4">
              {projects.length > 0 ? (
                projects.slice(0, 3).map((project, index) => (
                  <div key={project.id || index} className="border-b pb-4">
                    <h3 className="font-medium">{project.projectName}</h3>
                    <p className="text-sm text-gray-500">
                      Department: {project.department} | Registered on: {project.registrationDate}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No projects found</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
  <h2 className="text-xl font-semibold mb-4">Project Status Summary</h2>
  <div className="space-y-4">
    {['Plan', 'Do', 'Check', 'Action'].map((phase) => {
      const count = statusCategoryCounts[phase] || 0;
      const percentage = totalStatus > 0 ? (count / totalStatus) * 100 : 0;

      return (
        <div key={phase} className="flex justify-between items-center">
          <span className="w-20">{phase} ({count})</span>
          <div className="w-full bg-gray-200 rounded-full h-2.5 ml-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      );
    })}
  </div>
</div>


        </div>
      </div>

  );
}

function StatsCard({ title, value, icon, color }) {
  return (
    <div className={`p-6 rounded-lg shadow ${color}`}>
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}
