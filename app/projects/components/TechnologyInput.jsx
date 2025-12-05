"use client";

import { useState } from "react";

export default function TechnologyInput({ technologies = [], onChange, error }) {
  const [input, setInput] = useState("");

  const quickAddList = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
    'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java',
    'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'GraphQL', 'REST API',
    'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Photoshop'
  ];

  const addTechnology = (tech) => {
    const value = tech.trim();

    if (!value) return;
    if (technologies.includes(value)) return; // prevent duplicates

    onChange([...technologies, value]);
    setInput("");
  };

  const removeTechnology = (tech) => {
    onChange(technologies.filter((t) => t !== tech));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechnology(input);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechnology(input);
    }
  };

  return (
    <div>
      {/* Input Field */}
      <div className="flex gap-2">
        <input
          type="text"
          className={`flex-grow border rounded p-2 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Type a technology"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}
        />

        <button
          type="button"
          onClick={() => addTechnology(input)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

      {/* Selected Technologies */}
      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
            >
              {tech}
              <button
                type="button"
                aria-label={`Remove ${tech}`}
                className="text-blue-600 hover:text-blue-900"
                onClick={() => removeTechnology(tech)}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Quick Add Buttons */}
      <div className="mt-4">
        <p className="font-medium mb-2">Quick Add:</p>
        <div className="flex flex-wrap gap-2">
          {quickAddList.map((tech) => {
            const isSelected = technologies.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                disabled={isSelected}
                onClick={() => addTechnology(tech)}
                className={`px-3 py-1 text-sm border rounded ${
                  isSelected
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'hover:bg-gray-100'
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
