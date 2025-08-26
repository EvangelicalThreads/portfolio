"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseItem {
  title: string;
  subtitle: string;
  description: string;
  img: string;
  href?: string;
  tags?: string[];
}

const cases: CaseItem[] = [
  {
    title: "Evangelical Threads",
    subtitle: "Premium Brand",
    description:
      "Luxury-leaning brand template with fluid motion, product grid, and conversion-focused layout.",
    img: "/projects/et.png",
    href: "/projects/evangelical-threads",
    tags: ["Next.js", "Tailwind", "Animations"],
  },
  {
    title: "Dragon Grill",
    subtitle: "Restaurant",
    description:
      "Modern restaurant site with responsive menu, clear CTAs, and image performance budget.",
    img: "/projects/dragon-grill.png",
    href: "/projects/dragon-grill",
    tags: ["Next.js", "SEO", "Image Optimization"],
  },
  {
    title: "Interactive Portfolio",
    subtitle: "Personal",
    description:
      "3D robot hero, smooth section transitions, and case-driven narrative for client work.",
    img: "/projects/portfolio.png",
    tags: ["R3F", "Framer Motion", "UX Writing"],
  },
  {
    title: "Starter SaaS UI",
    subtitle: "Product",
    description:
      "Minimal dashboard scaffold with auth screens, settings, and component library hookups.",
    img: "/projects/saas.png",
    tags: ["Next.js", "TypeScript", "UI System"],
  },
];

export default function CasesSection() {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  return (
    <section id="cases" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <header className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-neutral-900">Selected Cases</h2>
          <p className="mt-2 text-neutral-600">
            A few highlights that show range across brand, product, and motion.
          </p>
        </header>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {cases.map((c) => (
            <motion.div
              key={c.title}
              className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg bg-white"
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedCase(c)}
            >
              <img
                src={c.img}
                alt={c.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-neutral-500">{c.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedCase && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
            >
              <motion.div
                className="bg-white rounded-2xl max-w-3xl w-full p-8 relative shadow-xl"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-2xl font-bold"
                  onClick={() => setSelectedCase(null)}
                  aria-label="Close Case"
                >
                  ✕
                </button>
                <h3 className="text-3xl font-bold">{selectedCase.title}</h3>
                <p className="mt-4 text-neutral-700">{selectedCase.description}</p>
                {selectedCase.tags && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedCase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {selectedCase.href && (
                  <a
                    href={selectedCase.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-block text-blue-600 font-medium underline"
                  >
                    View case →
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
