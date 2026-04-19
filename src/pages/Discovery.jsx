//Components...
import MobileNav from "./Mobile-nav";

//React router...
import { Outlet, NavLink } from "react-router-dom";

//Styles...
import "../styles/Discovery.scss";

export default function Discovery() {
  const handleAnimeClick = () => {
    localStorage.setItem("currentAnimePage", "1");
  };

  return (
    <section className="discovery-page">
      <MobileNav />
      <nav className="discovery-nav">
        <NavLink to="movies">Movies</NavLink>
        <NavLink onClick={handleAnimeClick} to="anime">
          Anime
        </NavLink>
      </nav>
      <Outlet />
    </section>
  );
}
