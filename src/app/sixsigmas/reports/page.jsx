"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

const Reports = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/sixsigmas");
        const result = await res.json();
        if (result.success) {
          setProjects(result.data);
        } else {
          console.error("Fetch error:", result.message);
        }
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex-grow p-6">
      <h1 className="text-xl font-semibold mb-4">All Lean Six Sigma Projects</h1>
      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2">Project No.</th>
              <th className="text-left px-4 py-2">Project Name</th>
              <th className="text-left px-4 py-2">Project Leader</th>
              <th className="text-left px-4 py-2">Process</th>            
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Phase</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="border-t text-sm">
                <td className="px-4 py-2">{project.projectNumber}</td>
                <td className="px-4 py-2">{project.projectName}</td>
                <td className="px-4 py-2"> {project.projectleader && project.projectleader.length > 0 ? project.projectleader.join(', ') : 'No leaders assigned'}</td>
                <td className="px-4 py-2">{project.process}</td>
                <td className="px-4 py-2">{project.projectstatus || project.status}</td>
                <td className="px-4 py-2">{project.statusCategory}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link href={`/edit/${project._id}`} className="text-blue-600 hover:underline">Edit</Link>
                  <Link href={`/preview/${project._id}`} className="text-green-600 hover:underline">Preview</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;
