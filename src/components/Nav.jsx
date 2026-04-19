//Components...
import { Link, useLocation } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import NetfillxLogo from "../assets/netfillx.png";

//Styles...
import "../styles/Nav.scss";

//React Icons...
import {
  AiFillHome,
  AiOutlineFire,
  AiOutlinePlayCircle,
  AiOutlineSearch,
  AiOutlineStar,
} from "react-icons/ai";
import { BsFilm, BsJournalBookmarkFill } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";

import { useDispatch } from "react-redux";
import { nameInput } from "../store";

export default function Nav() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [user] = useAuthState(auth);
  const currentPath = location.pathname.toLowerCase();

  const userSignOut = async () => {
    await signOut(auth);
  };

  const handleAnimeClick = () => {
    //localStorage.setItem("currentAnimePage", "1")
    dispatch(nameInput({ type: "anime" }));
  };

  const isRouteActive = (route) => {
    if (route === "home") {
      return currentPath === "/";
    }

    if (route === "movies") {
      return currentPath.startsWith("/discovery/movies");
    }

    if (route === "anime") {
      return currentPath.startsWith("/discovery/anime");
    }

    if (route === "search") {
      return currentPath.startsWith("/search");
    }

    if (route === "community") {
      return currentPath.startsWith("/community");
    }

    if (route === "bookmarks") {
      return currentPath.startsWith("/bookmarks");
    }

    return false;
  };

  return (
    <section className="home-nav">
      <div className="brand">
        <img className="brand-logo" src={NetfillxLogo} alt="NETFILLX logo" />
        <h1>NetFillX</h1>
      </div>
      <nav>
        <h2>MENU</h2>
        <ul>
          <Link
            to="/"
            className={`menu-item ${isRouteActive("home") ? "active" : ""}`}
          >
            <AiFillHome
              className={`icon ${isRouteActive("home") ? "active" : ""}`}
            />
            Home
          </Link>
          <Link
            to="/discovery/movies"
            className={`menu-item ${isRouteActive("movies") ? "active" : ""}`}
          >
            <BsFilm className={`icon ${isRouteActive("movies") ? "active" : ""}`} />
            Movies
          </Link>
          <Link
            to="/discovery/anime"
            onClick={() => {
              handleAnimeClick();
            }}
            className={`menu-item ${isRouteActive("anime") ? "active" : ""}`}
          >
            <AiOutlinePlayCircle
              className={`icon ${isRouteActive("anime") ? "active" : ""}`}
            />
            Anime
          </Link>
          <Link
            to="/search"
            className={`menu-item ${isRouteActive("search") ? "active" : ""}`}
          >
            <AiOutlineSearch
              className={`icon ${isRouteActive("search") ? "active" : ""}`}
            />
            Search
          </Link>
          {user && (
            <Link
              to="/community"
              className={`menu-item ${isRouteActive("community") ? "active" : ""}`}
            >
              <FaDiscord
                className={`icon ${isRouteActive("community") ? "active" : ""}`}
              />
              Community
            </Link>
          )}
        </ul>
      </nav>
      <nav className="library-nav">
        <h2>LIBRARY</h2>
        <ul>
          <Link
            to="/bookmarks"
            className={`menu-item ${isRouteActive("bookmarks") ? "active" : ""}`}
          >
            <BsJournalBookmarkFill
              className={`icon ${isRouteActive("bookmarks") ? "active" : ""}`}
            />
            Bookmarks
          </Link>
          <Link
            to="/discovery/movies"
            className={`menu-item ${isRouteActive("movies") ? "active" : ""}`}
          >
            <AiOutlineFire className={`icon ${isRouteActive("movies") ? "active" : ""}`} />
            Trending Movies
          </Link>
          <Link
            to="/discovery/anime"
            onClick={handleAnimeClick}
            className={`menu-item ${isRouteActive("anime") ? "active" : ""}`}
          >
            <AiOutlineStar className={`icon ${isRouteActive("anime") ? "active" : ""}`} />
            Top Anime
          </Link>
          <Link
            to="/search"
            className={`menu-item ${isRouteActive("search") ? "active" : ""}`}
          >
            <AiOutlineSearch
              className={`icon ${isRouteActive("search") ? "active" : ""}`}
            />
            Search Vault
          </Link>
        </ul>
      </nav>
      <nav className="user-account">
        {!user && (
          <div>
            <Link className="login-button" to="/login">
              <IoIosLogIn />
              Login
            </Link>
          </div>
        )}
        {user && (
          <button onClick={userSignOut} className="userStatusBtn">
            <IoLogOutOutline />
            Log out
          </button>
        )}
      </nav>
    </section>
  );
}
