"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AboutUs = () => {
  const router = useRouter();

  const management = [
    { name: "Er. V.K. Jain", role: "Chairman" },
    { name: "Er. Rakesh Jain", role: "B.Tech - Computer Science" },
    { name: "Er. Avnindra Jain", role: "B.Tech - Civil" },
    { name: "Mr. Deepak Jain", role: "B.Sc. - Computer Science" },
    { name: "Mrs. Sapna Jain", role: "PGDCA" },
    { name: "Mrs. Shalini Jain", role: "B.Sc" },
    { name: "Mrs. Rashi Jain", role: "MCA" },
    { name: "Er. Ishika Jain", role: "B.Tech - Computer Science" },
  ];

  const staff = [
    "Mrs. Rinkie Jain (MCA)",
    "Mrs. Draksha Islam (MCA)",
    "Mr. Mohit Kumar (MCA)",
    "Mr. Vidhu Bhushan Sharma (MCA)",
    "Mr. Dharmendar Kumar (10+2)",
  ];

  // Placeholder for your office images
  const officeGallery = [
    "/main gate.jpeg",
    "/lab 2.jpg",
    "/CLASS.jpg",
    "/6.jpg",
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. HERO & OWNER FOCUS */}
      <section className="relative bg-blue-700 pt-20 pb-32 px-4 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="relative inline-block mb-10">
            {/* Owner Image */}
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-8 border-white/20 p-2 shadow-2xl overflow-hidden bg-white mx-auto">
              <img
                src="/mainsir.jpeg"
                alt="Chairman Er. V.K. Jain"
                className="w-full h-full rounded-full object-cover transition-transform hover:scale-110 duration-500"
              />
            </div>
            {/* Badge on Image */}
            <div className="absolute -bottom-2 right-0 bg-yellow-400 text-blue-900 font-black px-4 py-1 rounded-full text-xs uppercase shadow-xl border-2 border-white">
              Founder
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Our Legacy of <span className="text-yellow-400">Excellence</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Since 1996, Rapti Computers has been the cornerstone of IT education
            in Saharanpur, transforming thousands of careers through innovation
            and quality training.
          </p>
        </div>
      </section>

      {/* 2. OFFICE GALLERY GRID (The New Section) */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white rounded-[2.5rem] shadow-2xl border border-gray-100">
          {officeGallery.map((img, idx) => (
            <div
              key={idx}
              className="group relative h-40 md:h-64 overflow-hidden rounded-2xl bg-gray-200"
            >
              <img
                src={img}
                alt={`Office view ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="relative p-10 rounded-3xl bg-blue-50 border border-blue-100">
          <div className="absolute -top-6 left-10 bg-blue-600 text-white p-4 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold uppercase tracking-widest">
              Our Vision
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg pt-4 font-medium italic">
            "To be the leader in the development of industry-oriented quality
            education and be the country's premier Institution for certification
            in IECT."
          </p>
        </div>

        <div className="relative p-10 rounded-3xl bg-amber-50 border border-amber-100">
          <div className="absolute -top-6 left-10 bg-amber-500 text-white p-4 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold uppercase tracking-widest">
              Our Mission
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg pt-4 font-medium">
            To provide quality assurance in computer education and turn out
            competent IT professionals for the global industry through
            standardized NIELIT training.
          </p>
        </div>
      </section>

      {/* 4. RECOGNITION SECTION */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <span className="text-blue-600 font-black tracking-widest uppercase text-sm">
              Recognized Excellence
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 mb-6">
              NIELIT Authorized Training Center
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Recognized by the <strong>Govt. of India & AICTE</strong>, Rapti
              Computers Technology has been benchmarked against the best
              educational institutes in India. We offer 'O' level courses that
              provide career opportunities in Software & IT at all levels.
            </p>
            <button
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
              onClick={() => router.push("/result")}
            >
              View Certifications
            </button>
          </div>
          <div className="lg:w-1/2 w-full h-80 bg-white rounded-3xl shadow-inner border-2 border-dashed border-gray-300 flex items-center justify-center p-8">
            <img
              src="/rapti-logo.jpg"
              alt="Logo"
              className="max-h-full opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* 5. MANAGEMENT TEAM */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900">
            The Board of Management
          </h2>
          <p className="text-gray-500 mt-4 font-medium">
            Expert leadership driving our academic success.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {management.map((member, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-3xl text-center shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-1 w-16 bg-blue-100 rounded-full mx-auto mb-6 group-hover:bg-blue-600 transition-colors"></div>
              <h4 className="font-black text-xl text-gray-900 mb-2">
                {member.name}
              </h4>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-wide">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. STAFF SECTION */}
      <section className="py-24 px-6 bg-blue-900 rounded-[3rem] mx-4 mb-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-10">
          <img src="/rapti-logo.jpg" className="w-96" alt="" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Our Teaching Faculty</h2>
            <p className="text-blue-200">
              Experienced professionals with MCA and Advanced degrees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staff.map((person, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex items-center border border-white/10 hover:bg-white/20 transition-all"
              >
                <span className="w-10 h-10 bg-yellow-400 text-blue-900 rounded-full flex items-center justify-center mr-4 text-sm font-black shadow-lg">
                  {index + 1}
                </span>
                <span className="text-lg font-bold tracking-tight">
                  {person}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="pb-12 text-center text-gray-400 font-medium">
        <p>
          © {new Date().getFullYear()} Rapti Computers. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
