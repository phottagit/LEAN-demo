"use client";

import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2,FileText ,DollarSign, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import QCCLayout from '../components/QCCLayout';

export default function QccsPage() {
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
    statusCategory: ''
  });

  // Fetch QCC projects
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Format members and advisors as arrays
      const formattedData = {
        ...formData,
        members: formData.members.split('\n').filter(member => member.trim() !== ''),
        advisors: formData.advisors.split('\n').filter(advisor => advisor.trim() !== '')
      };
      
      const response = await fetch('/api/qccs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Add the new project to the list
        setProjects(prev => [result.data, ...prev]);
        
        // Reset form and hide it
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
          statusCategory: ''
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

  // Stats calculation
  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'On progress').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    departments: [...new Set(projects.map(p => p.department))].length
  };

  return (
    <QCCLayout>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">QCC: Quality Control Circle Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            title="Cost Saving" 
            value={stats.departments} 
            icon={<DollarSign className="h-8 w-8 text-purple-500" />}
            color="bg-purple-50"
          />
        </div>
        
        {/* Add Project Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">QCC Projects</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={20} />
            <span>{showForm ? 'Cancel' : 'Add Project'}</span>
          </button>
        </div>
        
        {/* Add Project Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-medium mb-4">เพิ่มโปรเจค (Add new project)</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <option value="On progress">Plan</option>
                    <option value="Completed">Do</option>
                    <option value="Cancelled">Check</option>
                    <option value="Cancelled">Action</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Projects Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">รายการโปรเจค (Project list)</h2>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : projects.length === 0 ? (
            <p className="text-gray-500">ไม่พบข้อมูลโปรเจค</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Registration Date</th>
                  <th className="py-2 px-4">Department</th>
                  <th className="py-2 px-4">Team Name</th>
                  <th className="py-2 px-4">Project Name</th>
                  <th className="py-2 px-4">Team Slogan</th>
                  <th className="py-2 px-4">Project Category</th>
                  <th className="py-2 px-4">Members</th>
                  <th className="py-2 px-4">Advisors</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Status Category</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-2 px-4">{project.registrationDate}</td>
                    <td className="py-2 px-4">{project.department}</td>
                    <td className="py-2 px-4">{project.teamName}</td>
                    <td className="py-2 px-4">{project.projectName}</td>
                    <td className="py-2 px-4">{project.teamSlogan}</td>
                    <td className="py-2 px-4">{project.projectCategory}</td>
                    <td className="py-2 px-4">
                      <ul className="list-disc pl-4">
                        {project.members.map((member, i) => (
                          <li key={i}>{member}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-2 px-4">
                      <ul className="list-disc pl-4">
                        {project.advisors.map((advisor, i) => (
                          <li key={i}>{advisor}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-2 px-4">{project.status}</td>
                    <td className="py-2 px-4">{project.statusCategory}</td>
                    <td className="py-2 px-4 flex items-center space-x-2">
                      <Link href={`/qccs/${project.id}`}>
                        <a className="text-blue-500 hover:underline">
                          <Edit size={18} />
                        </a>
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-red-500 hover:underline"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
    </QCCLayout>
  );
}

function StatsCard({ title, value, icon, color }) {
  return (
    <div className={`p-6 rounded-lg shadow-md ${color}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
}
