// src/app/page.tsx
"use client";

/**
 * Katie Wang — Portfolio (Expanded Part 2)
 * - Keeps the LittleGuyModel exactly as requested
 * - Adds: Selected Cases, CTA, Contact, Footer, Scroll Progress, Scroll-To-Top
 * - Mobile-first responsive, with subtle motion and accessibility passes
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, Variants } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import CasesSection from "./components/CasesSection";
import TestimonialsSection from "./components/TestimonialsSection";

// --------------------------------------------------
// Motion Variants (reusable)
// --------------------------------------------------

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] } 
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { duration: 0.9, ease: [0.42, 0, 0.58, 1] } 
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] } },
};

// --------------------------------------------------
// Types
// --------------------------------------------------

type SectionId = "home" | "about" | "cases" | "contact";

// --------------------------------------------------
// Utilities
// --------------------------------------------------

function classNames(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}

function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll("section[data-section]");
      let current: SectionId = "home";
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 160) {
          current = (sec.getAttribute("id") as SectionId) || "home";
        }
      });
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return active;
}

function smoothScrollTo(id: SectionId) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// --------------------------------------------------
// Navbar
// --------------------------------------------------

function Navbar() {
  const active = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { id: "home", label: "Works" },
    { id: "about", label: "About" },
    { id: "cases", label: "Cases" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        role="navigation"
        aria-label="Primary"
        className="fixed top-0 left-0 right-0 bg-white/75 backdrop-blur-md z-50 border-b border-neutral-200"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-4 flex items-center justify-between">
          <motion.button
            initial="hidden"
            animate="show"
            variants={fadeInUp}
            onClick={() => smoothScrollTo("home")}
            className="text-[17px] md:text-lg font-semibold tracking-tight text-neutral-900"
            aria-label="Go to Home"
          >
            Katie Wang
          </motion.button>

          <ul className="hidden sm:flex items-center gap-8 text-[15px] md:text-base text-neutral-700">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => smoothScrollTo(link.id as SectionId)}
                  className={classNames(
                    "transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded-sm px-1",
                    active === link.id ? "text-black underline underline-offset-4" : ""
                  )}
                  aria-current={active === link.id ? "page" : undefined}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <span className="font-mono text-xs text-neutral-600">
              *Available for work*
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            className="sm:hidden text-2xl font-bold px-3 py-1.5 rounded-md text-neutral-700 hover:bg-neutral-100"
            aria-label="Open Menu"
          >
            ☰
          </button>
        </div>
      </nav>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: mobileOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 w-3/4 h-full bg-white z-50 p-8 flex flex-col shadow-lg"
      >
        <button
          className="self-end text-3xl mb-8"
          onClick={() => setMobileOpen(false)}
          aria-label="Close Menu"
        >
          ✕
        </button>
        <ul className="flex flex-col space-y-6 text-lg font-semibold">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => {
                  smoothScrollTo(link.id as SectionId);
                  setMobileOpen(false);
                }}
                className={classNames(
                  "transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded-sm px-1",
                  active === link.id ? "text-black underline underline-offset-4" : ""
                )}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}

// --------------------------------------------------
// Scroll Progress Bar
// --------------------------------------------------

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-neutral-900 z-[60]"
      aria-hidden="true"
    />
  );
}

// --------------------------------------------------
// LittleGuy 3D model
// --------------------------------------------------

function LittleGuyModel() {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/little-guy.glb");

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
        color: "#ffffff",
        metalness: 0.9,
        roughness: 0.2,
        envMapIntensity: 1,
      });
    }
  });

  useFrame(({ clock }) => {
    if (modelRef.current) {
      const t = clock.elapsedTime;
      modelRef.current.position.y = 0.2 * Math.abs(Math.sin(t * 3));
      modelRef.current.rotation.y = -Math.PI / 2 + 0.05 * Math.sin(t * 2);
      modelRef.current.rotation.x = 0.1 * Math.sin(t * 4);
      modelRef.current.position.x = 0;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={2} />;
}

// --------------------------------------------------
// Hero
// --------------------------------------------------

function HeroSection() {
  return (
    <section
      id="home"
      data-section
      className="min-h-[92vh] pt-24 md:pt-28 pb-20 bg-gradient-to-b from-white to-neutral-50 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div className="space-y-7">
            <motion.p
              variants={fadeInUp}
              className="font-mono text-xs md:text-sm text-neutral-600"
            >
              *Available for work*
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900"
            >
              Creative Designer
              <br className="hidden sm:block" /> & Developer
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-neutral-700 text-lg leading-relaxed max-w-xl"
            >
             I craft high-end web experiences for cafes, bringing each brand to life
online. From sleek, modern layouts to cozy, inviting designs and
minimalist interfaces, my work blends aesthetics with usability to
showcase menus, ambiance, and personality, making every cafe memorable
on the web.

            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("contact");
                }}
                className="px-5 py-3 rounded-lg bg-black text-white text-sm font-medium hover:bg-neutral-800 transition"
              >
                Contact Me
              </a>
              <a
                href="#cases"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("cases");
                }}
                className="px-5 py-3 rounded-lg border border-neutral-300 text-sm font-medium hover:bg-neutral-100 transition"
              >
                View Work
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeIn}
            className="h-[380px] md:h-[460px] lg:h-[520px] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900"
          >
            <Canvas camera={{ position: [0, 1.5, 4], fov: 42 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={1.1} />
              <LittleGuyModel />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// --------------------------------------------------
// About
// --------------------------------------------------

function AboutSection() {
  return (
    <section
      id="about"
      data-section
      className="py-20 md:py-28 bg-white"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="grid md:grid-cols-12 gap-10 items-start"
        >
          <motion.header variants={slideInLeft} className="md:col-span-4">
            <h2
              id="about-heading"
              className="text-3xl md:text-4xl font-bold text-neutral-900"
            >
              Hello, I’m Katie Wang
            </h2>
            <p className="mt-3 font-mono text-xs md:text-sm text-neutral-500">
              Front-end engineer • UI/UX • Motion
            </p>
          </motion.header>

          <motion.div
            variants={slideInRight}
            className="md:col-span-8 space-y-6 text-neutral-700 text-lg leading-relaxed"
          >
            <p>
  I create standout websites for cafes that captivate visitors and
  convert them into loyal customers. Every design balances personality
  with performance—warm, modern, or minimalist, tailored to your brand.
</p>
<p>
  Recent projects include boutique cafe sites built with Next.js,
  TypeScript, and TailwindCSS. I focus on seamless navigation,
  scalable architecture, and micro-interactions that make every click
  feel intentional.
</p>
<p className="text-neutral-600">
  Beyond code, I draw inspiration from cafe culture, study design
  trends, and capture visuals that inform every pixel. My goal is to
  craft online experiences that feel as inviting and memorable as your
  best cup of coffee.
</p>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// --------------------------------------------------
// Case Study Section
// --------------------------------------------------

// --------------------------------------------------
// Big CTA ("Let’s connect")


// --------------------------------------------------
// --------------------------------------------------
// Case Study Section
// --------------------------------------------------

// --------------------------------------------------
// Big CTA ("Let’s connect")
// --------------------------------------------------

function CTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-20 md:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl border border-neutral-200 p-8 md:p-12 lg:p-16 bg-gradient-to-br from-white to-neutral-50"
        >
          <motion.h3
            id="cta-heading"
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 text-center"
          >
            Let’s connect.
          </motion.h3>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-center max-w-3xl mx-auto text-neutral-700 text-lg"
          >
            I’m always interested in thoughtful UI/UX, motion design, and
            performant front-end engineering. If you have a project in mind,
            I’d love to hear about it.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex justify-center"
          >
            <a
              href="mailto:hello@example.com?subject=Project%20inquiry%20for%20Katie%20Wang"
              className="px-6 py-3 rounded-lg bg-black text-white text-sm font-medium hover:bg-neutral-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            >
              Email me — katie.pg32@icloud.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// --------------------------------------------------
// Contact Section
// --------------------------------------------------

function ContactSection() {
  return (
    <section
      id="contact"
      data-section
      className="py-20 md:py-28 bg-neutral-50"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 lg:p-10 shadow-sm"
        >
          <motion.h2
            id="contact-heading"
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-neutral-900"
          >
            Contact
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-3 text-neutral-700 max-w-2xl"
          >
            For project inquiries, speaking, or collaborations, send a email to{" "}
            <a
              className="underline underline-offset-4"
              href="mailto:katie.pg32@icloud.com?subject=Project%20inquiry%20for%20Katie%20Wang"
            >
              katie.pg32@icloud.com
            </a>
            . Typically available for 5–7 new projects per month.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-6">
            <div className="flex flex-wrap items-center gap-4 text-neutral-700">
            
               
            
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
              <span aria-hidden>·</span>
              <a
                href="mailto:katie.pg32@icloud.com"
                className="hover:underline"
              >
                Email
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// --------------------------------------------------
// Footer
// --------------------------------------------------

function Footer() {
  return (
    <footer
      role="contentinfo"
      className="py-10 bg-white border-t border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} Katie Wang.</span>
          <span aria-hidden>·</span>
          <span>Built with Next.js, R3F, Framer Motion.</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            className="underline underline-offset-4"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("home");
            }}
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}

// --------------------------------------------------
// Scroll-To-Top Button
// --------------------------------------------------

function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-black text-white shadow-lg hover:bg-neutral-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}

// --------------------------------------------------
// Page
// --------------------------------------------------

export default function HomePage() {
  // For users arriving with a #hash — scroll nicely after hydration.
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "") as SectionId;
      setTimeout(() => smoothScrollTo(id), 0);
    }
  }, []);

  // Reduce motion if the user prefers.
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  return (
    <div className="font-sans text-neutral-900">
      <ScrollProgressBar />
      <Navbar />
      <main id="content" className={prefersReducedMotion ? "motion-safe" : ""}>
        <HeroSection />
        <AboutSection />
        <CasesSection />
         <TestimonialsSection /> 
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
