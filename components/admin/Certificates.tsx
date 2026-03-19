"use client";
import React, { useEffect, useState } from "react";
import { Pencil, Loader2, Save, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Brought over the exact dictionary from your form for perfect consistency
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

// Removed 'category', added 'subjects' array
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
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (student: any) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `/api/studentCertificate/${student.registrationNumber}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        toast.success("Student deleted successfully");
        fetchStudents(); // refresh table
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (student: any) => {
    // Ensure subjects array exists even if old data doesn't have it
    const safeStudent = {
      ...student,
      subjects: student.subjects?.length ? student.subjects : ["", "", "", "", "", ""]
    };
    setFormData({ ...initialData, ...safeStudent });
    setIsEdit(true);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourse = e.target.value;
    const predefinedSubjects = COURSE_SUBJECTS[selectedCourse] || [];
    
    // Auto-fill subjects on course change, exactly like the main form
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

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await fetch(`/api/studentCertificate/${formData.registrationNumber}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      toast.success("Student updated successfully");
      setIsEdit(false);
      fetchStudents();
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Student Records Admin</h1>
        <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
          Total Students: {students.length}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-emerald-600">
          <Loader2 className="animate-spin mb-2" size={40} />
          <p className="font-medium">Loading Database...</p>
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
                  <tr key={s._id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-emerald-900">{s.registrationNumber || "null"}</div>
                      <div className="text-xs text-gray-500 mt-1 uppercase">ID: {s.identityProof || "null"}</div>
                      <div className="text-xs font-mono text-gray-600">No: {s.identityDocNo || "null"}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{s.courseName || "null"}</div>
                      <div className="text-xs text-emerald-600 font-medium">Dur: {s.duration || "null"}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {/* Removed Category from here */}
                        DOB: {s.dob || "null"} | Edu: {s.education || "null"}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 italic underline decoration-emerald-200 underline-offset-4">
                        {s.name || "null"}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1 leading-tight">
                        F: {s.fatherName || "null"}<br />
                        M: {s.motherName || "null"}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-700 font-medium">Start: {s.startDate || "null"}</div>
                      <div className="text-xs text-gray-700 font-medium">End: {s.endDate || "null"}</div>
                      <div className="text-[10px] text-emerald-500 mt-1 font-bold">Passout: {s.passout || "null"}</div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(s)}
                          className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                          title="Edit Student"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(s)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          title="Delete Student"
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
          <div className="bg-white max-w-5xl w-full rounded-2xl shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Edit Student Record</h2>
                <p className="text-sm text-gray-500">Update information for {formData.name}</p>
              </div>
              <button onClick={() => setIsEdit(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ModalInput label="Registration No" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} disabled />
              <ModalInput label="Certificate No" name="certificateNumber" value={formData.certificateNumber} onChange={handleChange} />
              <ModalInput label="Full Name" name="name" value={formData.name} onChange={handleChange} />
              
              <ModalInput label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
              
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Converted Education to match Form options */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Education</label>
                <select name="education" value={formData.education} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
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

              <ModalInput label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
              <ModalInput label="Mother's Name" name="motherName" value={formData.motherName} onChange={handleChange} />
              <ModalInput label="Identity Proof" name="identityProof" value={formData.identityProof} onChange={handleChange} />
              <ModalInput label="Identity Doc No" name="identityDocNo" value={formData.identityDocNo} onChange={handleChange} />
              
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Course Name</label>
                <select name="courseName" value={formData.courseName} onChange={handleCourseChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option value="">Select Course</option>
                  {Object.keys(COURSE_SUBJECTS).map((courseKey) => (
                    <option key={courseKey} value={courseKey}>
                      {courseKey}
                    </option>
                  ))}
                </select>
              </div>

              {formData.courseName === "Other" && (
                <ModalInput label="Custom Course Name" name="customCourseName" value={formData.customCourseName} onChange={handleChange} />
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Duration</label>
                <select name="duration" value={formData.duration} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option value="">Select Duration</option>
                  <option value="2 Months">2 Months</option>
                  <option value="3 Months">3 Months</option>
                  <option value="4 Months">4 Months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="12 Months">12 Months</option>
                </select>
              </div>

              <ModalInput label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
              <ModalInput label="End Date" name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
              <ModalInput label="Passout Year" name="passout" value={formData.passout} onChange={handleChange} />
            </div>

            {/* Added Subject Editing so subjects aren't lost on update */}
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
                        onChange={(e) => handleSubjectChange(index, e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <button
                onClick={() => setIsEdit(false)}
                className="px-6 py-2.5 font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="px-8 py-2.5 bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-800 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-70"
              >
                {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                Update Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ModalInput = ({ label, name, value, onChange, type = "text", disabled = false, placeholder = "" }: any) => (
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
      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all disabled:bg-gray-100 disabled:text-gray-400"
    />
  </div>
);

export default AdminStudentCertificate;