"use client";
import React from "react";

const Whatsapp = () => {
  const message = "Hello Sir, I want to know about your courses.";
  const encodedMessage = encodeURIComponent(message);

  const handleClick = () => {
    window.open(`https://wa.me/917618550475?text=${encodedMessage}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-8 cursor-pointer right-8 bg-[#25D366] text-white p-3 rounded-full shadow-md z-50 flex items-center justify-center"
    >
      {/* Official WhatsApp SVG Path */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.031 2C6.446 2 1.92 6.526 1.92 12.111c0 1.784.466 3.526 1.35 5.057L1.92 22.111l5.057-1.35c1.531.884 3.273 1.35 5.057 1.35 5.585 0 10.111-4.526 10.111-10.111C22.145 6.526 17.619 2 12.031 2zm5.717 14.364c-.244.69-.974 1.252-1.631 1.442-.455.132-.91.244-2.548-.445-1.996-.84-3.277-2.868-3.376-3.003-.1-.135-.813-1.077-.813-2.052 0-.974.51-1.45.69-1.65.181-.2.395-.25.526-.25.131 0 .262 0 .376.01.116.006.27.02.42.368.15.348.517 1.258.563 1.352.046.095.076.205.013.333-.063.128-.094.21-.188.317-.094.108-.198.24-.282.324-.094.095-.192.197-.082.385.11.188.487.804 1.048 1.303.722.643 1.332.842 1.52.937.188.094.298.079.408-.047.11-.126.471-.548.597-.736.126-.188.252-.157.423-.094.172.063 1.09.514 1.278.608.188.095.313.142.359.221.046.079.046.458-.198 1.148z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default Whatsapp;
