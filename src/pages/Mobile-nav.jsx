//React-router...
import { useState } from "react";
import { Link } from "react-router-dom";

//Styles...
import "../styles/MobileNav.scss";

//React icons...
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`mobile-nav ${isOpen ? "open" : ""}`} aria-label="Mobile navigation">
      <button
        className="mobile-nav-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        {isOpen ? <IoCloseOutline /> : <RxHamburgerMenu />}
      </button>
      <button
        type="button"
        className="mobile-menu-backdrop"
        aria-label="Close navigation menu"
        onClick={closeMenu}
      />
      <div className="mobile-menu-panel">
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/discovery/movies" onClick={closeMenu}>
          Movies
        </Link>
        <Link to="/discovery/anime" onClick={closeMenu}>
          Anime
        </Link>
        <Link to="/search" onClick={closeMenu}>
          Search
        </Link>
        <Link to="/community" onClick={closeMenu}>
          Community
        </Link>
        <Link to="/bookmarks" onClick={closeMenu}>
          Bookmarks
        </Link>
        <Link to="/login" onClick={closeMenu}>
          Account
        </Link>
      </div>
    </nav>
  );
}
