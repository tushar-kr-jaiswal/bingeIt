import React, { useState, useEffect } from "react";
import Sidenav from "./Sidenav";
import Topnav from "./elements/Topnav.jsx";
import Loader from "./elements/Loader.jsx";
import Header from "./Header.jsx";
import Dropdown from "./elements/Dropdown.jsx";
import axios from "../utils/Axios.jsx";
import HorizontalCards from "./elements/HorizontalCards.jsx";

function Home() {
  const [open, setOpen] = useState(false);
  document.title = "BingeIt | Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomData);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <div className="w-full h-full flex bg-[#1F1E24] overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          open
            ? "w-[60%] sm:w-[50%] lg:w-[35%] xl:w-[20%]"
            : "w-[9%] sm:w-[10%] lg:w-[5%] xl:w-[5%]"
        } transition-all duration-700 h-full`}
      >
        <Sidenav open={open} setOpen={setOpen} />
      </div>

      {/* Main Content */}
      <div
        className={`${
          open
            ? "w-[40%] sm:w-[50%] lg:w-[65%] xl:w-[80%]"
            : "w-[91%] sm:w-[90%] lg:w-[95%] xl:w-[95%]"
        } flex flex-col transition-all duration-700`}
      >
        {/* Top Navbar - Fixed Position to Ensure Visibility */}
        <div className="w-full min-h-[10vh] sticky top-0 z-50 bg-[#1F1E24] shadow-lg">
          <Topnav />
        </div>

        {/* Header Wallpaper */}
        <div className="w-full h-[50vh] mt-5 mb-2">
          <Header data={wallpaper} />
        </div>

        <hr className="w-[95%] mt-5 mx-auto mb-2 border border-white" />

        {/* Trending Section */}
        <div className="w-full flex flex-col gap-y-2 md:px-5 px-0 mt-5">
          <div className="flex items-center justify-between w-full px-5 gap-x-16">
            <h1 className="xl:text-[4vh] text-[3vh] font-bold">Trending</h1>
            <Dropdown
              title={category}
              options={[
                { label: "TV", value: "tv" },
                { label: "Movie", value: "movie" },
                { label: "All", value: "all" },
              ]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <HorizontalCards data={trending} />
        </div>

        <hr className="w-11/12 mt-5 mx-auto mb-2 border border-zinc-500" />
        <span className="text-[2.5vh] font-bold text-center mb-2">
          Made by Tushar Kumar Jaiswal ❤️
        </span>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center w-full h-screen">
      <Loader />
    </div>
  );
}

export default Home;
