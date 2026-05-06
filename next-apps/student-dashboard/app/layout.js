"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    setLoggedIn(status);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
    router.push("/login");
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">

        {/* Navbar */}
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Student App</h1>

          <div className="flex gap-6 items-center">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>

            {loggedIn && (
              <>
                <Link href="/student" className="hover:text-blue-600 transition">Student</Link>
                <Link href="/courses" className="hover:text-blue-600 transition">Courses</Link>
                <Link href="/set" className="hover:text-blue-600 transition">Settings</Link>
              </>
            )}

            {!loggedIn ? (
              <Link href="/login" className="hover:text-blue-600 transition">Login</Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-inner p-4 text-center text-sm text-gray-500">
          © 2026 Student App. All rights reserved.
        </footer>

      </body>
    </html>
  );
}