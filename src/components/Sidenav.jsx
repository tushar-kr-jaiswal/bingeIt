import React from "react";
import { Link } from "react-router-dom";

function Sidenav({ open, setOpen }) {
  return open ? (
    <div className="h-full p-3">
      <h1 className="flex items-center justify-between mb-5">
        <span className="flex items-center gap-x-3 text-[2.5vh] md:text-[3vh]">
          <img src="/icons/tv.svg" alt="BingIt" className="size-4" />
          BingeIt
        </span>
        <button
          onClick={() => setOpen(false)}
          className="bg-[#6556cd] text-white px-5 py-1 hover:bg-[#777784] duration-150 rounded-xl cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </button>
      </h1>
      <h1 className="text-zinc-200 text-[2.8vh]">New Feeds</h1>
      <nav className="flex flex-col lg:gap-y-5 mt-5 px-2 gap-y-3 text-[2.5vh] lg:text-[3vh]">
        <Link
          to="/trending"
          className="hover:bg-[#6556cd] hover:text-white py-1.5 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-2 flex items-center w-full"
        >
          <i className="ri-fire-fill text-[#F44040] text-[3.7vh] mr-2"></i>
          Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#6556cd] hover:text-white py-1.5 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-2 flex items-center w-full"
        >
          <i className="ri-gemini-fill text-[3.7vh] text-[#E7D215] mr-2"></i>
          Popular
        </Link>
        <Link
          to="/movie"
          className="hover:bg-[#6556cd] hover:text-white py-1.5 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-2 flex items-center w-full"
        >
          <i className="ri-film-line text-[3.7vh] mr-2"></i>
          Movies
        </Link>
        <Link
          to="/tv"
          className="hover:bg-[#6556cd] hover:text-white py-1.5 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-2 flex items-center w-full"
        >
          <img
            src="/icons/tv.svg"
            alt="Tv Logo"
            className="inline-block mr-2 w-[3.7vh] h-[3.7vh] "
          />
          Tv Shows
        </Link>
        <Link
          to="/person"
          className="hover:bg-[#6556cd] hover:text-white py-1.5 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-2 flex items-center w-full"
        >
          <i className="ri-team-fill text-[3.7vh] mr-2 text-blue-500"></i>
          People
        </Link>
      </nav>
      <hr className="w-11/12 mt-5 mx-auto" />
      <nav className="flex flex-col lg:gap-y-5 mt-5 px-2 gap-y-3 text-[2.5vh]">
        <Link
          to="/about"
          className="hover:bg-[#6556cd] hover:text-white py-1.5 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-2 flex items-center w-full"
        >
          <i className="ri-information-2-fill text-[3.7vh] mr-2"></i>
          About Me
        </Link>
        <Link
          to="/contact"
          className="hover:bg-[#6556cd] hover:text-white py-1.5 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-2 flex items-center w-full"
        >
          <i className="ri-phone-fill text-[3.7vh] mr-2 text-[#05DF72]"></i>
          Contact Me
        </Link>
      </nav>
    </div>
  ) : (
    <button
      className="mt-8 flex mx-auto cursor-pointer"
      onClick={() => setOpen(true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 9h16.5m-16.5 6.75h16.5"
        />
      </svg>
    </button>
  );
}

export default Sidenav;
