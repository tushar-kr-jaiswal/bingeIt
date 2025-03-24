import React from "react";

const AboutMe = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white px-5">
      <div className="max-w-lg text-center bg-gray-800/50 backdrop-blur-lg p-10 rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.5)] border border-gray-700">
        <h1 className="text-4xl font-extrabold text-cyan-400 mb-4 animate-pulse drop-shadow-[0_0_5px_cyan]">
          Tushar Kumar Jaiswal
        </h1>
        <p className="text-lg text-gray-400 tracking-wide">
          Full Stack Developer | New Delhi, India
        </p>
        <div className="flex justify-center gap-8 mt-6">
          <a
            href="https://github.com/tushar-kr-jaiswal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl transition transform hover:scale-125 hover:text-gray-400"
          >
            <i className="ri-github-fill"></i>
          </a>
          <a
            href="https://instagram.com/chitrakaariya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-pink-500 transition transform hover:scale-125 hover:text-pink-400"
          >
            <i className="ri-instagram-line"></i>
          </a>
          <a
            href="https://x.com/Tusharkj03"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-white transition transform hover:scale-125 hover:text-blue-400"
          >
            <i className="ri-twitter-x-line"></i>
          </a>
        </div>
        <div className="mt-8">
          <button
            onClick={() =>
              window.open("mailto:tusharjais03@gmail.com", "_blank")
            }
            className="px-6 py-3 text-lg font-semibold bg-cyan-500 text-gray-900 rounded-full transition-all hover:shadow-[0_0_20px_cyan] hover:scale-105"
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
