import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./elements/Loader.jsx";
import convertDateFormat from "../utils/convertDateFormat.js";

function Header({ data }) {
  const [isLoading, setIsLoading] = useState(true);
  // console.log(data.release_date)
  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  function convertDateFormat(dateString) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }

  if (isLoading) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center text-white text-2xl animate-pulse">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full h-[50vh] px-5 ">
      <div
        className="relative w-full h-full text-white bg-center bg-cover rounded-lg overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent), url(${
            data.backdrop_path
              ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
              : "https://i.pinimg.com/736x/58/ba/02/58ba02574825e973412ef0fb37340955.jpg"
          })`,
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute w-full lg:px-10 md:px-5 px-2 text-white bottom-5">
          <Link
            to={`/${data.media_type}/details/${data.id}`}
            className="text-[3vh] font-bold drop-shadow-lg hover:text-blue-400"
          >
            {data?.original_title ||
              data?.title ||
              data?.original_name ||
              data?.name ||
              "No Title Available"}
          </Link>
          <Link
            to={`/${data.media_type}/details/${data.id}`}
            className="text-[1.9vh] mt-1.5 drop-shadow-md"
          >
            {data?.overview?.length > 100 ? (
              <p className="hover:text-blue-400">
                {data.overview.slice(0, 100)} ...
              </p>
            ) : (
              data?.overview || "No description available"
            )}
          </Link>
          <span className="text-[2vh]">
            🎬 {convertDateFormat(data.release_date) || "No Information"}
          </span>
          <span className="text-[2vh] ml-5">
            <i className="ri-album-line text-amber-400 text-[2.5vh]"></i>{" "}
            {data.media_type?.toUpperCase() || "No Information"}
          </span>
          <br />
          <Link
            to={`/${data.media_type}/details/${data.id}/trailer`}
            className="bg-[#6556CD] text-white px-5 py-1 rounded mt-2 flex items-center w-fit"
          >
            Watch Trailer
            <i className="ri-play-circle-line ml-2 text-[2.7vh] font-bold"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
