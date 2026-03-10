"use client";
import React from "react";
import { UserPlus, Image as ImageIcon, Award, LayoutDashboard } from "lucide-react";

const items = [
  { name: "Admission", id: "admission", icon: UserPlus },
  { name: "Gallery", id: "images", icon: ImageIcon },
  { name: "Certificates", id: "certificate", icon: Award },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-emerald-400">
          <LayoutDashboard size={24} />
          <span className="font-bold text-xl tracking-tight text-white">AdminPanel</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3">
          <p className="text-xs text-slate-500 uppercase font-bold">Logged in as</p>
          <p className="text-sm font-medium text-emerald-400">System Administrator</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;