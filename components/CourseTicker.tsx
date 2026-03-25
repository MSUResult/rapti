"use client";
import React from "react";
import { motion } from "framer-motion";

const CourseTicker = () => {
  const text =
    "🎓 ADMISSION OPEN 2026 • NIELIT CCC • NIELIT O LEVEL • TALLY PRIME • ADVANCED EXCEL";

  return (
    <div className="w-full bg-yellow-400 py-4 overflow-hidden border-y-2 border-blue-900/10">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      >
        {/* First copy */}
        <div className="flex items-center">
          <p className="text-xl md:text-3xl font-black mx-8 uppercase text-blue-950">
            {text}
          </p>
        </div>

        {/* Duplicate copy (IMPORTANT) */}
        <div className="flex items-center">
          <p className="text-xl md:text-3xl font-black mx-8 uppercase text-blue-950">
            {text}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseTicker;
