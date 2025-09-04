"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

// ----------------------
// Variants
// ----------------------
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ----------------------
// Types
// ----------------------
type CaseItem = {
  title: string;
  subtitle?: string;
  description: string;
  img: string;
  href?: string;
  tags?: string[];
};

// ----------------------
// CaseCard Component
// ----------------------
function CaseCard({ item, i, onOpen }: { item: CaseItem; i: number; onOpen: () => void }) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
      className="group block rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={item.img}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <motion.div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg md:text-xl font-semibold text-neutral-900">{item.title}</h3>
          {item.subtitle && (
            <span className="text-xs rounded-full px-2 py-1 border border-neutral-300 text-neutral-600">
              {item.subtitle}
            </span>
          )}
        </div>
        <p className="mt-2 text-neutral-700 line-clamp-2">{item.description}</p>

        {item.tags && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 text-sm font-medium">
          <button
            onClick={onOpen}
            className="underline underline-offset-4 text-neutral-900 hover:text-neutral-700"
          >
            View case study →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ----------------------
// CasesSection Component
// ----------------------
export default function CasesSection() {
  const [activeCase, setActiveCase] = useState<CaseItem | null>(null);

  const cases: CaseItem[] = [
  {
  title: "Cafe Modern",
  subtitle: "Style 1 – Modern",
  description: "Clean, bold, and responsive design.",
  img: "/mockup-1.png",
  href: "https://cafehaven.vercel.app/homepage-1",
  tags: ["Next.js", "Tailwind", "Responsive"],
},
{
  title: "Cafe Cozy",
  subtitle: "Style 2 – Cozy",
  description: "Warm and inviting interface.",
  img: "/mockup-2.png",
  href: "https://cafehaven.vercel.app/homepage-2",
  tags: ["Next.js", "Tailwind", "Friendly UI"],
},
{
  title: "Cafe Minimalist",
  subtitle: "Style 3 – Minimalist",
  description: "Simple design with intuitive navigation.",
  img: "/mockup-3.png",
  href: "https://cafehaven.vercel.app/homepage-3",
  tags: ["Next.js", "Tailwind", "Clean Layout"],
},


  ];


  return (
    <section id="cases" data-section className="py-20 md:py-28 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <header className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Selected Cases</h2>
            <p className="mt-2 text-neutral-600">
              A few highlights that show range across brand, product, and motion.
            </p>
          </div>
        </header>

        {/* Cases Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-7"
        >
          {cases.map((item, i) => (
            <CaseCard key={item.title} item={item} i={i} onOpen={() => setActiveCase(item)} />
          ))}
        </motion.div>

        {/* CTA under cases */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="mt-14 md:mt-16 flex justify-center"
        >
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg bg-black text-white text-sm font-medium hover:bg-neutral-800 transition"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {activeCase && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-6 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-full sm:max-w-5xl w-full flex flex-col md:flex-row items-center md:items-start bg-black rounded-2xl p-4 sm:p-6 overflow-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >{/* Back button under image, left aligned */}
<div className="mt-4 text-left">
  <button
    onClick={() => setActiveCase(null)}
    className="text-white flex items-center gap-2 px-3 py-2 text-base md:text-base hover:underline transition"
  >
    <ArrowLeft className="w-6 h-6" /> Back
  </button>
</div>

              {/* Image */}
              <div className="w-full md:w-1/2 max-h-[70vh] overflow-hidden rounded-xl shadow-xl mb-6 md:mb-0">
                <Image
                  src={activeCase.img}
                  alt={activeCase.title}
                  width={1100}
                  height={800}
                  className="object-contain w-full h-full rounded-xl"
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 md:ml-6 text-white text-center md:text-left flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{activeCase.title}</h3>
                  {activeCase.subtitle && (
                    <span className="text-sm uppercase tracking-wide text-white/70 mb-2 block">
                      {activeCase.subtitle}
                    </span>
                  )}
                  <p className="text-lg mb-6">{activeCase.description}</p>
                  {activeCase.tags && (
                    <ul className="flex flex-wrap gap-2 mb-6">
                      {activeCase.tags.map((tag) => (
                        <li
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-white/20 text-white border border-white/30"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bottom line with left/right */}
                <div className="border-t border-white/30 pt-3 flex justify-between items-center">
                  <span className="text-xs font-medium text-white/70">UX/UI DESIGN</span>
                  {activeCase.href && (
                    <a
                      href={activeCase.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-white underline underline-offset-4"
                    >
                      View Case Study →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
