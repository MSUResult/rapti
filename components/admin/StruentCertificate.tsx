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
  "Course in Computer Concept": [
    "Intro to computer",
    "Making small presentation",
    "Element of word processing",
    "Computer comm. & internet",
    "Spreadsheet",
    "Intro to GUI Base OS",
  ],
  "O Level": [
    "Intro to computer",
    "Making small presentation",
    "Element of word processing",
    "Computer comm. & internet",
    "Spreadsheet",
    "Intro to GUI Base OS",
  ],
  "Basic in Computer Application": ["", "", "", "", "", ""],
  "Certificate Course in Computer Accounting": [
    "Intro to computer",
    "Ms-Word, Excel Power Point",
    "Day Book And inventory Report",
    "Internet & E-mail",
    "Payroll, VAT, TDS, Taxation",
    "Tally ERP 9.0",
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
    "TALLY ERP 9.0 with GST",
  ],
  Other: ["", "", "", "", "", ""],
};

const StudentCertificate = () => {
  const [loading, setLoading] = useState(false);

  const initialData = {
    certificateNumber: "RAPTI/", // Pre-filled prefix
    registrationNumber: "",
    name: "",
    dob: "",
    gender: "",
    education: "",
    fatherName: "",
    motherName: "",
    identityProof: "Aadhar Card",
    identityDocNo: "",
    courseName: "",
    customCourseName: "",
    duration: "",
    startDate: "", // Optional
    endDate: "", // Optional
    passout: "", // New Optional Field
    subjects: ["", "", "", "", "", ""],
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    // AUTO-FILL REGISTRATION NUMBER LOGIC
    if (name === "certificateNumber") {
      const parts = value.split("/");
      const lastPart = parts[parts.length - 1];
      updatedData.registrationNumber = lastPart;
    }

    setFormData(updatedData);
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourse = e.target.value;
    
    // Get the predefined subjects, or an empty array if none found
    const predefinedSubjects = COURSE_SUBJECTS[selectedCourse] || [];

    // FIX: Pad the array to ALWAYS be exactly 6 elements to prevent backend errors
    // If a course only has 2 subjects, the last 4 will safely become empty strings
    const paddedSubjects = [
      ...predefinedSubjects,
      "", "", "", "", "", ""
    ].slice(0, 6);

    setFormData({
      ...formData,
      courseName: selectedCourse,
      subjects: paddedSubjects,
      customCourseName: selectedCourse === "Other" ? "" : formData.customCourseName,
    });
  };

  const handleSubjectChange = (index: number, value: string) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = value;
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
        }
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
          <h2 className="text-3xl font-bold">New Student Entry</h2>
          <p className="text-emerald-200 mt-1">
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
                placeholder="e.g. RAPTI/R9/2025158"
              />
              <InputField
                label="Registration Number"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Auto-filled from Certificate"
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
                  placeholder="Student Name"
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="md:col-span-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Education Qualification
                </label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                >
                  <option value="">Select Qualification</option>
                  <option value="9th">9th</option>
                  <option value="10th">10th</option>
                  <option value="11th">11th</option>
                  <option value="12th Pass">12th Pass</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                  <option value="Other">Other</option>
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
                placeholder="Mr. Name"
              />
              <InputField
                label="Mother's Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="Mrs. Name"
              />
              <InputField
                label="Identity Proof Type"
                name="identityProof"
                value={formData.identityProof}
                onChange={handleChange}
                placeholder="e.g. Aadhar Card"
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Course Name
                </label>
                <select
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleCourseChange}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                >
                  <option value="">Select Course</option>
                  {/* FIX: Dynamically mapping options from the dictionary so new ones always show up */}
                  {Object.keys(COURSE_SUBJECTS).map((courseKey) => (
                    <option key={courseKey} value={courseKey}>
                      {courseKey}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Duration
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                >
                  <option value="">Select Duration</option>
                  <option value="2 Months">2 Months</option>
                  <option value="3 Months">3 Months</option>
                  <option value="4 Months">4 Months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="12 Months">12 Months</option>
                </select>
              </div>

              {formData.courseName === "Other" && (
                <div className="md:col-span-2">
                  <InputField
                    label="Enter Custom Course Name"
                    name="customCourseName"
                    value={formData.customCourseName}
                    onChange={handleChange}
                    placeholder="Type course name here..."
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
                  placeholder="e.g. 2025 or Completed"
                />
              </div>
            </div>

            {(formData.courseName || formData.courseName === "Other") && (
              <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="text-md font-semibold text-gray-700 mb-4">
                  Course Subjects
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.subjects.map((subject, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Subject {index + 1}
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) =>
                          handleSubjectChange(index, e.target.value)
                        }
                        placeholder={`Subject ${index + 1}`}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
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
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-emerald-200 flex items-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} /> Saving...
                </>
              ) : (
                <>
                  <Save size={24} /> Save to Database
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
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-gray-400"
    />
  </div>
);

export default StudentCertificate;