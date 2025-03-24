import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Trailer() {
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytVideo = useSelector((state) => state[category]?.info?.videos);
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        navigate(-1); // Go back to the previous page
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [navigate]);

  return ytVideo?.key ? (
    <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen text-white z-[100] bg-[rgba(0,0,0,0.9)]">
      {/* Back Button Positioned at the Top-Left */}
      <button
        onClick={() => navigate(-1)}
        className="absolute p-2 transition rounded-full shadow-lg cursor-pointer top-5 left-5 bg-black/50 hover:bg-black/70"
      >
        <i className="text-4xl ri-close-large-fill"></i>
      </button>

      {/* YouTube Video Player */}
      <ReactPlayer
        controls
        url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
        width="100%"
        height="100%"
      />
    </div>
  ) : (
    <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-screen text-white bg-black">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute p-2 transition rounded-full shadow-lg cursor-pointer top-5 right-5 bg-black/50 hover:bg-black/70"
      >
        <i className="text-4xl ri-close-large-fill"></i>
      </button>

      {/* 404 Message */}
      <p className="mb-4 text-lg font-semibold">No video available</p>

      {/* 404 Image */}
      <img
        src="https://www.tuee.it/wp-content/uploads/2022/05/wordpress-login-errore-404.jpg"
        alt="Video Not Found"
        className="w-full h-auto max-w-2xl rounded-lg"
      />

      {/* Back Button (If User Misses the Top Button) */}
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 mt-4 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700"
      >
        Go Back
      </button>
    </div>
  );
}

export default Trailer;
