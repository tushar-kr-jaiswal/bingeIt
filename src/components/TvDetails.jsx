import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import HorizontalCards from "./elements/HorizontalCards.jsx";
import Loader from "./elements/Loader.jsx";
import { asyncLoadTv } from "../store/actions/tvActions.jsx";
import { removeTv } from "../store/reducers/TvSlice.jsx";

function TvDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);

  // console.log(info);
  // detail.original_title || title
  // detail.release_date

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncLoadTv(id));
    return () => {
      dispatch(removeTv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent), url(${
          info.detail.backdrop_path ||
          info.detail.poster_path ||
          info.detail.profile_path
            ? `https://image.tmdb.org/t/p/original/${
                info.detail.backdrop_path ||
                info.detail.poster_path ||
                info.detail.profile_path
              }`
            : "/notFound.jpg" // ✅ This ensures a fallback image
        })`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="relative w-full min-h-[150vh] overflow-y-auto overflow-x-hidden"
    >
      {/* nav */}
      <nav className="h-[10vh] py-5 px-5 flex items-center bg-opacity-60 backdrop-blur-xl border-0 border-gray-600 shadow-lg gap-x-10 bg-zinc-200/10 rounded-r-full md:w-5/12 lg:w-5/12 xl:w-3/12 sm:w-5/12 w-10/12">
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
        <a href={info.detail.homepage} target="_blank">
          <i className="text-2xl text-white ri-external-link-line"></i>
        </a>
        <a
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
          target="_blank"
        >
          <i className="text-2xl text-blue-500 bg-green-400 rounded-full ri-earth-fill"></i>
        </a>
        <a
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
          target="_blank"
        >
          <img src="/icons/imdb.svg" alt="imdb logo" className="w-12 h-auto" />
        </a>
      </nav>

      {/* cemtre  */}
      <div className="w-full md:max-h-[80vh] overflow-hidden lg:px-24 flex justify-center gap-x-2 mt-20 lg:flex-row flex-col px-10 mb-[40vh]">
        {/* Half screen for image and platform  */}
        <div className="lg:w-4/12 h-full w-full">
          <img
            src={
              info?.detail?.backdrop_path ||
              info?.detail?.poster_path ||
              info?.detail?.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    info.detail.poster_path ||
                    info.detail.profile_path ||
                    info.detail.backdrop_path
                  }`
                : "https://i.pinimg.com/736x/58/ba/02/58ba02574825e973412ef0fb37340955.jpg" // Provide a default fallback image
            }
            alt="Movie Poster"
            className="object-cover w-[40vh] h-[50vh] object-center rounded-lg"
          />
          <div className="flex flex-col gap-y-3 items-start mt-3 w-fit">
            {info.watchProviders && info.watchProviders.flatrate ? (
              <div className="flex gap-x-3 items-center mt-0 bg-opacity-60 border-0 border-gray-600 shadow-lg backdrop-blur-xl w-fit">
                <span className="px-2 py-2 text-[2.8vh] text-white rounded-l-full">
                  Available On:
                </span>
                {info.watchProviders && info.watchProviders.flatrate
                  ? info.watchProviders.flatrate.map((w, i) => {
                      return (
                        <img
                          key={i}
                          className="w-[8vh] h-[8vh] object-cover"
                          src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                          alt={w.provider_name}
                        />
                      );
                    })
                  : null}
              </div>
            ) : null}

            {info.watchProviders && info.watchProviders.rent ? (
              <div className="flex gap-x-3 items-center mt-0 bg-opacity-60 border-0 border-gray-600 shadow-lg backdrop-blur-xl w-fit">
                <span className="px-2 py-2 text-[2.8vh] text-white rounded-l-full">
                  Rent On:
                </span>
                {info.watchProviders && info.watchProviders.rent
                  ? info.watchProviders.rent.map((w, i) => {
                      return (
                        <img
                          key={i}
                          className="w-[8vh] h-[8vh] object-cover"
                          src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                          alt={w.provider_name}
                        />
                      );
                    })
                  : null}
              </div>
            ) : null}

            {info.watchProviders && info.watchProviders.buy ? (
              <div className="flex gap-x-3 items-center mt-0 bg-opacity-60 border-0 border-gray-600 shadow-lg backdrop-blur-xl w-fit">
                <span className="px-2 py-2 text-[2.8vh] text-white rounded-l-full">
                  Buy On:
                </span>
                {info.watchProviders && info.watchProviders.buy
                  ? info.watchProviders.buy.map((w, i) => {
                      return (
                        <img
                          key={i}
                          className="w-[8vh] h-[8vh] object-cover"
                          src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                          alt={w.provider_name}
                        />
                      );
                    })
                  : null}
              </div>
            ) : null}
          </div>
        </div>

        {/*  Half screen to show stuff about movie */}
        <div className="lg:w-8/12 w-full h-full">
          <h1 className="lg:text-[5vh] text-[4vh] text-white">
            {info.detail.original_name || info.detail.name}
            <sub> ({info?.detail?.first_air_date?.split("-")[0]})</sub>
          </h1>
          {info.detail.vote_average !== undefined &&
          info.detail.vote_average !== null ? (
            <>
              <span className="px-3 py-0.5 text-black bg-yellow-500 rounded-xl">
                {info.detail.vote_average.toFixed(1) * 10} %
              </span>
            </>
          ) : (
            ""
          )}
          <span className="ml-5 text-[2.5vh] text-white">
            {info.detail.genres.map((info) => info.name).join(" , ")}
          </span>
          {info?.detail?.runtime && (
            <span className="px-5 py-2 ml-2 text-white bg-blue-700 rounded-xl w-fit">
              <i className="mr-2 ri-hourglass-line"></i>
              {info?.detail?.runtime} min
            </span>
          )}
          <p className="mt-3 text-[3vh] text-white">{info.detail.tagline}</p>
          <span className=" text-[3vh] text-white">Overview : </span>
          <p className=" text-[2vh] text-white mb-5">{info.detail.overview}</p>
          <span className="text-3xl text-white">
            Movie Translated in {info.translations.length} languages
          </span>
          <p className="text-[2vh] text-white mb-3">
            {info.translations.join(",")}
          </p>
          <Link
            className="text-white bg-[#6556cd] px-5 py-2 rounded-lg flex items-center w-fit"
            to={`${pathname}/trailer`}
          >
            Play Trailer
            <i className="ri-play-circle-line ml-2 text-[2.7vh] font-bold"></i>
          </Link>
        </div>
      </div>

      {/* Seasons */}

      <div className="mt-10 w-full text-white h-[70vh]">
        <hr className="w-[98vw] mx-auto mb-2 text-white" />
        <h1 className="px-5 text-3xl font-bold text-white">Seasons </h1>
        <HorizontalCards data={info.detail.seasons} category="tv" />
      </div>

      {/* Recommendations and similar */}
      {info.recommendations.length > 0 || info.similar.length > 0 ? (
        <div className="absolute bottom-1 mt-0 w-full text-white h-fit ">
          <hr className="w-[98vw] mx-auto mb-2 text-white" />
          <h1 className="px-5 text-3xl font-bold text-white">
            Recommendations & Similar Stuff{" "}
          </h1>
          <HorizontalCards
            data={
              info.recommendations.length > 0
                ? info.recommendations
                : info.similar
            }
          />
        </div>
      ) : null}
      <Outlet />
    </div>
  ) : (
    <Loader />
  );
}

export default TvDetails;
