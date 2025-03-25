import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./elements/Topnav.jsx";
import Dropdown from "./elements/Dropdown.jsx";
import axios from "../utils/Axios.jsx";
import Cards from "./elements/Cards.jsx";
import Loader from "./elements/Loader.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

function TvShows() {
  const [category, setCategory] = useState("airing_today");
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  document.title = "SCSDB | TvShows";

  const getTvShows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      //   console.log(data);
      if (data.results.length > 0) {
        setTvShows((prev) => [...prev, ...data.results]); // appending new data with previous data
        setPage((prevPage) => prevPage + 1); // functional update to ensure correct state update
        // console.log(tvShows);
      } else {
        setHasMore(false); // No more data is available in API
      }
    } catch (error) {
      console.error("Error fetching trending results:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setTvShows([]);
    setHasMore(true);
    getTvShows();
  }, [category]);

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
          <h1 className="text-xl md:text-2xl">Tv Shows</h1>
        </div>

        {/* Search */}
        <div className="w-full md:w-7/12">
          <Topnav />
        </div>

        {/* Dropdowns */}
        <div className="flex w-full px-2 gap-x-3 md:w-3/12">
          <Dropdown
            title="Category"
            options={[
              { label: "On The Air", value: "on_the_air" },
              { label: "Popular", value: "popular" },
              { label: "Top_Rated", value: "top_rated" },
              { label: "Airing Today", value: "airing_today" },
            ]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </nav>

      {/* Cards */}
      <section
        id="scrollableDiv"
        className="w-full bg-[#1F1E24] overflow-auto"
        style={{ height: "calc(100vh - 18vh)" }} // Ensure this height is correctly calculated
      >
        {tvShows.length === 0 ? (
          <Loader />
        ) : (
          <InfiniteScroll
            dataLength={tvShows.length}
            next={getTvShows}
            hasMore={hasMore}
            loader={<Loader />}
            scrollableTarget="scrollableDiv" // Ensures only this div scrolls
          >
            <Cards data={tvShows} title="tv" />
          </InfiniteScroll>
        )}
      </section>
    </div>
  );
}

export default TvShows;
