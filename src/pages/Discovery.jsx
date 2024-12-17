//Components...
import MobileNav from "./Mobile-nav";

//React router...
import { Outlet, Link } from "react-router-dom";

//React redux...
import { useDispatch } from "react-redux";
//import {nameInput} from "../store"

//Styles...
import "../styles/Discovery.scss";

export default function Discovery() {
  //const dispatch = useDispatch()

  const handleAnimeClick = (e) => {
    localStorage.setItem("currentAnimePage", "1");
    //dispatch(nameInput({type: e.currentTarget.getAttribute("data-name")}))
  };
  const handleMangaClick = (e) => {
    localStorage.setItem("currentAnimePage", "1");
    //dispatch(nameInput({type: e.currentTarget.getAttribute("data-name")}))
  };

  return (
    <section className="discovery-page">
      <MobileNav />
      <nav className="discovery-nav">
        <Link onClick={handleAnimeClick} to="anime">
          Tezhom
        </Link>
        <Link onClick={handleMangaClick} to="manga">
          Tezna
        </Link>
        <Link to="manhwa">Tezo</Link>
        <Link to="manhua">Tezy</Link>
      </nav>
      <Outlet />
    </section>
  );
}
