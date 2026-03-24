"use client";
import React from "react";
import { Clock, CheckCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CourseSection = () => {
  const router = useRouter();

  const courses = [
    {
      id: "ccc",
      title: "CCC Certification",
      subtitle: "Course on Computer Concepts",
      badge: "DOEACC Certified",
      description:
        "Designed to impart knowledge at a basic level in computers for the common man. Learn to use computers for business letters, internet, e-mails, and professional presentations.",
      duration: "80 Hours",
      eligibility: "Elementary English",
      exams: "Every Month",
      theme: "blue",
      accent: "text-blue-600",
      bg: "from-blue-50 to-white",
      border: "border-blue-100",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    {
      id: "olevel",
      title: "O LEVEL (NIELIT)",
      subtitle: "Foundation Level IT Course",
      badge: "Govt. Recognized",
      description:
        "A year-long foundation course designed to groom students into Assistant Programmers. Includes 4 comprehensive modules and a final real-world project work.",
      duration: "1 Year",
      eligibility: "10+2 (Any Stream)",
      exams: "Jan / July",
      theme: "green",
      accent: "text-green-600",
      bg: "from-green-50 to-white",
      border: "border-green-100",
      button: "bg-green-600 hover:bg-green-700",
    },
    {
      id: "dit",
      title: "DIT Diploma",
      subtitle: "Diploma in Information Technology",
      badge: "Career Focused",
      description:
        "Covers hardware, software, and networking in detail. Prepares students for technical support and system administration roles within the modern IT infrastructure.",
      duration: "1 Year",
      eligibility: "10+2 (Any Stream)",
      exams: "Semester Mode",
      theme: "amber",
      accent: "text-amber-600",
      bg: "from-amber-50 to-white",
      border: "border-amber-100",
      button: "bg-amber-600 hover:bg-amber-700",
    },
    {
      id: "tally",
      title: "Tally Prime",
      subtitle: "Accounting & GST Training",
      badge: "Job Oriented",
      description:
        "Master the most powerful accounting software. Learn GST, inventory management, payroll, and professional financial reporting for business compliance.",
      duration: "3 Months",
      eligibility: "Commerce Background Pref.",
      exams: "Certification Test",
      theme: "rose",
      accent: "text-rose-600",
      bg: "from-rose-50 to-white",
      border: "border-rose-100",
      button: "bg-rose-600 hover:bg-rose-700",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Courses Main Area - Now taking full width */}
        <main className="w-full space-y-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`relative bg-gradient-to-r ${course.bg} p-6 md:p-10 rounded-3xl border ${course.border} shadow-sm overflow-hidden`}
            >
              {/* Badge */}
              <div
                className={`absolute top-0 right-0 ${course.button} text-white px-6 py-2 rounded-bl-3xl font-bold text-xs md:text-sm tracking-wide shadow-md`}
              >
                {course.badge}
              </div>

              <div className="max-w-3xl">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                  {course.title}
                </h2>
                <p
                  className={`${course.accent} font-bold text-sm md:text-base mb-6 uppercase tracking-wider`}
                >
                  {course.subtitle}
                </p>

                <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">
                  {course.description}
                </p>

                {/* Course Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">
                      Duration
                    </p>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className={course.accent} />
                      <p className="font-bold text-gray-800">
                        {course.duration}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">
                      Eligibility
                    </p>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className={course.accent} />
                      <p className="font-bold text-gray-800 text-sm">
                        {course.eligibility}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">
                      Exam Cycle
                    </p>
                    <p className="font-bold text-gray-800 text-sm">
                      {course.exams}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    className={`${course.button} text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer`}
                    onClick={() => router.push("/contact")}
                  >
                    Apply Now <ArrowRight size={18} />
                  </button>
                  <Link
                    target="_blank"
                    href={"https://www.nielit.gov.in/content/computer-course-0"}
                    className={`border-2 cursor-pointer border-gray-200 text-gray-600 hover:bg-gray-50 px-8 py-3.5 rounded-full font-bold transition-all`}
                  >
                    Course Syllabus
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default CourseSection;
