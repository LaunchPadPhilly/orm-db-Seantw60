export default function Contact() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12">Get In Touch</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-xl text-gray-700 mb-8">
            Id love to hear from you! Feel free to reach out through any of these channels.
            Project inquiries, collaboration opportunities, or just to say hello – Im all ears!
          </p>

          <h1 className="text-2xl font-bold mb-8">Project Availability: Open</h1>

          <div className="space-y-6">

            {/* Email */}
            <div className="flex items-center gap-4">
              <svg
                className="w-10 h-10 text-gray-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 
                1.1.9 2 2 2h16c1.1 0 2-.9 
                2-2V6c0-1.1-.9-2-2-2zm0 
                4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>

              <div>
                <p className="font-bold text-gray-900">Email</p>
                <p className="text-gray-600">S.T.Webb60@Gmail.com</p>
                <p className="text-sm text-blue-600">✏️ Email me at the address above</p>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-4">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5C4.98 4.88 3.86 
                6 2.5 6S0 4.88 0 3.5 1.12 1 
                2.5 1 4.98 2.12 4.98 3.5zM.5 
                8h4V23h-4V8zm7.5 0h3.8v2.2h.1c.5-.9 
                1.8-2.2 4-2.2 4.3 0 5.1 2.8 5.1 
                6.4V23h-4v-7.8c0-1.9 0-4.3-2.7-4.3-2.7 
                0-3.1 2.1-3.1 4.2V23h-4V8z" />
              </svg>

              <div>
                <p className="font-bold text-gray-900">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/sean-tate-webb"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Sean Tate-Webb
                </a>
                <p className="text-sm text-blue-600">✏️ Feel free to connect with me on LinkedIn</p>
              </div>
            </div>

            {/* GitHub */}
            <div className="flex items-center gap-4">
              <svg
                className="w-10 h-10 text-gray-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path fillRule="evenodd" d="M12 2C6.48 2 2 
                6.58 2 12.26c0 4.5 2.87 8.31 6.84 
                9.67.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.12-1.5-1.12-1.5-.91-.64.07-.63.07-.63 
                1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 
                2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 
                0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.74 0 
                0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 
                6.8c.85 0 1.7.12 2.5.36 
                1.9-1.33 2.74-1.05 2.74-1.05.55 1.43.2 
                2.48.1 2.74.64.72 1.02 1.63 
                1.02 2.75 0 3.93-2.34 4.8-4.57 
                5.05.36.32.68.94.68 1.9 
                0 1.37-.01 2.47-.01 2.81 0 .26.18.59.69.48A10.04 
                10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
              </svg>

              <div>
                <p className="font-bold text-gray-900">GitHub</p>
                <a
                  href="https://github.com/Seantw60"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Seantw60
                </a>
                <p className="text-sm text-blue-600">✏️ Check out my GitHub projects</p>
              </div>
            </div>

          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h3 className="font-bold text-green-900 mb-2">💡 Optional Enhancements:</h3>
          <ul className="text-green-800 space-y-1">
            <li>• Add a contact form (we will learn this in Week 4!)</li>
            <li>• Include your location or timezone</li>
            <li>• Add more social icons</li>
            <li>• List your availability for projects</li>
          </ul>
        </div>
      </div>
    </div>
  );
}