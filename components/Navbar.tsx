"use client";

import { useState } from "react"; // Added state for mobile menu
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react"; // Added Menu and X icons

const items = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/course" },
  { name: "Contact", href: "/contact" },
  { name: "Result", href: "/result" },
  { name: "Blogs", href: "/blog" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 py-3 px-4 md:px-12 bg-blue-600/95 backdrop-blur-md flex justify-between items-center shadow-lg border-b border-white/10">
      {/* 1. Logo Section - Scaled for Mobile */}
      <Link href="/" className="flex items-center group">
        <div className="relative w-40 md:w-64 h-12 md:h-16 bg-white rounded-lg p-1 overflow-hidden transition-all">
          <img
            src="/rapti-logo.jpg"
            alt="Rapti NIELIT Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </Link>

      {/* 2. Desktop Navigation Links */}
      <section className="hidden md:flex bg-white/10 backdrop-blur-xl rounded-full px-2 py-1.5 border border-white/20">
        {items.map((item, index) => (
          <Link key={index} href={item.href}>
            <div
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                pathname === item.href
                  ? "bg-white text-blue-700 shadow-md"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </section>

      {/* 3. Action Section & Mobile Toggle */}
      <section className="flex gap-2 md:gap-4 items-center">
        <button
          className="bg-gradient-to-br from-yellow-400 to-amber-500 px-4 md:px-6 py-2 rounded-lg font-extrabold text-blue-900 text-xs md:text-sm uppercase"
          onClick={() => router.push("/admin")}
        >
          Admin
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </section>

      {/* 4. Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-blue-700 border-t border-white/10 flex flex-col p-6 gap-4 md:hidden shadow-2xl">
          {items.map((item, index) => (
            <Link key={index} href={item.href} onClick={() => setIsOpen(false)}>
              <div
                className={`text-lg font-bold p-2 ${
                  pathname === item.href ? "text-yellow-400" : "text-white"
                }`}
              >
                {item.name}
              </div>
            </Link>
          ))}
          <a
            href="tel:+9176185504"
            className="flex items-center gap-2 text-yellow-400 font-bold border-t border-white/10 pt-4"
          >
            <Phone size={18} /> +91 76185504
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
