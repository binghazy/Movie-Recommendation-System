//Components..
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

//React-carousel...
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Home data...
import { homeSliderSettings } from "./Home-data";

//firebase...
import { auth, database } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

//TMDB...
import {
  getTmdbImage,
  getTmdbMovieCollection,
  getTmdbMovieUrl,
} from "../config/tmdb";

//Styles...
import "../styles/subHome.scss";
import MobileNav from "../pages/Mobile-nav";

export default function Home() {
  const [user] = useAuthState(auth);
  const [tmdbMovies, setTmdbMovies] = useState([]);
  const [animePicks, setAnimePicks] = useState([]);
  const [movieLoading, setMovieLoading] = useState(true);
  const [animeLoading, setAnimeLoading] = useState(true);

  const heroMovie = useMemo(() => tmdbMovies[0], [tmdbMovies]);

  const handleAnimeClick = () => {
    localStorage.setItem("currentAnimePage", "1");
  };

  const createUserInfo = async () => {
    await setDoc(doc(database, "userInfo", user?.uid), {
      userId: user?.uid,
      userBookmarks: [],
    });
  };

  const haveAccount = async () => {
    try {
      const res = await getDoc(doc(database, "userInfo", user?.uid));
      if (!res?.data()) {
        createUserInfo();
      }
    } catch (error) {
      return;
    }
  };

  const getAnimePicks = async () => {
    try {
      setAnimeLoading(true);
      const res = await fetch(
        "https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=14"
      );
      const data = await res.json();
      setAnimePicks(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      setAnimePicks([]);
    } finally {
      setAnimeLoading(false);
    }
  };

  const getMoviePicks = async () => {
    setMovieLoading(true);
    const movies = await getTmdbMovieCollection("/trending/movie/week");
    setTmdbMovies(movies.slice(0, 14));
    setMovieLoading(false);
  };

  useEffect(() => {
    haveAccount();
    getMoviePicks();
    getAnimePicks();
  }, []);

  return (
    <section className="subHome-page">
      <MobileNav />

      <h1 className="trending-title">TMDB Movie Spotlight</h1>
      {heroMovie && (
        <div className="image-gradient">
          <img
            className="main-image"
            src={getTmdbImage(heroMovie.backdrop_path || heroMovie.poster_path)}
            alt={heroMovie.title}
          />
          <p className="hero-subtitle">Powered by TMDB</p>
          <h2 className="main-title">{heroMovie.title}</h2>
          <a
            href={getTmdbMovieUrl(heroMovie.id)}
            target="_blank"
            rel="noreferrer"
            className="more-info-btn"
          >
            View Movie
          </a>
        </div>
      )}

      <h1 className="rec-title">Top Movies</h1>
      {movieLoading && <p className="section-status">Loading TMDB movies...</p>}
      {!movieLoading && (
        <Slider {...homeSliderSettings} className="slider" id="sliderId">
          {tmdbMovies.map((movie) => (
            <a
              key={movie.id}
              href={getTmdbMovieUrl(movie.id)}
              target="_blank"
              rel="noreferrer"
              className="movie-card-link"
            >
              <img src={getTmdbImage(movie.poster_path, "w500")} loading="lazy" alt={movie.title} />
              <span className="movie-card-meta">{movie.title}</span>
            </a>
          ))}
        </Slider>
      )}

      <h1 className="rec-title">Top Anime</h1>
      {animeLoading && <p className="section-status">Loading anime picks...</p>}
      {!animeLoading && (
        <Slider {...homeSliderSettings} className="slider">
          {animePicks.map((item) => (
            <Link
              key={item.mal_id}
              to={`/discovery/anime/moreInfo/${item.mal_id}`}
              data-name="anime"
              onClick={handleAnimeClick}
            >
              <img
                src={item.images?.jpg?.image_url}
                loading="lazy"
                alt={item.title || "Anime poster"}
              />
              <span className="movie-card-meta">{item.title}</span>
            </Link>
          ))}
        </Slider>
      )}
    </section>
  );
}
