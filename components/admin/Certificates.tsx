"use client";
import React, { useEffect, useState } from "react";
import { Pencil, Loader2, Save, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

const initialData = {
  registrationNumber: "",
  certificateNumber: "",
  name: "",
  dob: "",
  gender: "",
  category: "",
  education: "",
  fatherName: "",
  motherName: "",
  identityProof: "",
  identityDocNo: "",
  courseName: "",
  duration: "",
  startDate: "",
  endDate: "",
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
      {
        method: "DELETE",
      }
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
    setFormData(student);
    setIsEdit(true);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
                  <th className="px-6 py-4 font-bold">Family Info</th>
                  <th className="px-6 py-4 font-bold">Timeline</th>
                  <th className="px-6 py-4 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {students.map((s) => (
                  <tr key={s._id} className="hover:bg-emerald-50/30 transition-colors">
                    {/* Column 1: Reg/Identity */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-emerald-900">{s.registrationNumber || "N/A"}</div>
                      <div className="text-xs text-gray-500 mt-1 uppercase">{s.identityProof || "Aadhar Card"}</div>
                      <div className="text-xs font-mono text-gray-600">{s.identityDocNo || "—"}</div>
                    </td>

                    {/* Column 2: Course/Duration/DOB */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{s.courseName || "No Course Selected"}</div>
                      <div className="text-xs text-emerald-600 font-medium">Dur: {s.duration || "—"}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        DOB: {s.dob || "—"} | Cat: {s.category || "Gen"}
                      </div>
                    </td>

                    {/* Column 3: Names */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 italic underline decoration-emerald-200 underline-offset-4">{s.name}</div>
                      <div className="text-[11px] text-gray-500 mt-1 leading-tight">
                        F: {s.fatherName || "—"}<br />
                        M: {s.motherName || "—"}
                      </div>
                    </td>

                    {/* Column 4: Dates */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-700 font-medium">Start: {s.startDate || "—"}</div>
                      <div className="text-xs text-gray-700 font-medium">End: {s.endDate || "—"}</div>
                      <div className="text-[10px] text-emerald-500 mt-1 font-bold">Mob: {s.mobile || "Not Provided"}</div>
                    </td>

                    {/* Actions */}
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
          <div className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
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
              {Object.keys(initialData).map((key) => (
                <div key={key} className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    name={key}
                    value={(formData as any)[key] || ""}
                    onChange={handleChange}
                    disabled={key === "registrationNumber"}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all disabled:bg-gray-100"
                  />
                </div>
              ))}
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

export default AdminStudentCertificate;