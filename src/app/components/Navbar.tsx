"use client";

import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 bg-white shadow-md fixed top-0 left-0 z-50 flex justify-between items-center">
      <div className="text-xl font-bold">Katie Wang</div>
      <div className="space-x-6">
        <Link href="/" className="hover:text-purple-700">Home</Link>
        <Link href="/projects" className="hover:text-purple-700">Projects</Link>
        <Link href="/contact" className="hover:text-purple-700">Contact</Link>
      </div>
    </nav>
  );
}
