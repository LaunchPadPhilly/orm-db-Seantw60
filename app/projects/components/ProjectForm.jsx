"use client";

import { useState } from "react";
import TechnologyInput from "./TechnologyInput";

export default function ProjectForm({ onSubmit, onCancel, isOpen }) {
  if (!isOpen) return null;

  // FORM STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [technologies, setTechnologies] = useState([]);

  // ERROR & LOADING STATE
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // URL VALIDATION REGEX
  const urlRegex = /^https?:\/\/.+\..+/;

  // VALIDATION LOGIC
  function validate() {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (technologies.length === 0) newErrors.technologies = "At least one technology is required";

    if (imageUrl && !urlRegex.test(imageUrl)) {
      newErrors.imageUrl = "Please enter a valid URL";
    }
    if (projectUrl && !urlRegex.test(projectUrl)) {
      newErrors.projectUrl = "Please enter a valid URL";
    }
    if (githubUrl && !urlRegex.test(githubUrl)) {
      newErrors.githubUrl = "Please enter a valid URL";
    }

    return newErrors;
  }

  // SUBMIT HANDLER
  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        title,
        description,
        imageUrl,
        projectUrl,
        githubUrl,
        technologies,
      });

      // RESET FORM AFTER SUCCESSFUL SUBMISSION
      setTitle("");
      setDescription("");
      setImageUrl("");
      setProjectUrl("");
      setGithubUrl("");
      setTechnologies([]);

    } catch (err) {
      setErrors({ submit: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="inset-0 bg-black bg-opacity-40 flex justify-center items-center p-6 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Project</h2>

        {/* SUBMIT ERROR */}
        {errors.submit && (
          <p className="text-red-600 mb-3">{errors.submit}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* TITLE */}
          <div>
            <label htmlFor="title" className="block font-medium">Project Title</label>
            <input 
              id="title"
              type="text"
              className={`w-full border rounded p-2 ${errors.title ? 'border-red-500' : ''}`}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label htmlFor="description" className="block font-medium">Description</label>
            <textarea
              id="description"
              className={`w-full border rounded p-2 ${errors.description ? 'border-red-500' : ''}`}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-red-600 text-sm">{errors.description}</p>
            )}
          </div>

          {/* IMAGE URL */}
          <div>
            <label htmlFor="imageUrl" className="block font-medium">Image URL</label>
            <input 
              id="imageUrl"
              type="text"
              className="w-full border rounded p-2"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
            {errors.imageUrl && (
              <p className="text-red-600 text-sm">{errors.imageUrl}</p>
            )}
          </div>

          {/* PROJECT URL */}
          <div>
            <label htmlFor="projectUrl" className="block font-medium">Live Project URL</label>
            <input 
              id="projectUrl"
              type="text"
              className="w-full border rounded p-2"
              value={projectUrl}
              onChange={e => setProjectUrl(e.target.value)}
            />
            {errors.projectUrl && (
              <p className="text-red-600 text-sm">{errors.projectUrl}</p>
            )}
          </div>

          {/* GITHUB URL */}
          <div>
            <label htmlFor="githubUrl" className="block font-medium">GitHub URL</label>
            <input 
              id="githubUrl"
              type="text"
              className="w-full border rounded p-2"
              value={githubUrl}
              onChange={e => setGithubUrl(e.target.value)}
            />
            {errors.githubUrl && (
              <p className="text-red-600 text-sm">{errors.githubUrl}</p>
            )}
          </div>

          {/* TECHNOLOGY INPUT */}
          <div>
            <label className="block font-medium mb-1">Technologies</label>
            <TechnologyInput 
              technologies={technologies}
              onChange={setTechnologies}
            />
            {errors.technologies && (
              <p className="text-red-600 text-sm">{errors.technologies}</p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded hover:bg-gray-100"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`px-4 py-2 rounded bg-blue-600 text-white ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Creating Project..." : "Create Project"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
