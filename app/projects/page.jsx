"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectForm from "./components/ProjectForm";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");

      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();

      setProjects(data);
      setError("");
    } catch (err) {
      setError("Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Submit new project
  const handleCreateProject = async (projectData) => {
    try {
      setSubmitting(true);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) throw new Error("Failed to create project");

      const newProject = await res.json();

      setProjects([newProject, ...projects]); // prepend new project
      setShowForm(false);
    } catch (err) {
      alert("Error creating project");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <h1 className="text-5xl font-bold">My Projects</h1>

          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
          >
            {showForm ? "Close Form" : "Add New Project"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-12">
            <ProjectForm
              isOpen={showForm}
              onSubmit={handleCreateProject}
              onCancel={() => setShowForm(false)}
              submitting={submitting}
            />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-500 py-12">Loading projects...</p>
        )}

        {/* Error State */}
        {!loading && error && (
          <p className="text-center text-red-600 py-12">{error}</p>
        )}

        {/* Projects Grid */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-white font-bold text-xl">No Image</p>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.technologies?.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="text-sm bg-gray-200 px-3 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="text-sm text-gray-500 px-3 py-1">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/projects/${project.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>

                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">No projects yet</h2>
              <p className="text-gray-600 mb-6">
                Add your first project using the “Add New Project” button!
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-bold text-blue-900 mb-2">🚀 Getting Started:</h3>
              <ol className="text-blue-800 space-y-1 list-decimal list-inside text-left">
                <li>Set up your Neon database</li>
                <li>Implement the API routes</li>
                <li>Add project creation functionality</li>
                <li>Convert this page to use database data</li>
              </ol>
            </div>
          </div>
        )}

        {/* Project Ideas */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h3 className="font-bold text-yellow-900 mb-2">💡 Project Ideas:</h3>
          <ul className="text-yellow-800 space-y-1">
            <li>• Past school projects</li>
            <li>• Personal coding projects</li>
            <li>• Design work or creative projects</li>
            <li>• Future projects you want to build (coming soon!)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
