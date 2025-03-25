import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./elements/Topnav.jsx";
import axios from "../utils/Axios.jsx";
import Cards from "./elements/Cards.jsx";
import Loader from "./elements/Loader.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

function People() {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  document.title = "SCSDB | People";

  const getPeople = async () => {
    try {
      const { data } = await axios.get(`person/popular?page=${page}`);
      // console.log(data.results);
      if (data.results.length > 0) {
        setPeople((prev) => [...prev, ...data.results]); // appending new data with previous data
        setPage((prevPage) => prevPage + 1); // functional update to ensure correct state update
      } else {
        setHasMore(false); // No more data is available in API
      }
    } catch (error) {
      console.error("Error fetching trending results:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setPeople([]);
    setHasMore(true);
    getPeople();
  }, []);

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
          <h1 className="text-xl md:text-2xl">Person</h1>
        </div>

        {/* Search */}
        <div className="w-full md:w-7/12">
          <Topnav />
        </div>
      </nav>

      {/* Cards */}
      <section
        id="scrollableDiv"
        className="w-full bg-[#1F1E24] overflow-auto"
        style={{ height: "calc(100vh - 18vh)" }} // Ensure this height is correctly calculated
      >
        {people.length === 0 ? (
          <Loader />
        ) : (
          <InfiniteScroll
            dataLength={people.length}
            next={getPeople}
            hasMore={hasMore}
            loader={<Loader />}
            scrollableTarget="scrollableDiv" // Ensures only this div scrolls
          >
            <Cards data={people} width="40vh" height="50vh" title="person" />
          </InfiniteScroll>
        )}
      </section>
    </div>
  );
}

export default People;
