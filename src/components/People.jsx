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

  return people.length > 0 ? (
    <div className="relative w-full max-h-screen bg-[#1F1E24] overflow-hidden">
      <nav className="w-full min-h-[10vh] px-5 flex items-center fixed top-0 z-50 bg-opacity-60 backdrop-blur-xl border-0 border-gray-600 shadow-lg md:flex-row flex-col justify-center">
        <div className="flex gap-x-4 items-center md:px-10 md:w-2/10 w-full md:justify-normal justify-between">
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
            People
          </span>
        </div>
        <div className="mx-auto md:w-8/10 w-full">
          <Topnav />
        </div>
      </nav>
      <div
        id="scrollableDiv"
        className="w-full mt-[18vh] bg-[#1F1E24] overflow-auto"
        style={{
          height: "calc(100vh - 18vh)", // Ensures div takes up remaining viewport height
          overflowY: "auto", // Allows scrolling only inside this div
        }}
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
      </div>
    </div>
  ) : (
    <div className="w-full">
      <Loader />
    </div>
  );
}

export default People;
