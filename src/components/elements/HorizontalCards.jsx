import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader.jsx";

function HorizontalCards({ data, category = "" }) {
  if (!data) return null;

  return data ? (
    <div className="w-full px-5 max-h-[37vh] pt-4">
      {/* Horizontal Scrollable Container */}
      <div className="overflow-x-auto w-full scrollbar-hide scroll-smooth">
        <div className="flex items-center space-x-3 w-max">
          {data.map((d, index) => {
            const imageUrl =
              d.backdrop_path || d.poster_path
                ? `https://image.tmdb.org/t/p/original${
                    d.backdrop_path || d.poster_path
                  }`
                : "https://i.pinimg.com/736x/58/ba/02/58ba02574825e973412ef0fb37340955.jpg"; // ✅ Correctly applying fallback image

            return (
              <Link
                to={`/${d.media_type || category}/details/${d.id}`}
                key={`${d.id}-${index}`} // Ensures unique keys
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent), url(${imageUrl})`,
                  backgroundPosition: "top",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                className="md:w-[50vh] md:h-[25vh] w-[35vh] h-[20vh] rounded shrink-0 relative"
              >
                <span className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-1 rounded">
                  {d.title || d.original_name || d.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default HorizontalCards;
