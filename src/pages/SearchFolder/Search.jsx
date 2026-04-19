//Components...
import { useState, useEffect } from "react";
import SearchCard from "./SearchCard";
import MobileNav from "../Mobile-nav";

//React redux toolkit...
import { useSelector } from "react-redux";

//Styles...
import "../../styles/Search.scss";

export default function Search() {
  //Gets the search input from user using react redux...
  const searchString = useSelector((state) => state.search.value.type);

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getSearchResults = async () => {
    if (!searchString?.trim()) {
      setSearchResults([]);
      setErrorMessage("");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const res = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchString.trim())}&limit=20`,
      );

      if (!res.ok) {
        throw new Error("Search request failed. Please try again.");
      }

      const data = await res.json();
      setSearchResults(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      setSearchResults([]);
      setErrorMessage(error?.message || "Could not load search results.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchResults();
  }, [searchString]);

  return (
    <section className="search-page">
      <MobileNav />
      <h1>{searchString ? `Results for "${searchString}"` : "Search Results"}</h1>
      {loading && <p className="empty-state">Loading results...</p>}
      {!loading && errorMessage && <p className="empty-state">{errorMessage}</p>}
      {!loading && !errorMessage && searchResults.length < 1 && (
        <p className="empty-state">No results yet. Try a different query.</p>
      )}
      {searchResults.map((item, i) => (
        <SearchCard
          key={i}
          mal_id={item.mal_id}
          type="anime"
          image={item.images?.jpg?.image_url}
          title={item.title}
          synopsis={item.synopsis}
          status={item.status}
          score={item.score}
        />
      ))}
    </section>
  );
}
