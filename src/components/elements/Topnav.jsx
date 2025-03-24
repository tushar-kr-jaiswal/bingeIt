import { Link } from "react-router-dom";
import axios from "../../utils/Axios.jsx";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Loader from "./Loader.jsx";

function Topnav() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more results exist
  const searchInputRef = useRef(null);
  const observer = useRef(null); // Ref for infinite scrolling

  // Fetch search results
  const getSearches = async (isNewSearch = false) => {
    if (query.trim() === "") {
      setData([]);
      setSearched(false);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `/search/multi?query=${query}&page=${isNewSearch ? 1 : page}`
      );

      if (isNewSearch) {
        setData(data.results);
      } else {
        setData((prevData) => [...prevData, ...data.results]); // Append new results
      }

      setSearched(true);
      setHasMore(data.results.length > 0); // Check if more results exist
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle new search input
  useEffect(() => {
    setPage(1); // Reset page on new search
    const delayDebounce = setTimeout(() => {
      getSearches(true); // Pass true to reset results
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Load more results when reaching the bottom
  useEffect(() => {
    if (!hasMore || isLoading) return;
    getSearches();
  }, [page]);

  // Intersection Observer for infinite scrolling
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleShortcut = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      } else if (event.key === "Escape") {
        setQuery("");
        setData([]);
        setSearched(false);
        setIsLoading(false);
      }
    };

    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="md:w-[80%] max-w-[90%] h-[10vh] relative mx-auto mt-5 z-[999] w-[90%]">
      <input
        type="search"
        placeholder="Ctrl + K to search..."
        className="w-full px-5 py-3 rounded-full bg-transparent text-[2.7vh] text-white outline-1 outline-white focus:outline-2"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        ref={searchInputRef}
      />

      {query.length > 0 && (
        <div className="absolute top-[8vh] left-1/2 transform -translate-x-1/2 w-full max-w-[98%] rounded-lg max-h-[50vh] px-2 py-2 overflow-y-auto bg-opacity-60 backdrop-blur-xl border border-gray-600 shadow-lg z-[999] mt-1">
          {isLoading && page === 1 ? (
            <div className="flex justify-center py-5">
              <Loader />
            </div>
          ) : searched && data.length === 0 ? (
            <h1 className="text-[2.9vh] text-center text-white">Not Found</h1>
          ) : (
            data.map((d, index) => (
              <Link
                to={`/${d.media_type}/details/${d.id}`}
                key={d.id}
                className="w-[100%] flex items-center justify-start rounded-lg gap-x-3 border border-gray-700 overflow-hidden mt-2 bg-zinc-900 hover:bg-zinc-700 duration-200"
                ref={index === data.length - 1 ? lastElementRef : null} // Set ref to last element
              >
                <img
                  src={
                    d.backdrop_path || d.poster_path || d.profile_path
                      ? `https://image.tmdb.org/t/p/original${
                          d.backdrop_path || d.poster_path || d.profile_path
                        }`
                      : "https://i.pinimg.com/736x/58/ba/02/58ba02574825e973412ef0fb37340955.jpg"
                  }
                  alt={d.title || d.original_name || d.name}
                  className="w-[45vh] h-[25vh] object-cover rounded-md"
                />
                <h1 className="text-xl text-white">
                  {d.title || d.original_name || d.name}
                </h1>
              </Link>
            ))
          )}

          {isLoading && page > 1 && (
            <div className="flex justify-center py-5">
              <Loader />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Topnav;
