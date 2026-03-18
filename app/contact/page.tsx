import React from "react";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-blue-900 py-20 px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-blue-100 max-w-2xl mx-auto">
          Have questions? We're here to help you build your future in IT. Reach
          out to us through any of the channels below.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-12 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Location Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-start gap-5 hover:scale-105 transition-transform">
              <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Location
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Opposite Baliya Kheri Block,
                  <br />
                  Krishna Nagar, Delhi Road,
                  <br />
                  Saharanpur-247001
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-start gap-5 hover:scale-105 transition-transform">
              <div className="bg-green-100 p-4 rounded-2xl text-green-600">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Phone Number
                </h3>
                <p className="text-gray-600 font-medium">+91 9458506862</p>
                <p className="text-gray-600 font-medium">+91 9897058937</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-start gap-5 hover:scale-105 transition-transform">
              <div className="bg-purple-100 p-4 rounded-2xl text-purple-600">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Email Address
                </h3>
                <p className="text-gray-600 font-medium">
                  info@rapticomputers.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 0000000000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Inquiry about 'O' Level"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Embedded Map Placeholder */}
<div className="max-w-7xl mx-auto px-4 pb-20">
  <div className="w-full h-96 rounded-3xl overflow-hidden shadow-inner">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3286.453192452735!2d77.53122177554962!3d29.935463674978646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDU2JzA3LjciTiA3N8KwMzInMDEuNyJF!5e1!3m2!1sen!2sin!4v1773852143238!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="w-full h-full"
    ></iframe>
  </div>
</div>
    </div>
  );
};

export default ContactUs;
