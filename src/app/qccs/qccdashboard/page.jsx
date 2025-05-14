"use client";

import SixSigmaLayout from '../../components/SixSigmaLayout';
import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2,FileText ,DollarSign, CheckCircle, XCircle } from 'lucide-react';

export default function QccDashboard() {

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
      <SixSigmaLayout>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">QCC Dashboard: Under contrucktion</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stats Cards */}

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
          
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                <div className="space-y-4">
                    {projects.slice(0, 3).map((project, index) => (
                    <div key={project.id || index} className="border-b pb-4">
                        <h3 className="font-medium">{project.projectName}</h3>
                    <p className="text-sm text-gray-500">
                        Department: {project.department} | Registered on: {project.registrationDate}
                    </p>
                </div>
                ))}
            </div>
        </div>
            
            {/* Team Performance */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Team Category</h2>
              <div className="space-y-4">
                {['Green Belt Team', 'Black Belt Team', 'Master Black Belt'].map((team) => (
                  <div key={team} className="flex justify-between items-center">
                    <span>{team}</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.floor(Math.random() * 50) + 50}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SixSigmaLayout>
    );
  }
  
  function StatsCard({ title, value, change, isPositive }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="flex items-baseline mt-2">
          <p className="text-3xl font-semibold">{value}</p>
          <p className={`ml-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </p>
        </div>
      </div>
    );
}