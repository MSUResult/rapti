import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import HeroImageSlider from "../components/HeroImageRotator"; 

export const revalidate = 3600;

const avatars = [
  { src: "https://plus.unsplash.com/premium_photo-1682089854123-740310ebad43?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "icon" },
  { src: "https://plus.unsplash.com/premium_photo-1682089846950-974c7c7d5e91?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "teacher" },
  { src: "https://images.unsplash.com/photo-1752858710722-768eee64b6dd?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "student" },
];

export default async function Hero() {
  let settings = null;
  try {
    await dbConnect();
    settings = await SiteSettings.findOne().lean();
  } catch (error) {
    console.error("❌ Database Fetch Error:", error);
  }



 const dbImage = settings?.heroImage;
  const defaultImage = "/bg-44.jpg";
  


  return (
    // Changed <main> to <section> to fix Hydration nesting error
    <section className="min-h-[90vh] bg-blue-600 flex lg:flex-row flex-col items-center justify-between px-6 lg:px-20 overflow-hidden py-12">
      {/* LEFT CONTENT */}
      <div className="max-w-3xl lg:max-w-[42rem] text-center lg:text-left z-10">
        {/* BADGE */}
        <div className="inline-flex items-center bg-blue-700/50 backdrop-blur-sm text-yellow-400 text-[10px] tracking-[0.2em] font-black px-4 py-1.5 rounded-full mb-6 uppercase border border-blue-400/30">
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mr-2"></span>
          ISO 9001:2015 Certified
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6">
          Master the Future of Tech in{" "}
          <span className="text-yellow-400 drop-shadow-sm">Saharanpur</span>
        </h1>

        <p className="text-blue-100 font-medium text-lg md:text-xl leading-relaxed mb-10 opacity-90">
          Join <span className="text-white font-bold">Rapti Computers</span>,
          Saharanpur&apos;s premier institute with 20+ years of legacy in
          delivering high-quality O-Level, CCC, and Advanced Diploma courses.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center lg:items-start">
          <Link href="/contact" className="w-full sm:w-auto">
            <button className="w-full bg-yellow-400 text-blue-900 font-black py-4 px-10 rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] uppercase text-sm tracking-widest">
              Start Your Journey
            </button>
          </Link>

          {/* ALUMNI INFO */}
          <div className="flex items-center bg-white/10 backdrop-blur-md p-2 pr-6 rounded-2xl border border-white/10 shadow-xl">
            <div className="flex -space-x-3">
              {avatars.map((it, ind) => (
                <div
                  key={ind}
                  className="w-12 h-12 rounded-full border-2 border-blue-600 overflow-hidden shadow-lg"
                >
                  <img
                    src={it.src}
                    alt={it.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="pl-4 text-left">
              <p className="text-white font-black text-sm">2,000+ Alumni</p>
              <p className="text-blue-200 text-[10px] uppercase font-bold tracking-tighter">
                Working in Top Firms
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE (The "Ad" Section) */}
      <div className="relative mt-16 lg:mt-0 group">
        {/* Decorative Glows */}
        <div className="absolute -inset-4 bg-yellow-400 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>

    {/* Pass the data from Server to Client component */}
        <HeroImageSlider dbImage={dbImage} defaultImage={defaultImage} />
      </div>
    </section>
  );
}
