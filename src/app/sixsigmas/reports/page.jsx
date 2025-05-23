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
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

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

  const filteredProjects = projects
    .filter((project) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        project.projectNumber?.toLowerCase().includes(searchLower) ||
        project.projectName?.toLowerCase().includes(searchLower) ||
        (project.projectleader?.join(", ") || "")
          .toLowerCase()
          .includes(searchLower)
      );
    })
    .filter((project) => {
      if (!selectedFilter) return true;

      const createdAt = new Date(project.createdAt);
      const now = new Date();

      switch (selectedFilter) {
        case "Last day":
          return createdAt >= new Date(now.setDate(now.getDate() - 1));
        case "Last 7 days":
          return createdAt >= new Date(now.setDate(now.getDate() - 7));
        case "Last 30 days":
          return createdAt >= new Date(now.setDate(now.getDate() - 30));
        case "Last month":
          const today = new Date();
          const firstDayLastMonth = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            1
          );
          const lastDayLastMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
          );
          return createdAt >= firstDayLastMonth && createdAt <= lastDayLastMonth;
        case "Last year":
          const lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
          const lastYearEnd = new Date(now.getFullYear() - 1, 11, 31);
          return createdAt >= lastYearStart && createdAt <= lastYearEnd;
        default:
          return true;
      }
    });

  return (
    <div className="flex-grow w-full px-4 py-6 sm:px-6 bg-[#F0EEE4]">
      <h1 className="text-xl font-semibold mb-4">
        Lean Six Sigma: List of Projects
      </h1>

      {/* Filter, Search, Count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        {/* Filter Section */}
        <div className="flex items-center gap-4">
          <div className="relative inline-block">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              {selectedFilter || "Select"}
            </button>

            {showFilter && (
              <div className="absolute z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                  {["Last day", "Last 7 days", "Last 30 days", "Last month", "Last year"].map(
                    (label, idx) => (
                      <li key={idx}>
                        <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            id={`filter-radio-${idx}`}
                            type="radio"
                            name="filter-radio"
                            value={label}
                            checked={selectedFilter === label}
                            onChange={(e) => {
                              setSelectedFilter(e.target.value);
                              setShowFilter(false);
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor={`filter-radio-${idx}`}
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {label}
                          </label>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>

          {selectedFilter && (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {filteredProjects.length} project{filteredProjects.length !== 1 && "s"} in{" "}
              <strong>{selectedFilter}</strong>
            </p>
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-60">
          <input
            type="text"
            id="table-search"
            className="block w-full p-2 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white whitespace-nowrap rounded shadow">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left px-4 py-2">Project No.</th>
                <th className="text-left px-4 py-2">Project Name</th>
                <th className="text-left px-4 py-2">Project Leader</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Phase</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...filteredProjects]
                .sort((a, b) => {
                  const getNumber = (str) => {
                    const match = str.match(/(\d+)$/);
                    return match ? parseInt(match[1]) : 0;
                  };
                  return getNumber(b.projectNumber) - getNumber(a.projectNumber);
                })
                .map((project) => (
                  <tr key={project._id} className="border-t text-sm">
                    <td className="px-4 py-2">{project.projectNumber}</td>
                    <td className="px-4 py-2">
                      {project.projectName?.length > 70
                        ? `${project.projectName.slice(0, 70)}...`
                        : project.projectName}
                    </td>
                    <td className="px-4 py-2">
                      {project.projectleader?.length > 0
                        ? project.projectleader.join(", ")
                        : "No leaders assigned"}
                    </td>
                    <td className="px-4 py-2">{project.projectstatus || project.status}</td>
                    <td className="px-4 py-2">{project.statusCategory}</td>
                    <td className="px-4 py-2 space-x-2">
                      <Link
                        href={`/sixsigmas/edit/${project._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/sixsigmas/view/${project._id}`}
                        className="text-green-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;
