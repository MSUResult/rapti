"use client";
import React, { useState } from "react";
import { Lock, LogOut, ShieldCheck, Bell } from "lucide-react";
import StudentCertificate from "@/components/admin/StruentCertificate";
import Sidebar from "@/components/admin/sidebar";
import Galllery from "@/components/admin/Galllery";
import AdminStudentCertificate from "@/components/admin/Certificates";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("admission"); // State for switching views

  const SECRET_KEY = "admin123";

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === SECRET_KEY) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-4 font-sans">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/10">
          <div className="bg-emerald-50 p-8 flex flex-col items-center">
            <div className="bg-emerald-600 p-4 rounded-2xl shadow-xl shadow-emerald-200 mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-gray-800">Secure Access</h1>
            <p className="text-gray-500 text-sm">
              Enter credentials to manage portal
            </p>
          </div>
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Admin Password"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <p className="text-red-500 text-sm text-center font-medium">
                  Invalid security key
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg"
              >
                Verify Identity
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* SIDEBAR FIXED ON LEFT */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOP NAVBAR */}
       

        {/* DYNAMIC CONTENT CONTAINER */}
        <main className="p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === "admission" && <StudentCertificate />}
            {activeTab === "images" && (
              <Galllery />
            )}
            {activeTab === "certificate" && (
             <AdminStudentCertificate />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
