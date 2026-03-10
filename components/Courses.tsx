"use client";
import React, { useEffect, useState } from "react";
import {
  Monitor,
  Award,
  FileCode,
  GraduationCap,
  ArrowRight,
  Clock,
  Users,
  CheckCircle2,
  BookOpen,
  Calculator,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const courses = [
  {
    icon: Monitor,
    title: "CCC Certification",
    subtitle: "Course on Computer Concepts",
    description:
      "Essential computer literacy course recognized by the Government of India. Perfect for beginners and government job aspirants.",
    duration: "3 Months",
    students: "5000+",
    features: [
      "Basic Computer Skills",
      "MS Office Suite",
      "Internet & Email",
      "Digital Finance",
    ],
    color: "from-blue-600 to-cyan-500",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    icon: FileCode,
    title: "O Level Diploma",
    subtitle: "Foundation Level IT Course",
    description:
      "Comprehensive IT diploma equivalent to Foundation Level course, recognized for government jobs and higher studies.",
    duration: "1 Year",
    students: "3000+",
    features: [
      "Python Programming",
      "Web Technologies",
      "IoT Fundamentals",
      "Database Mgt.",
    ],
    color: "from-indigo-600 to-purple-500",
    iconBg: "bg-indigo-100 text-indigo-600",
    featured: true,
  },
  {
    icon: GraduationCap,
    title: "DCA Program",
    subtitle: "Diploma in Computer Applications",
    description:
      "Advanced diploma program covering comprehensive IT skills with hands-on project experience and industry exposure.",
    duration: "1 Year",
    students: "2000+",
    features: [
      "Advanced Programming",
      "Software Dev",
      "Networking Basics",
      "Project Work",
    ],
    color: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-100 text-amber-600",
  },
  {
    icon: BookOpen,
    title: "DIT Diploma",
    subtitle: "Diploma in Information Technology",
    description:
      "A career-oriented program focusing on core IT infrastructure, hardware, and essential software engineering concepts.",
    duration: "1 Year",
    students: "1500+",
    features: [
      "Hardware & Networking",
      "Operating Systems",
      "System Analysis",
      "IT Security",
    ],
    color: "from-emerald-600 to-teal-500",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Calculator,
    title: "Tally Prime",
    subtitle: "Professional Accounting Course",
    description:
      "Master the industry-standard accounting software. Learn GST, payroll, and financial management for modern businesses.",
    duration: "3 Months",
    students: "4500+",
    features: [
      "GST Implementation",
      "Inventory Management",
      "Payroll & Taxation",
      "Financial Reporting",
    ],
    color: "from-rose-600 to-pink-500",
    iconBg: "bg-rose-100 text-rose-600",
  },
];

export const Courses = () => {

  
  const router = useRouter();

  const [index , setIndex] = useState(0)

  const text =
   "🎓 Admission Open • CCC Course • O Level Diploma • DCA Program • Tally Prime Training • ";

useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => prev + 1);
  }, 10);
   return()=> clearInterval(interval)

  })


  return (
    <>
 <section className="relative h-[12vh] bg-white border-y border-blue-50 flex items-center overflow-hidden">
  
  {/* Soft Blue Radial Glow (Optional for depth) */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f0f7ff_0%,_transparent_100%)] opacity-50" />

  {/* Fade Edges to make text "appear" from nowhere */}
  <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
  <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

  <motion.div
    className="flex whitespace-nowrap items-center"
    animate={{ x: ["0%", "-50%"] }}
    transition={{
      repeat: Infinity,
      duration: 30, // Slower is often perceived as more "premium"
      ease: "linear",
    }}
    whileHover={{ animationPlayState: "paused" }}
  >
    {/* Duplicate 4 times to ensure a smooth, gapless loop on large screens */}
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex items-center">
        <p className="text-3xl md:text-5xl font-extrabold tracking-tight text-blue-900 mx-12">
          {text}
        </p>
        {/* Visual separator: A small blue dot or icon */}
        <div className="h-2 w-2 rounded-full bg-blue-400 opacity-40" />
      </div>
    ))}
  </motion.div>
</section>

    <motion.section
      initial={{ y: 52, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-12 md:py-24 lg:py-32 bg-slate-50/50"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xs md:text-sm mb-4 md:mb-6 border border-indigo-200">
            <Award className="w-3 h-3 md:w-4 md:h-4" />
            Popular Programs
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6 tracking-tight leading-tight">
            Government Recognized
            <span className="block md:inline bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
         
              Courses
            </span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed px-2">
            Choose from our range of certified programs designed to launch your
            career in the IT industry.
          </p>
        </div>

        {/* Courses Grid - Using flex-wrap to handle the 5th card centering */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-slate-200 flex flex-col 
              w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] min-h-[500px] ${
                course.featured
                  ? "ring-2 ring-indigo-500/20 shadow-2xl z-10"
                  : "shadow-xl shadow-slate-200/50"
              }`}
            >
              {course.featured && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-600 rounded-full text-[10px] uppercase tracking-widest font-bold text-white z-20 shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Card Header Gradient */}
              <div
                className={`h-1.5 md:h-2 w-full bg-gradient-to-r ${course.color}`}
              />

              <div className="p-6 md:p-8 flex flex-col h-full flex-grow">
                {/* Icon & Title */}
                <div className="mb-4 md:mb-6">
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 transition-transform group-hover:rotate-6 duration-300 ${course.iconBg}`}
                  >
                    <course.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-indigo-600 font-medium text-xs md:text-sm">
                    {course.subtitle}
                  </p>
                </div>

                <p className="text-slate-600 text-sm md:text-base mb-6 leading-relaxed flex-grow">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-3 md:gap-4 mb-6 py-4 border-y border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs md:text-sm">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-700 font-semibold">
                      {course.duration}
                    </span>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-200" />
                  <div className="flex items-center gap-1.5 text-xs md:text-sm">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-700 font-semibold">
                      {course.students}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {course.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-xs md:text-sm text-slate-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3.5 md:py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 mt-auto ${
                    course.featured
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                      : "bg-slate-100 text-slate-900 hover:bg-indigo-600 hover:text-white"
                  }`}
                  onClick={() => router.push("/contact")}
                >
                  Enroll Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-12 md:mt-20 bg-white border border-slate-200 p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm max-w-4xl mx-auto">
          <p className="text-slate-600 mb-4 font-medium text-sm md:text-base">
            Looking for something else? We offer customized corporate training
            and workshops.
          </p>
          <button className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-all underline-offset-4 hover:underline text-sm md:text-base">
            Explore All 20+ Courses
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.section>
    </>
  );
};
