import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl text-center">

        {/* HERO SECTION */}
        <h1 className="text-6xl font-bold mb-6 text-gray-900">
          Hi, Im <span className="text-blue-600">Sean!</span>
        </h1>

        <p className="text-xl text-gray-600 mb-12">
          ✏️ A short introduction about who you are.  
          (Example: “Im a front-end developer passionate about creating clean UI, building apps, and designing interactive projects.”)
        </p>

        {/* Optional placeholder image (you can replace it later) */}
        <div className="flex justify-center mb-12">
          <div className="relative w-64 h-64 rounded-xl overflow-hidden shadow-lg border-2 border-blue-200">
            <Image
              src="/profile/home-placeholder.png"   // Put any image you want here
              alt="Portfolio Visual"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* CALL TO ACTION BUTTONS */}
        <div className="flex justify-center gap-6 mb-12">
          <Link
            href="/projects"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            View My Projects
          </Link>

          <Link
            href="/about"
            className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
          >
            About Me
          </Link>
        </div>

        {/* TODO LIST (just like your original) */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-left">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">
            📝 TODO: Customize Your Homepage
          </h2>
          <ul className="space-y-2 text-blue-800">
            <li>✏️ Replace “Your Name” with your actual name</li>
            <li>✏️ Write your introduction paragraph</li>
            <li>✏️ Replace the placeholder image</li>
            <li>✏️ Add your brand colors and style</li>
          </ul>
        </div>

        {/* Tips Section */}
        <div className="mt-8 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <p className="text-yellow-900 font-semibold">
            💡 Tip: You can add animations, gradients, or your top project here!
          </p>
        </div>
      </div>
    </div>
  )
}
