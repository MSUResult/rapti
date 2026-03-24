"use client";

import React, { useState, useRef } from "react";
import {
  Search,
  Download,
  Loader2,
  Award,
  User,
  BookOpen,
  Calendar,
  ShieldCheck,
  ExternalLink,
  MapPin,
  Fingerprint,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";

const CertificateSearch = () => {
  const [regNo, setRegNo] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef(null);

  const NIELIT_RESULT_URL = "https://student.nielit.gov.in/Home.aspx";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!regNo) return toast.error("Enter registration number");

    setLoading(true);
    try {
      const res = await fetch(
        `/api/studentCertificate/${encodeURIComponent(regNo)}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setStudent(data);
      toast.success("Record found!");
    } catch (err) {
      setStudent(null);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!certificateRef.current) return;

    setIsDownloading(true);
    toast.info("Polishing your certificate...");

    try {
      const dataUrl = await toPng(certificateRef.current, {
        cacheBust: true,
        pixelRatio: 4,
        style: { transform: "scale(1)" },
      });

      const link = document.createElement("a");
      link.download = `Rapti_Certificate_${student.registrationNumber}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Downloaded in High Definition!");
    } catch (err) {
      console.error(err);
      toast.error("Download failed.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 🏆 BIG CARDS FOR EXTERNAL RESULTS & RESOURCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <ResultLinkCard
            title="O-Level Results"
            subtitle="Check NIELIT O-Level Official Portal"
            url={NIELIT_RESULT_URL}
            color="orange"
            icon={<GraduationCap size={28} />}
          />
          <ResultLinkCard
            title="CCC Results"
            subtitle="Check Course on Computer Concepts"
            url={NIELIT_RESULT_URL}
            color="emerald"
            icon={<Award size={28} />}
          />
          <ResultLinkCard
            title="Old Question Papers"
            subtitle="Download previous year papers"
            url="https://www.nielit.gov.in/content/old-question-papers-0"
            color="blue"
            icon={<Download size={28} />}
          />
          <ResultLinkCard
            title="Scholarship Details"
            subtitle="Explore scholarship programs"
            url="/blog"
            color="purple"
            icon={<Award size={28} />}
          />
        </div>

        {/* 🔎 SEARCH SECTION */}
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200 mb-8 text-center">
          <div className="inline-flex p-3 bg-blue-50 rounded-2xl text-blue-600 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
            Student Verification Portal
          </h2>
          <p className="text-slate-500 mb-6 text-sm">
            Verify your Rapti Computers internal certification details below.
          </p>

          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              placeholder="Enter Registration No."
              className="flex-1 p-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-center"
            />
            <button
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-blue-700 active:scale-95"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Search size={20} />
              )}{" "}
              Search
            </button>
          </form>
        </div>

        {student && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-center">
              <button
                onClick={downloadImage}
                disabled={isDownloading}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
              >
                {isDownloading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Download size={20} />
                )}{" "}
                Download Certificate
              </button>
            </div>

            {/* 📜 CERTIFICATE CARD */}
            <div
              ref={certificateRef}
              className="bg-white relative overflow-hidden mx-auto"
              style={{
                width: "850px",
                padding: "40px",
                border: "20px solid #1e293b",
                boxShadow: "0 0 40px rgba(0,0,0,0.1)",
                fontFamily: "'Times New Roman', serif",
                backgroundColor: "#fffcf5",
              }}
            >
              <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-yellow-600"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-yellow-600"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                <Award size={500} />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start border-b-2 border-slate-100 pb-6 mb-8">
                  <div>
                    <h1 className="text-4xl font-black text-blue-700 tracking-tighter">
                      RAPTI COMPUTERS
                    </h1>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
                      An ISO 9001:2015 Certified Institute
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      Certificate No.
                    </p>
                    <p className="font-mono font-bold text-blue-600">
                      {student.certificateNumber || "N/A"}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">
                      Registration No.
                    </p>
                    <p className="font-mono font-bold text-slate-900">
                      {student.registrationNumber}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="space-y-5">
                    <DataGroup
                      icon={<User size={14} />}
                      label="Student Name"
                      value={student.name}
                      highlight
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <DataGroup
                        label="Father's Name"
                        value={student.fatherName}
                      />
                      <DataGroup
                        label="Mother's Name"
                        value={student.motherName}
                      />
                    </div>

                    {/* Replaced Gender with Identity Info, added Start and End Date row */}
                    <div className="grid grid-cols-2 gap-4">
                      <DataGroup
                        label="Date of Birth"
                        value={student.dob || "—"}
                      />
                      <DataGroup
                        icon={<Fingerprint size={14} />}
                        label={`${student.identityProof || "Identity Proof"}`}
                        value={student.identityDocNo || "—"}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <DataGroup
                        label="Starting Date"
                        value={student.startDate || "—"}
                      />
                      <DataGroup
                        label="Ending Date"
                        value={student.endDate || "—"}
                      />
                    </div>
                  </div>

                  <div className="space-y-5">
                    <DataGroup
                      icon={<BookOpen size={14} />}
                      label="Course Name"
                      value={
                        student.courseName === "Other"
                          ? student.customCourseName
                          : student.courseName
                      }
                      highlight
                      color="text-blue-600"
                    />
                    <DataGroup
                      label="Duration"
                      value={student.duration || "—"}
                    />

                    {/* New Subjects Display Block */}
                    {student.subjects &&
                      student.subjects.some((sub) => sub.trim() !== "") && (
                        <div className="pt-2">
                          <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 mb-1">
                            <BookOpen size={12} /> Course Subjects
                          </label>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] font-bold text-slate-700">
                            {student.subjects.map((sub, index) =>
                              sub.trim() !== "" ? (
                                <div key={index} className="truncate">
                                  • {sub}
                                </div>
                              ) : null,
                            )}
                          </div>
                        </div>
                      )}

                    <div className="pt-2">
                      <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 mb-1">
                        <MapPin size={12} /> Training Location
                      </label>
                      <p className="text-[11px] leading-tight font-bold text-slate-600">
                        RAPTI COMPUTERS, Opp. Baliya Kheri Block, Krishna Nagar,
                        Delhi Road, Saharanpur-247001, UP, India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-end">
                  <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
                    <QRCodeSVG
                      value={`https://rapticomputers.com/verify/${student.registrationNumber}`}
                      size={60}
                      level="H"
                    />
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase">
                        Verified Digital Record
                      </p>
                      <p className="text-[9px] text-slate-500 font-medium max-w-[120px]">
                        Scan this QR code to verify student details online.
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end">
                    {/* YOUR LOGO REPLACES THE TEXT HERE */}
                    {/* Ensure logo.png is inside your public/ folder */}
                    <img
                      src="/rapti-logo1.jpg"
                      alt="Rapti Computers Logo"
                      className="h-20 object-contain mb-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 🏛️ Helper Component for External Link Cards (Updated with new colors)
const ResultLinkCard = ({ title, subtitle, url, color, icon }) => {
  const colorStyles = {
    orange:
      "bg-orange-50 border-orange-100 text-orange-600 hover:bg-orange-100",
    emerald:
      "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100",
    blue: "bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100",
    purple:
      "bg-purple-50 border-purple-100 text-purple-600 hover:bg-purple-100",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center justify-between p-6 rounded-3xl border-2 transition-all hover:shadow-lg hover:-translate-y-1 ${colorStyles[color]}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl bg-white shadow-sm`}>{icon}</div>
        <div>
          <h3 className="font-black text-lg leading-none mb-1">{title}</h3>
          <p className="text-slate-500 text-xs font-medium">{subtitle}</p>
        </div>
      </div>
      <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">
        <ExternalLink size={18} />
      </div>
    </a>
  );
};

const DataGroup = ({
  label,
  value,
  icon,
  highlight = false,
  color = "text-slate-900",
}) => (
  <div>
    <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 mb-1">
      {icon} {label}
    </label>
    <p
      className={`${highlight ? "text-xl font-extrabold" : "text-sm font-bold"} ${color} truncate`}
    >
      {value || "—"}
    </p>
  </div>
);

export default CertificateSearch;
