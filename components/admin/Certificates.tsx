"use client";
import React, { useEffect, useState } from "react";
import { Pencil, Loader2, Save, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Updated keys to UPPERCASE for perfect matching
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

const initialData = {
  registrationNumber: "",
  certificateNumber: "",
  name: "",
  dob: "",
  gender: "",
  education: "",
  fatherName: "",
  motherName: "",
  identityProof: "",
  identityDocNo: "",
  courseName: "",
  customCourseName: "",
  duration: "",
  startDate: "",
  endDate: "",
  passout: "",
  subjects: ["", "", "", "", "", ""],
};

const AdminStudentCertificate = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/getCertificateAll");
      const data = await res.json();
      setStudents(data);
    } catch {
      toast.error("FAILED TO LOAD STUDENTS");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (student: any) => {
    const confirmDelete = confirm(
      `ARE YOU SURE YOU WANT TO DELETE ${student.name}?`,
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `/api/studentCertificate/${student.registrationNumber}`,
        { method: "DELETE" },
      );
      if (response.ok) {
        toast.success("STUDENT DELETED SUCCESSFULLY");
        fetchStudents();
      } else {
        toast.error("DELETE FAILED");
      }
    } catch (error) {
      toast.error("SOMETHING WENT WRONG");
    }
  };

  const handleEdit = (student: any) => {
    const safeStudent = {
      ...student,
      subjects: student.subjects?.length
        ? student.subjects
        : ["", "", "", "", "", ""],
    };
    setFormData({ ...initialData, ...safeStudent });
    setIsEdit(true);
  };

  const handleChange = (e: any) => {
    // FORCE UPPERCASE ON ALL INPUTS
    const upperValue = e.target.value.toUpperCase();
    setFormData({ ...formData, [e.target.name]: upperValue });
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
    newSubjects[index] = value.toUpperCase(); // FORCE UPPERCASE
    setFormData({ ...formData, subjects: newSubjects });
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await fetch(
        `/api/studentCertificate/${formData.registrationNumber}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      if (!res.ok) throw new Error();
      toast.success("STUDENT UPDATED SUCCESSFULLY");
      setIsEdit(false);
      fetchStudents();
    } catch {
      toast.error("UPDATE FAILED");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 uppercase">
          Student Records Admin
        </h1>
        <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg uppercase">
          Total Students: {students.length}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-emerald-600">
          <Loader2 className="animate-spin mb-2" size={40} />
          <p className="font-medium uppercase">Loading Database...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold">Reg & Identity</th>
                  <th className="px-6 py-4 font-bold">Course & Details</th>
                  <th className="px-6 py-4 font-bold">Students Info</th>
                  <th className="px-6 py-4 font-bold">Timeline</th>
                  <th className="px-6 py-4 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {students.map((s) => (
                  <tr
                    key={s._id}
                    className="hover:bg-emerald-50/30 transition-colors uppercase"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-emerald-900">
                        {s.registrationNumber || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        ID: {s.identityProof || "N/A"}
                      </div>
                      <div className="text-xs font-mono text-gray-600">
                        NO: {s.identityDocNo || "N/A"}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">
                        {s.courseName || "N/A"}
                      </div>
                      <div className="text-xs text-emerald-600 font-medium">
                        DUR: {s.duration || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        DOB: {s.dob || "N/A"} | EDU: {s.education || "N/A"}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 italic underline decoration-emerald-200 underline-offset-4">
                        {s.name || "N/A"}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1 leading-tight">
                        F: {s.fatherName || "N/A"}
                        <br />
                        M: {s.motherName || "N/A"}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-700 font-medium">
                        START: {s.startDate || "N/A"}
                      </div>
                      <div className="text-xs text-gray-700 font-medium">
                        END: {s.endDate || "N/A"}
                      </div>
                      <div className="text-[10px] text-emerald-500 mt-1 font-bold">
                        PASSOUT: {s.passout || "N/A"}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(s)}
                          className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(s)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {isEdit && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white max-w-5xl w-full rounded-2xl shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto uppercase">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  EDIT STUDENT RECORD
                </h2>
                <p className="text-sm text-gray-500">
                  UPDATE INFORMATION FOR {formData.name}
                </p>
              </div>
              <button
                onClick={() => setIsEdit(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ModalInput
                label="Registration No"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                disabled
              />
              <ModalInput
                label="Certificate No"
                name="certificateNumber"
                value={formData.certificateNumber}
                onChange={handleChange}
              />
              <ModalInput
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <ModalInput
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none uppercase"
                >
                  <option value="">SELECT GENDER</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                  Education
                </label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none uppercase"
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

              <ModalInput
                label="Father's Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
              <ModalInput
                label="Mother's Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
              />
              <ModalInput
                label="Identity Proof"
                name="identityProof"
                value={formData.identityProof}
                onChange={handleChange}
              />
              <ModalInput
                label="Identity Doc No"
                name="identityDocNo"
                value={formData.identityDocNo}
                onChange={handleChange}
              />

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                  Course Name
                </label>
                <select
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleCourseChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none uppercase"
                >
                  <option value="">SELECT COURSE</option>
                  {Object.keys(COURSE_SUBJECTS).map((courseKey) => (
                    <option key={courseKey} value={courseKey}>
                      {courseKey}
                    </option>
                  ))}
                </select>
              </div>

              {formData.courseName === "OTHER" && (
                <ModalInput
                  label="Custom Course Name"
                  name="customCourseName"
                  value={formData.customCourseName}
                  onChange={handleChange}
                />
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                  Duration
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none uppercase"
                >
                  <option value="">SELECT DURATION</option>
                  <option value="2 MONTHS">2 MONTHS</option>
                  <option value="3 MONTHS">3 MONTHS</option>
                  <option value="4 MONTHS">4 MONTHS</option>
                  <option value="6 MONTHS">6 MONTHS</option>
                  <option value="12 MONTHS">12 MONTHS</option>
                </select>
              </div>

              <ModalInput
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
              />
              <ModalInput
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
              />
              <ModalInput
                label="Passout Year"
                name="passout"
                value={formData.passout}
                onChange={handleChange}
              />
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-4">
                Course Subjects (Editable)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.subjects.map((subject, index) => (
                  <div key={index} className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">
                      Subject {index + 1}
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) =>
                        handleSubjectChange(index, e.target.value)
                      }
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm uppercase"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <button
                onClick={() => setIsEdit(false)}
                className="px-6 py-2.5 font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-all uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="px-8 py-2.5 bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-800 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-70 uppercase"
              >
                {saving ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Save size={20} />
                )}
                Update Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ModalInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled = false,
  placeholder = "",
}: any) => (
  <div className="space-y-1 w-full">
    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all disabled:bg-gray-100 disabled:text-gray-400 uppercase"
    />
  </div>
);

export default AdminStudentCertificate;
