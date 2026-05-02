"use client";

import React, { useState, useEffect } from "react";

import { Lock, KeyRound, RefreshCw } from "lucide-react";

import StudentCertificate from "@/components/admin/StruentCertificate";

import Sidebar from "@/components/admin/sidebar";

import Galllery from "@/components/admin/Galllery";

import AdminStudentCertificate from "@/components/admin/Certificates";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("admission");

  // ✅ NEW: loading state
  const [loading, setLoading] = useState(false);

  // Reset Form States
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState({ type: "", text: "" });

  // Persistence: Check if already logged in on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAdminAuth");
    if (authStatus === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ prevent multiple clicks
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputPassword: passwordInput }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("isAdminAuth", "true");
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(true);
    } finally {
      // ✅ re-enable button
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (data.success) {
        setResetMessage({
          type: "success",
          text: "Password updated in Database!",
        });
        setOldPassword("");
        setNewPassword("");
      } else {
        setResetMessage({ type: "error", text: data.error || "Update failed" });
      }
    } catch (err) {
      console.error("Update failed:", err);
      setResetMessage({ type: "error", text: "Server error occurred" });
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-emerald-600 p-4 rounded-2xl mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-gray-800">Secure Access</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin Password"
              className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />

            {error && (
              <p className="text-red-500 text-sm text-center">
                Invalid security key
              </p>
            )}

            <button
              type="submit"
              disabled={loading} // ✅ disable button
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold disabled:opacity-60"
            >
              {loading ? "Checking..." : "Verify Identity"}{" "}
              {/* ✅ optional text */}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === "admission" && <StudentCertificate />}
          {activeTab === "images" && <Galllery />}
          {activeTab === "certificate" && <AdminStudentCertificate />}

          {activeTab === "settings" && (
            <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-sm border">
              <div className="flex items-center gap-3 mb-6">
                <KeyRound className="text-emerald-600 w-6 h-6" />
                <h2 className="text-xl font-bold text-gray-800">
                  Security Settings
                </h2>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full p-3 bg-gray-50 border rounded-xl"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full text-black p-3 bg-gray-50 border rounded-xl"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />

                {resetMessage.text && (
                  <p
                    className={`text-sm ${
                      resetMessage.type === "success"
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {resetMessage.text}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold flex justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Update Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
