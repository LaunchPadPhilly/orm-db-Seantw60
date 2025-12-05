import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "My Portfolio",
  description: "A Next.js portfolio website showcasing my projects and skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="animated-bg-subtle">
        
        {/* Optional floating blobs */}
        <div className="bg-blob one" />
        <div className="bg-blob two" />
        <div className="bg-blob three" />

        <Navbar />
        
        <main className="pt-16 flex-grow relative z-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
