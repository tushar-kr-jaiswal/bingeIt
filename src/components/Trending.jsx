import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./elements/Topnav.jsx";
import Dropdown from "./elements/Dropdown";
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
    <div className="w-full max-h-screen pt-5 overflow-y-hidden">
      {/* Nav and dropdowns */}
      <nav className="flex flex-col items-center px-5 md:flex-row">
        {/* Nav */}
        <div className="flex items-center justify-between w-full md:w-2/12">
          <button
            onClick={() => navigate("/")}
            className="md:px-5 py-0.5 bg-zinc-800 rounded-2xl cursor-pointer hover:bg-[#6556cd] duration-200 px-3"
          >
            {" "}
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
          <h1 className="text-xl md:text-2xl">Trending</h1>
        </div>

        {/* Search */}
        <div className="w-full md:w-7/12">
          <Topnav />
        </div>

        {/* Dropdowns */}
        <div className="flex w-full px-2 gap-x-3 md:w-3/12">
          <Dropdown
            title={category}
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

      {/* Cards */}
      <section
        id="scrollableDiv"
        className="w-full bg-[#1F1E24] overflow-auto"
        style={{ height: "calc(100vh - 18vh)" }} // Ensure this height is correctly calculated
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
      </section>
    </div>
  );
}

export default Trending;
