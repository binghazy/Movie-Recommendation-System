import { useEffect, useState } from "react";
import { MdOpenInNew } from "react-icons/md";

import "../styles/Anime.scss";
import {
  getTmdbImage,
  getTmdbMovieCollection,
  getTmdbMovieUrl,
} from "../config/tmdb";

const movieFilters = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Now Playing", value: "now_playing" },
  { label: "Upcoming", value: "upcoming" },
];

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("popular");
  const [page, setPage] = useState(
    Number(localStorage.getItem("currentMoviePage")) || 1,
  );
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    localStorage.setItem("currentMoviePage", String(page));
  }, [page]);

  useEffect(() => {
    getMovies();
  }, [page, filter]);

  async function getMovies() {
    setLoading(true);
    setFetchError("");
    try {
      const data = await getTmdbMovieCollection(`/movie/${filter}`, { page });
      setMovies(data);
    } catch (error) {
      setFetchError("Could not load movies right now.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  const handleMore = () => {
    setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLess = () => {
    setPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="anime-page movie-page">
      <nav className="anime-nav-filter">
        <h2>TMDB Movies</h2>
        <div className="movie-filter-menu" role="tablist" aria-label="Movie filters">
          {movieFilters.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`movie-filter-btn ${filter === option.value ? "active" : ""}`}
              onClick={() => {
                setPage(1);
                setFilter(option.value);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </nav>

      {loading && <p className="section-status">Loading TMDB movies...</p>}
      {!loading && fetchError && <p className="section-status">{fetchError}</p>}
      {!loading && (
        <div className="anime-grid movie-grid">
          {movies.map((movie) => (
            <a
              key={movie.id}
              className="card movie-card"
              href={getTmdbMovieUrl(movie.id)}
              target="_blank"
              rel="noreferrer"
            >
              <img className="card-image" src={getTmdbImage(movie.poster_path, "w500")} alt={movie.title} />
              <div className="info">
                <h3 className="card-title">{movie.title}</h3>
                <p className="movie-meta">
                  {(movie.release_date || "").slice(0, 4) || "N/A"} • {movie.vote_average?.toFixed(1) || "N/A"}
                </p>
              </div>
              <span className="tmdb-link">
                View on TMDB <MdOpenInNew />
              </span>
            </a>
          ))}
        </div>
      )}

      <div className="page-nav">
        {page > 1 && <button onClick={handleLess}>Go Back</button>}
        <span className="page-indicator">Page {page}</span>
        <button onClick={handleMore}>Next Page</button>
      </div>
    </section>
  );
}
