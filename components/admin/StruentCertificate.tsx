"use client";
import React, { useState } from "react";
import {
  Loader2,
  User,
  BookOpen,
  FileText,
  BadgeCheck,
  Save,
} from "lucide-react";
import { toast } from "sonner";

// Dictionary for auto-filling subjects based on course selection
const COURSE_SUBJECTS: Record<string, string[]> = {
  "COURSE IN COMPUTER CONCEPT": [
    "INTRO TO COMPUTER",
    "MAKING SMALL PRESENTATION",
    "ELEMENT OF WORD PROCESSING",
    "COMPUTER COMM. & INTERNET",
    "SPREADSHEET",
    "INTRO TO GUI BASE OS",
  ],
  "O LEVEL": [
    "INTRO TO COMPUTER",
    "MAKING SMALL PRESENTATION",
    "ELEMENT OF WORD PROCESSING",
    "COMPUTER COMM. & INTERNET",
    "SPREADSHEET",
    "INTRO TO GUI BASE OS",
  ],
  "BASIC IN COMPUTER APPLICATION": ["", "", "", "", "", ""],
  "CERTIFICATE COURSE IN COMPUTER ACCOUNTING": [
    "INTRO TO COMPUTER",
    "MS-WORD, EXCEL POWER POINT",
    "DAY BOOK AND INVENTORY REPORT",
    "INTERNET & E-MAIL",
    "PAYROLL, VAT, TDS, TAXATION",
    "TALLY ERP 9.0",
  ],
  "CERTIFICATE COURSE IN TYPING(HINDI/ENGLISH)": [
    "ENGLISH TYPING",
    "HINDI TYPING",
  ],
  "CERTIFICATE COURSE IN COMPUTER APPLICATION": [
    "INTRO TO COMPUTERS",
    "ELEMENT OF WORD PROCESSING",
    "WINDOW OS & GUI",
    "SPREADSHEET",
    "COMP COMM & INTERNET",
    "MAKING SMALL PRESENTATION",
  ],
  "DIPLOMA IN INFORMATION TECHNOLOGY": [
    "IT TOOLS & MS OFFICE",
    "PROGRAMMING IN C",
    "HTML & WEB TECHNOLOGY",
    "MULTIMEDIA",
  ],
  "ADVANCE DIPLOMA IN COMPUTER APPLICATION": [
    "IT TOOLS & MS OFFICE",
    "PROGRAMMING IN C",
    "HTML & WEB TECHNOLOGY",
    "MULTIMEDIA",
  ],
  "DIPLOMA IN COMPUTER APPLICATION": [
    "IT TOOLS & MS OFFICE",
    "ENGLISH TYPING",
    "HINDI TYPING",
    "MULTIMEDIA",
  ],
  "BASIC COURSE IN COMPUTER APPLICATION": [
    "INTRO TO COMPUTERS",
    "ELEMENT OF WORD PROCESSING",
    "WINDOWS OS & GUI",
    "SPREADSHEET",
    "COMP COMM & INTERNET",
    "MAKING SMALL PRESENTATION",
  ],
  "CERTIFICATE COURSE IN FINANCIAL ACCOUNTING": [
    "ACCOUNTING BASICS",
    "FINAL ACCOUNTS",
    "VOUCHER TYPES & ENTRIES",
    "DAY BOOK & INVENTORY REPORT",
    "PAYROLL, VAT, TDS, TAXATION",
    "TALLY ERP 9.0 WITH GST",
  ],
  OTHER: ["", "", "", "", "", ""],
};

const StudentCertificate = () => {
  const [loading, setLoading] = useState(false);

  const initialData = {
    certificateNumber: "RAPTI/",
    registrationNumber: "",
    name: "",
    dob: "",
    gender: "",
    education: "",
    fatherName: "",
    motherName: "",
    identityProof: "AADHAR CARD",
    identityDocNo: "",
    courseName: "",
    customCourseName: "",
    duration: "",
    startDate: "",
    endDate: "",
    passout: "",
    subjects: ["", "", "", "", "", ""],
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // FORCING UPPERCASE FOR ALL TEXT INPUTS
    const upperValue = value.toUpperCase();
    let updatedData = { ...formData, [name]: upperValue };

    // AUTO-FILL REGISTRATION NUMBER LOGIC
    if (name === "certificateNumber") {
      const parts = upperValue.split("/");
      const lastPart = parts[parts.length - 1];
      updatedData.registrationNumber = lastPart;
    }

    setFormData(updatedData);
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourse = e.target.value;
    const predefinedSubjects = COURSE_SUBJECTS[selectedCourse] || [];

    const paddedSubjects = [
      ...predefinedSubjects,
      "",
      "",
      "",
      "",
      "",
      "",
    ].slice(0, 6);

    setFormData({
      ...formData,
      courseName: selectedCourse,
      subjects: paddedSubjects,
      customCourseName:
        selectedCourse === "OTHER" ? "" : formData.customCourseName,
    });
  };

  const handleSubjectChange = (index: number, value: string) => {
    const newSubjects = [...formData.subjects];
    // FORCING UPPERCASE FOR SUBJECTS
    newSubjects[index] = value.toUpperCase();
    setFormData({ ...formData, subjects: newSubjects });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/studentCertificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseText = await res.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error("Server returned invalid response.");
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to save data");
      }

      toast.success(
        data.message || "Student Certificate Data Saved Successfully!",
        {
          description: `Registration No: ${formData.registrationNumber}`,
        },
      );

      setFormData(initialData);
    } catch (error: any) {
      toast.error("Submission Failed", {
        description: error.message || "Check console for details.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-emerald-900 px-8 py-6 text-white">
          <h2 className="text-3xl font-bold uppercase">New Student Entry</h2>
          <p className="text-emerald-200 mt-1 uppercase">
            Save student details to the database.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Section 1: Official Records */}
          <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100 space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 border-b border-emerald-200 pb-2 mb-4">
              <BadgeCheck size={20} />
              <h3 className="text-lg font-bold uppercase tracking-wide">
                Official Records
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Certificate Number"
                name="certificateNumber"
                value={formData.certificateNumber}
                onChange={handleChange}
                placeholder="E.G. RAPTI/R9/2025158"
              />
              <InputField
                label="Registration Number"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="AUTO-FILLED"
              />
            </div>
          </div>

          {/* Section 2: Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 border-b border-gray-200 pb-2 mb-4">
              <User size={20} />
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                Personal Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="STUDENT NAME"
                />
              </div>
              <InputField
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all uppercase"
                >
                  <option value="">SELECT GENDER</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              <div className="md:col-span-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase">
                  Education Qualification
                </label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all uppercase"
                >
                  <option value="">SELECT QUALIFICATION</option>
                  <option value="9TH">9TH</option>
                  <option value="10TH">10TH</option>
                  <option value="11TH">11TH</option>
                  <option value="12TH PASS">12TH PASS</option>
                  <option value="GRADUATE">GRADUATE</option>
                  <option value="POST GRADUATE">POST GRADUATE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Family & Identification */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 border-b border-gray-200 pb-2 mb-4">
              <FileText size={20} />
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                Student & Identity
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Father's Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="MR. NAME"
              />
              <InputField
                label="Mother's Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="MRS. NAME"
              />
              <InputField
                label="Identity Proof Type"
                name="identityProof"
                value={formData.identityProof}
                onChange={handleChange}
                placeholder="E.G. AADHAR CARD"
              />
              <InputField
                label="Identity Document No."
                name="identityDocNo"
                value={formData.identityDocNo}
                onChange={handleChange}
                placeholder="XXXX-XXXX-XXXX"
              />
            </div>
          </div>

          {/* Section 4: Course Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 border-b border-gray-200 pb-2 mb-4">
              <BookOpen size={20} />
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                Course Details
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase">
                  Course Name
                </label>
                <select
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleCourseChange}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all uppercase"
                >
                  <option value="">SELECT COURSE</option>
                  {Object.keys(COURSE_SUBJECTS).map((courseKey) => (
                    <option key={courseKey} value={courseKey}>
                      {courseKey}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase">
                  Duration
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all uppercase"
                >
                  <option value="">SELECT DURATION</option>
                  <option value="2 MONTHS">2 MONTHS</option>
                  <option value="3 MONTHS">3 MONTHS</option>
                  <option value="4 MONTHS">4 MONTHS</option>
                  <option value="6 MONTHS">6 MONTHS</option>
                  <option value="12 MONTHS">12 MONTHS</option>
                </select>
              </div>

              {formData.courseName === "OTHER" && (
                <div className="md:col-span-2">
                  <InputField
                    label="Enter Custom Course Name"
                    name="customCourseName"
                    value={formData.customCourseName}
                    onChange={handleChange}
                    placeholder="TYPE COURSE NAME HERE..."
                  />
                </div>
              )}

              <InputField
                label="Start Date (Optional)"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
              />
              <InputField
                label="End Date (Optional)"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
              />
              <div className="md:col-span-2">
                <InputField
                  label="Passout Year/Status (Optional)"
                  name="passout"
                  value={formData.passout}
                  onChange={handleChange}
                  placeholder="E.G. 2025 OR COMPLETED"
                />
              </div>
            </div>

            {(formData.courseName || formData.courseName === "OTHER") && (
              <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="text-md font-semibold text-gray-700 mb-4 uppercase">
                  Course Subjects
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.subjects.map((subject, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-600 mb-1 uppercase">
                        Subject {index + 1}
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) =>
                          handleSubjectChange(index, e.target.value)
                        }
                        placeholder={`SUBJECT ${index + 1}`}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all uppercase"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-emerald-200 flex items-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed uppercase"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} /> SAVING...
                </>
              ) : (
                <>
                  <Save size={24} /> SAVE TO DATABASE
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}: any) => (
  <div className="w-full">
    <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-gray-400 uppercase"
    />
  </div>
);

export default StudentCertificate;
