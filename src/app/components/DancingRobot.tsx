// src/app/components/DancingRobot.tsx
"use client";

import { motion } from "framer-motion";

export default function DancingRobot() {
  return (
    <motion.div
      className="w-64 h-64 mx-auto"
      animate={{
        rotate: [0, 360, 360, 360, 720], // spin → spin again
        x: [0, 0, -20, 20, 0], // sway left & right
        y: [0, -10, 0, -10, 0], // bounce up & down
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1], // sync spin, sway, bounce
      }}
    >
      <img
        src="/robot.png"
        alt="Dancing Robot"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}
