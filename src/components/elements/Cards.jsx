import React from "react";
import { Link } from "react-router-dom";

function Cards({ data, width = "65vh", height = "35vh", title }) {
  return (
    
    <div className="flex flex-wrap gap-4 justify-center items-center p-2 w-full bg-transparent">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          key={i}
          className="flex overflow-hidden relative items-end p-2 text-white bg-gray-900 bg-center bg-cover rounded-lg"
          style={{
            width: width,
            height: height,
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent), url(${
              c.poster_path
                ? `https://image.tmdb.org/t/p/original${c.poster_path}`
                : c.backdrop_path
                ? `https://image.tmdb.org/t/p/original${c.backdrop_path}`
                : c.profile_path
                ? `https://image.tmdb.org/t/p/original${c.profile_path}`
                : "https://i.pinimg.com/736x/58/ba/02/58ba02574825e973412ef0fb37340955.jpg" // Fallback image
            })`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h2 className="text-lg font-bold">
            {c.title || c.name || "Untitled"}
          </h2>
          {c.vote_average !== undefined && c.vote_average !== null && (
            <span className="absolute bottom-2 right-4 px-3 text-black bg-yellow-500 rounded-xl">
              {c.vote_average.toFixed(1) * 10} %
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Cards;
