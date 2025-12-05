import Image from "next/image"

export default function About() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">

        {/* Page Title */}
        <h1 className="text-5xl font-bold mb-12">About Me</h1>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">

          {/* Profile Image + Name */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-blue-300">
              <Image
                src="/profile/profile-photo.png" // <-- Add your profile image
                alt="Profile Photo"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-2">Your Name</h2>
              <p className="text-gray-600 text-lg">
                ✏️ Write a short intro about yourself here. (3–5 sentences)
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Skills & Interests</h3>
            <div className="flex flex-wrap gap-3">
              {/* Badges */}
              <span className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium">React</span>
              <span className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium">JavaScript</span>
              <span className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium">CSS</span>
              <span className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium">APIs</span>
              <span className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium">Game Design</span>
              {/* ✏️ Add your own */}
            </div>
          </div>

          {/* Goals Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">My Goals</h3>
            <p className="text-gray-700">
              ✏️ Add a short section about what you’re learning, your aspirations,
              or what you're aiming to do with your career or creativity.
            </p>
          </div>

          {/* Timeline Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Experience / Education</h3>

            <div className="space-y-4 border-l-4 border-blue-300 pl-6">
              <div>
                <h4 className="font-bold text-lg">2024 — Present</h4>
                <p className="text-gray-600">✏️ Your current experience or role</p>
              </div>
              <div>
                <h4 className="font-bold text-lg">2022 — 2024</h4>
                <p className="text-gray-600">✏️ Something you studied or accomplished</p>
              </div>
              <div>
                <h4 className="font-bold text-lg">Earlier</h4>
                <p className="text-gray-600">✏️ Add any important milestones</p>
              </div>
            </div>

          </div>

        </div>

        {/* Example Structure Section (kept from your original) */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">💡 Example Ideas:</h3>
          <ul className="text-blue-800 space-y-1">
            <li>• Profile photo (circular, 300x300px)</li>
            <li>• 3–5 sentence bio</li>
            <li>• Skills section with badges</li>
            <li>• Experience or education timeline</li>
          </ul>
        </div>

      </div>
    </div>
  )
}
