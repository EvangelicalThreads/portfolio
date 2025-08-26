"use client";

import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-purple-100 to-white text-gray-900 px-6 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6">
        Build Bold. Launch Fast.
      </h1>
      <p className="text-lg md:text-2xl mb-8 max-w-2xl">
        I design and develop premium websites that turn ideas into high-end digital experiences. Check my work and get your project started today.
      </p>
      <Link
        href="/projects"
        className="bg-purple-700 text-white px-8 py-4 rounded-lg hover:bg-purple-800 transition"
      >
        View My Work
      </Link>
    </section>
  );
}
