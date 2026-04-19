//Components...
import { useState, useEffect } from "react";
import CardTemplate from "../components/cardTemplate";

//Styles...
import "../styles/Manga.scss";

export default function Manga() {
  const [topManhwa, setTopManhwa] = useState([]);
  const [filter, setFilter] = useState("bypopularity");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [page, setPage] = useState(Number(localStorage.getItem("currentMangaPage")) || 1);

  useEffect(() => {
    localStorage.setItem("currentMangaPage", String(page));
  }, [page]);

  useEffect(() => {
    getTopManhwa();
  }, [page, filter]);

  async function getTopManhwa() {
    try {
      setLoading(true);
      setErrorMessage("");

      const apiFetch = await fetch(
        `https://api.jikan.moe/v4/top/manga?type=manga&filter=${filter}&limit=15&page=${page}`
      );

      if (!apiFetch.ok) {
        throw new Error("Could not load manga page. Please try again.");
      }

      const data = await apiFetch.json();
      setTopManhwa(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      setTopManhwa([]);
      setErrorMessage(error?.message || "Could not load manga page.");
    } finally {
      setLoading(false);
    }
  }

  const handleMore = (e) => {
    e.currentTarget.parentElement.classList.add("more");
    setPage((prev) => prev + 1);
  };
  const handleLess = (e) => {
    e.currentTarget.parentElement.classList.remove("more");
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section className="manga-page">
      <header>
        <h2>Top Manga</h2>
        <select
          onChange={(e) => {
            setPage("1");
            setFilter(e.target.value);
          }}
        >
          <option value="bypopularity">Popularity</option>
          <option value="publishing">Publishing</option>
          <option value="upcoming">Upcoming</option>
          <option value="favorite">Favorite</option>
        </select>
      </header>
      {/* <h2>Top Anime </h2> */}
      {loading && <p className="section-status">Loading manga...</p>}
      {!loading && errorMessage && <p className="section-status">{errorMessage}</p>}
      <div className="manhwa-grid">
        {topManhwa.map((item) => (
          <CardTemplate
            key={item.mal_id}
            customClass="card"
            id={item.mal_id}
            title={item.title}
            image={item.images.jpg.image_url}
          />
        ))}
      </div>
      <div className="page-nav">
        {page > 1 && <button onClick={handleLess}>Go Back</button>}
        <span className="page-indicator">Page {page}</span>
        <button onClick={handleMore}>Next Page</button>
      </div>
    </section>
  );
}
