import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  asyncLoadperson,
  removePerson,
} from "../store/actions/personActions.jsx";
import Loader from "./elements/Loader.jsx";
import HorizontalCards from "./elements/HorizontalCards.jsx";
import Dropdown from "./elements/Dropdown.jsx";

function PersonDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const [category, setCategory] = useState("movie");
  console.log(info);
  // detail.original_title || title
  // detail.release_date

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncLoadperson(id));
    return () => {
      dispatch(removePerson());
    };
  }, [id]);
  return info ? (
    <div
      // style={{
      //     backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent), url(${
      //         info.detail.backdrop_path || info.detail.poster_path || info.detail.profile_path
      //             ? `https://image.tmdb.org/t/p/original/${
      //                   info.detail.backdrop_path ||
      //                   info.detail.poster_path ||
      //                   info.detail.profile_path
      //               }`
      //             : "https://via.placeholder.com/500x300" // ✅ This ensures a fallback image
      //     })`,
      //     backgroundPosition: "center",
      //     backgroundRepeat: "no-repeat",
      //     backgroundSize: "cover",
      // }}
      className="relative w-full min-h-screen bg-zinc-900 overflow-hidden"
    >
      <nav
        className="h-[10vh] py-5 px-5 flex items-center bg-opacity-60 backdrop-blur-xl border-0 border-gray-600 shadow-lg gap-x-10 bg-zinc-100/10 rounded-r-full md:w-4/12 lg:w-3/12 xl:w-2/12 sm:w-5/12 w-8/12 
      "
      >
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
        <a
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
          target="_blank"
        >
          <i className="text-2xl text-blue-500 bg-green-400 rounded-full ri-earth-fill"></i>
        </a>
        <a
          href={`https://www.imdb.com/name/${info.externalId.imdb_id}`}
          target="_blank"
        >
          <img
            src="/icons/imdb.svg"
            alt="imdb logo"
            className="xl:w-[3.4vw] xl:h-[10vh] lg:w-[5vw] lg:h-[20vh] md:w-[6vw] md:h-[10vh] sm:w-[6vw] sm:h-[10vh] w-[7vh] h-[10vh]"
          />
        </a>
      </nav>

      <div className="w-full min-h-fit flex justify-center gap-x-2 md:mt-20 px-5 md:flex-row flex-col mt-10 gap-y-5">
        {/* Half screen for image and platform  */}
        <div className="md:w-4/12 h-full w-full flex justify-center md:flex-none">
          <img
            src={
              info?.detail?.profile_path
                ? `https://image.tmdb.org/t/p/original/${info.detail.profile_path}`
                : "https://i.pinimg.com/736x/58/ba/02/58ba02574825e973412ef0fb37340955.jpg" // Provide a default fallback image
            }
            alt="Actor Poster"
            className="object-cover w-[40vh] h-[50vh] object-center rounded-lg"
          />
        </div>

        {/*  Half screen to show stuff about movie */}
        <div className="md:w-8/12 h-full text-zinc-200 w-full px-5">
          <h1 className="text-[5vh]">{info.detail.name}</h1>
          <div className="flex flex-col gap-y-3">
            <h5>Known For : {info.detail.known_for_department}</h5>
            <h5>Gender : {info.detail.gender === 1 ? "Female" : "Male"}</h5>
            <h5>Birthday : {info.detail.birthday}</h5>
            <h5>
              DeathDay :{" "}
              {info.detail.deathday === null
                ? "Still Alive"
                : info.detail.deathday}
            </h5>
            <h5>Place of Birth : {info.detail.place_of_birth}</h5>
            <div className="flex gap-x-3 items-center md:flex-row flex-col">
              <h5 className="mr-5">Social Media :</h5>{" "}
              <div className="flex gap-x-3 items-center">
                {info.externalId.instagram_id !== null ? (
                  <a
                    href={`https://www.instagram.com/${info.externalId.instagram_id}/`}
                    target="_blank"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                      alt="Instagram Logo"
                      width="25"
                    />
                  </a>
                ) : null}
                {info.externalId.twitter_id !== null ? (
                  <a
                    href={`https://www.twitter.com/${info.externalId.twitter_id}/`}
                    target="_blank"
                  >
                    <i className="text-3xl rounded-full ri-twitter-x-line"></i>
                  </a>
                ) : null}
                {info.externalId.youtube_id !== null ? (
                  <a
                    href={`https://www.youtube.com/${info.externalId.youtube_id}/`}
                    target="_blank"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
                      alt="YouTube Logo"
                      className="bg-white rounded-sm"
                      width="100"
                    />
                  </a>
                ) : null}
              </div>
            </div>
            <p>Also Known as : {info.detail.also_known_as?.join(", ")}</p>
          </div>
        </div>
      </div>
      <div className="md:px-24 px-10 mt-5 w-full text-white">
        {info.detail.biography && (
          <>
            <h2 className="mb-2 text-2xl">Biography :</h2>
            <p className="text-[2vh]">{info.detail.biography}</p>
          </>
        )}
      </div>
      <hr className="w-[90%] text-white mx-auto mt-2" />
      <div className="w-full h-[35vh] text-white md:px-20 mt-5 px-5">
        <h1 className="text-2xl">Known for : </h1>
        <HorizontalCards data={info.combinedCredits.cast} />
      </div>
      <hr className="w-[90%] text-white mx-auto mt-2 mb-10" />

      <div className="w-full h-[60vh] md:px-20 px-5 my-5">
        <div className="flex justify-between items-center w-full flex-col md:flex-row">
          <h1 className="mb-5 text-2xl text-white">Worked In : </h1>
          <Dropdown
            title="Category"
            options={[
              { label: "TV", value: "tv" },
              { label: "Movie", value: "movie" },
            ]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="w-full max-h-[50vh] bg-black my-5 list-disc text-white p-5 overflow-x-hidden overflow-y-auto shadow-[0px_0px_10px_3px_rgba(255,255,255,0.3)]">
          {info[category + "Credits"].cast ? (
            info[category + "Credits"].cast.map((c, i) => (
              <li className="mt-5 w-full" key={i}>
                <Link
                  to={`/${category}/details/${c.id}`}
                  className="text-zinc-400 hover:text-white"
                >
                  <span>
                    Movie -{" "}
                    {c.title || c.name || c.original_name || c.original_title}
                  </span>
                  <br />
                  <span>
                    {c.character && `Character Name - ${c.character}`}
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <h1 className="text-2xl text-white">No Data Available</h1>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default PersonDetails;
