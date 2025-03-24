import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Trending from "./components/Trending.jsx";
import Popular from "./components/Popular.jsx";
import Movie from "./components/Movie.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import Trailer from "./components/elements/Trailer.jsx";
import TvShows from "./components/TvShows.jsx";
import TvDetails from "./components/TvDetails.jsx";
import People from "./components/People.jsx";
import PersonDetails from "./components/PersonDetails.jsx";
import AboutMe from "./components/AboutMe.jsx";
function App() {
  return (
    <div className="w-full min-h-screen bg-[#1F1E24] flex font-[machina] overflow-y-auto text-white ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tv" element={<TvShows />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="/about" element={<AboutMe />} />
      </Routes>
    </div>
  );
}

export default App;
