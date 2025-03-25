import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./elements/Topnav.jsx";
import Dropdown from "./elements/Dropdown.jsx";
import axios from "../utils/Axios.jsx";
import Cards from "./elements/Cards.jsx";
import Loader from "./elements/Loader.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

function Popular() {
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  document.title = "BingeIt | Popular";

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      // console.log(data);

      if (data.results.length > 0) {
        setPopular((prev) => [...prev, ...data.results]); // append new data to the existing data
        setPage((prevPage) => prevPage + 1); // increment the page number
      } else {
        setHasMore(false); // if no more data is available, set hasMore to false
      }
    } catch (error) {
      console.error("Error fetching popular results:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setPopular([]);
    setHasMore(true);
    getPopular();
  }, [category]); // whenever category or duration changes, useEffect will run

  return (
    <div className="relative w-full max-h-screen bg-[#1F1E24] overflow-hidden">
      <nav className="w-full min-h-[10vh] py-5 px-5 flex items-center fixed top-0 z-50 bg-opacity-60 backdrop-blur-xl border-0 border-gray-600 shadow-lg md:flex-row flex-col justify-center">
        {/* Go back btn */}
        <div className="flex items-center md:px-10 md:w-2/10 justify-between w-full md:justify-normal md:gap-x-4">
          <button onClick={() => navigate("/")} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <span className="text-[3.1vh] text-white flex items-end gap-x-2">
            Popular
          </span>
        </div>

        {/* Search Bar */}
        <div className="mx-auto md:w-5/10 w-full">
          <Topnav />
        </div>

        {/* Dropdown for category and duration */}
        <div className="flex justify-center px-1 md:w-3/10 w-full">
          <Dropdown
            title="Category"
            options={[
              { label: "TV", value: "tv" },
              { label: "Movie", value: "movie" },
            ]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </nav>
      <div
        id="scrollableDiv"
        className="w-full mt-[30vh] md:mt-[20vh] bg-[#1F1E24] overflow-auto h-[calc(100vh-30vh)] md:h-[calc(100vh-20vh)]"
      >
        {popular.length === 0 ? (
          <Loader />
        ) : (
          <InfiniteScroll
            dataLength={popular.length}
            next={getPopular}
            hasMore={hasMore}
            loader={<Loader />}
            scrollableTarget="scrollableDiv" // Ensures only this div scrolls
          >
            <Cards data={popular} title={category} />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default Popular;
