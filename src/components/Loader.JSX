import React, { useEffect, useState } from "react";

const Loader = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1800); // Thời gian hiển thị 1.8s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-[#0b0706] flex flex-col items-center justify-center z-[9999] transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo hoặc chữ thương hiệu */}
      <h1 className="text-4xl font-playfair tracking-[0.2em] text-white mb-6">
        MOC <span className="text-brand">DIEN</span>
      </h1>

      {/* Vòng tròn xoay */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-gray-600"></div>
        <div className="absolute inset-0 rounded-full border-t-2 border-brand animate-spin-slow"></div>
      </div>

      {/* Dòng chữ nhỏ bên dưới */}
      <p className="text-gray-400 text-xs mt-5 tracking-widest uppercase">
        Đang tải nội dung...
      </p>
    </div>
  );
};

export default Loader;