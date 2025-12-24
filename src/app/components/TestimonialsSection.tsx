"use client";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-12"
        >
          What Clients Say
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm"
          >
            <p className="text-neutral-700">
              “Katie built a clean, responsive website for our brand. Evangelical Threads now has an online presence that truly reflects our vision!”
            </p>
            <span className="mt-3 block font-semibold text-neutral-900">- Evangelical Threads</span>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm"
          >
            <p className="text-neutral-700">
              “Our restaurant’s website looks amazing! Katie delivered a professional, mobile-friendly site that’s already helping us attract more customers.”
            </p>
            <span className="mt-3 block font-semibold text-neutral-900">- Dragon Grill</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
