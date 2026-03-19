"use client";
import React from "react";
import { motion } from "framer-motion";

const CourseTicker = () => {
  const text =
    "🎓 ADMISSION OPEN 2026 • CCC COURSE • O LEVEL DIPLOMA • DCA PROGRAM • TALLY PRIME TRAINING • ADVANCED EXCEL • ";

  return (
    <div className="w-full bg-yellow-400 py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden border-y-2 border-blue-900/10">
      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "linear",
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center">
            <p className="text-xl md:text-3xl font-black tracking-tighter text-blue-950 mx-8 uppercase">
              {text}
            </p>
            {/* Visual separator */}
            <div className="h-3 w-3 rounded-full bg-blue-600 animate-pulse" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CourseTicker;
