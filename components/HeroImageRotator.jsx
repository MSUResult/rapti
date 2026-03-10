
"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
// Import the client component

export default function HeroImageSlider({ dbImage, defaultImage }) {
  
  const slides = useMemo(() => {
    return [dbImage || defaultImage, defaultImage, "/LAB.jpg"];
  }, [dbImage, defaultImage]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative z-10 transform lg:rotate-3 group-hover:rotate-0 transition-transform duration-700 w-[300px] h-[400px] md:w-[500px] md:h-[600px]">
      {slides.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            fill
            alt="Rapti Computers Campus"
            className="rounded-[2rem] object-cover shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-8 border-white/10"
            priority={index === 0}
          />
        </div>
      ))}
      {/* Floating Label */}
      <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl hidden md:block animate-bounce z-20">
        <p className="text-blue-900 font-black text-xs uppercase">
          Enrollment Open 2026
        </p>
      </div>
    </div>
  );
}