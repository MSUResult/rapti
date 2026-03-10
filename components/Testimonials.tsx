"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
  const reviews = [
    {
      name: "Arjun Mehta",
      course: "NIELIT 'O' Level",
      review: "Rapti Computers changed my career trajectory. The faculty is incredibly supportive, and the DOEACC certification helped me land my first IT job in Pune!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Sharma",
      course: "CCC Certification",
      review: "The best institute for computer basics. The 80-hour CCC course was so well-structured that I felt confident using computers for my business within weeks.",
      image: "https://plus.unsplash.com/premium_photo-1723568666044-1b066e26b1fb?q=80&w=1921&auto=format&fit=crop",
    },
    {
      name: "Ankit Verma",
      course: "Web Development",
      review: "Highly professional environment. Being a pioneer since 1996, their experience shows in the way they handle complex programming modules.",
      image: "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?q=80&w=764&auto=format&fit=crop",
    },
    {
      name: "Sneha Iyer",
      course: "DIT Diploma",
      review: "The internal certification plus the NIELIT recognized certificate gave me a double advantage. The labs are modern and the staff is expert.",
      image: "https://images.unsplash.com/photo-1518518873111-6ca469aa4560?q=80&w=687&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-[100px] -z-10 opacity-50" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-[100px] -z-10 opacity-50" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
            Alumni Success
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Student Success Stories
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Empowering careers since 1996. Join thousands of successful students who started their journey with us.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={40}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5, centeredSlides: false },
          }}
          className="!pb-16 testimonial-swiper"
        >
          {reviews.map((item, idx) => (
            <SwiperSlide key={idx} className="h-auto">
              <div className="group bg-white p-10 rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2">
                <div>
                  {/* Decorative Quote Mark */}
                  <div className="text-6xl text-blue-100 font-serif absolute top-6 right-10 leading-none group-hover:text-blue-200 transition-colors">
                    &rdquo;
                  </div>
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-slate-600 text-lg leading-relaxed mb-8 relative z-10">
                    {item.review}
                  </p>
                </div>

                <div className="flex items-center gap-5 pt-6 border-t border-slate-50">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-50"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 border-2 border-white">
                      <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg leading-tight">{item.name}</h4>
                    <p className="text-blue-600 font-semibold text-sm">{item.course}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet {
          background: #3b82f6;
          opacity: 0.3;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;