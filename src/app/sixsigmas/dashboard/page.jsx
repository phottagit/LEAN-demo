"use client"; // Ensure this component is rendered on the client

import React, { useState, useEffect } from 'react';
import SixSigmaLayout from '../../components/SixSigmaLayout'; // Import the SixSigmaLayout component
import { PlusCircle, Edit, Trash2, FileText, DollarSign, CheckCircle, XCircle, LayoutDashboard, Menu, ArrowUturnLeft } from 'lucide-react';

export default function Dashboard() {

  const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
      registrationDate: new Date().toISOString().split("T")[0],
      projectleader: "",
      process: "",
      teammembers: "",
      sponser: "",
      projectName: "",
      problemstatement: "",
      projectObjective: "",
      projectbenefit: "",
      primarymetric: "",
      secondarymetric: "",
      projectresult: "",
      projectstatus: "In progress",
      statusCategory: "",
    });
  
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await fetch("/api/sixsigmas");
          const result = await response.json();
          if (result.success) {
            setProjects(result.data);
          } else {
            console.error("Failed to fetch projects:", result.message);
          }
        } catch (error) {
          console.error("Error fetching projects:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProjects();
    }, []);
  
    // Sidebar control for collapse and mobile responsiveness
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkIfMobile = () => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        if (mobile) setIsCollapsed(true);
      };
  
      checkIfMobile();
      window.addEventListener("resize", checkIfMobile);
      return () => window.removeEventListener("resize", checkIfMobile);
    }, []);
  
    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  
    // Stats & statusCategoryCounts as before...
  
    const stats = {
      total: projects.length,
      costsaving: projects.reduce((sum, p) => sum + (parseFloat(p.costsaving) || 0), 0),
      inProgress: projects.filter((p) => p.status === "In progress").length,
      completed: projects.filter((p) => p.status === "Completed").length,
    };
  
    const statusCategoryCounts = ["Define", "Measure", "Analize", "Improve", "Control"].reduce((acc, phase) => {
      acc[phase] = projects.filter((p) => p.statusCategory === phase).length;
      return acc;
    }, {});
  
    const totalStatus = Object.values(statusCategoryCounts).reduce((sum, count) => sum + count, 0);

    return (
      <SixSigmaLayout>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Lean Six Sigma Dashboard: Under contruction</h1>         
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
                          value={`THB${stats.costsaving.toLocaleString()}`}
                          icon={<DollarSign className="h-8 w-8 text-purple-500" />}
              color="bg-purple-50"
              />
            </div>          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                <div className="space-y-4">
                  {projects.length > 0 ? (
                    [...projects]
                      .sort((a, b) => {
                        const numA = parseInt(a.projectNumber.replace(/\D/g, ""), 10);
                        const numB = parseInt(b.projectNumber.replace(/\D/g, ""), 10);
                        return numB - numA; // Descending
                      })
                      .slice(0, 3)
                      .map((project, index) => (
                        <div key={project.id || index} className="border-b pb-4">
                          <h3 className="font-medium">{project.projectName}</h3>
                          <p className="text-sm text-gray-500">
                            {project.projectNumber} | Process: {project.department} | Registered on: {new Date(project.registrationDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
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
                  {["Define", "Measure", "Analize", "Improve", "Control"].map((phase) => {
                    const count = statusCategoryCounts[phase] || 0;
                    const percentage = totalStatus > 0 ? (count / totalStatus) * 100 : 0;
                    return (
                      <div key={phase} className="flex justify-between items-center">
                        <span className="w-28">{phase} ({count})</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 ml-4">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}  
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


