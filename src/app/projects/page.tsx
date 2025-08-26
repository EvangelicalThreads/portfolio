"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function ProjectsNavbar({ projects }: { projects: { title: string; slug: string }[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { id: "home", label: "Works" },
    { id: "about", label: "About" },
    { id: "cases", label: "Cases" },
    { id: "contact", label: "Contact" },
  ];

  // Simple helper for classes (replaces classNames import)
  const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

  // Simple scroll helper (replaces smoothScrollTo import)
  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/75 backdrop-blur-md z-50 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => smoothScrollTo("home")}
            className="text-[17px] md:text-lg font-semibold tracking-tight text-neutral-900"
          >
            Katie Wang
          </button>

          <ul className="hidden sm:flex items-center gap-8 text-[15px] md:text-base text-neutral-700">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => smoothScrollTo(link.id)}
                  className={classNames(
                    "transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded-sm px-1"
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <span className="font-mono text-xs text-neutral-600">
              *25 AUG — Available for work
            </span>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="sm:hidden text-2xl font-bold px-3 py-1.5 rounded-md text-neutral-700 hover:bg-neutral-100"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: mobileOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 w-3/4 h-full bg-white z-50 p-8 flex flex-col shadow-lg"
      >
        <button className="self-end text-3xl mb-8" onClick={() => setMobileOpen(false)}>
          ✕
        </button>
        <ul className="flex flex-col space-y-6 text-lg font-semibold">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => {
                  smoothScrollTo(link.id);
                  setMobileOpen(false);
                }}
                className={classNames(
                  "transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded-sm px-1"
                )}
              >
                {link.label}
              </button>
            </li>
          ))}

          <li className="mt-4 font-bold border-t pt-4">Projects</li>
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                onClick={() => setMobileOpen(false)}
                className="transition-colors hover:text-black block"
              >
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}

export default function ProjectsPage() {
  const projects = [
    { title: "Project One", slug: "project-one" },
    { title: "Project Two", slug: "project-two" },
    { title: "Project Three", slug: "project-three" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <ProjectsNavbar projects={projects} />
      <main className="pt-24 max-w-7xl mx-auto px-5 md:px-8">
        <h1 className="text-4xl font-bold mb-10 mt-5">Projects</h1>
        <ul className="space-y-6">
          {projects.map((project) => (
            <li key={project.slug} className="text-xl font-semibold">
              <Link href={`/projects/${project.slug}`} className="hover:text-black transition-colors">
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
