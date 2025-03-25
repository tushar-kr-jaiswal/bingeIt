import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./elements/Topnav.jsx";
import Dropdown from "./elements/Dropdown.jsx";
import axios from "../utils/Axios.jsx";
import Cards from "./elements/Cards.jsx";
import Loader from "./elements/Loader.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  document.title = "BingeIt | Trending";

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching trending results:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setTrending([]);
    setHasMore(true);
    getTrending();
  }, [category, duration]);

  return (
    <div className="relative w-full max-h-screen bg-[#1F1E24] overflow-y-hidden">
      <nav className="w-full min-h-[10vh] py-5 md:px-5 flex items-center fixed top-0 z-50 bg-opacity-60 backdrop-blur-xl shadow-lg md:flex-row flex-col bg-[#1F1E24]">
        {/* Go back btn */}
        <div className="flex items-center md:px-10 md:w-2/10 gap-x-4 w-full md:flex-none justify-between px-5">
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
            Trending
          </span>
        </div>

        {/* Search Bar */}
        <div className="mx-auto md:w-5/10 w-full">
          <Topnav />
        </div>

        {/* Dropdown for category and duration */}
        <div className="flex md:w-3/10 gap-x-4 w-full px-5 md:px-0">
          <Dropdown
            title="Category"
            options={[
              { label: "TV", value: "tv" },
              { label: "Movie", value: "movie" },
              { label: "All", value: "all" },
            ]}
            func={(e) => setCategory(e.target.value)}
          />
          <Dropdown
            title="Duration"
            options={[
              { label: "Week", value: "week" },
              { label: "Day", value: "day" },
            ]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </nav>

      {/* Content Section */}
      <div
        id="scrollableDiv"
        className="w-full mt-[30vh] md:mt-[20vh] bg-[#1F1E24] overflow-auto h-[calc(100vh-30vh)] md:h-[calc(100vh-20vh)]"
      >
        {trending.length === 0 ? (
          <Loader />
        ) : (
          <InfiniteScroll
            dataLength={trending.length}
            next={getTrending}
            hasMore={hasMore}
            loader={<Loader />}
            scrollableTarget="scrollableDiv" // Ensures only this div scrolls
          >
            <Cards data={trending} title="Category" />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default Trending;
