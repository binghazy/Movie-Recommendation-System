//Components...
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import CardTemplate from "./cardTemplate"

//Styles... 
import "../styles/SideMenu.scss";

//Images/icons...
import { IoNotificationsOutline } from "react-icons/io5";
import DefaultAvatar from "../images/default-avatar.jpg";
import { useDispatch } from "react-redux";
import { searchType } from "../store";

export default function AddMenu () {
    const [user] = useAuthState(auth);
    const [topAnime, setTopAnime] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTopAnime();
    }, []);

    async function getTopAnime() {
        try {
            setLoading(true);
            const apiFetch = await fetch(`https://api.jikan.moe/v4/top/anime?limit=4&page=1&filter=airing`);
            const data = await apiFetch.json();
            setTopAnime(data.data || []);
        } catch (error) {
            setTopAnime([]);
        } finally {
            setLoading(false);
        }
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            return;
        }

        dispatch(searchType({ type: searchQuery.trim() }));
        navigate("/search");
    };


    return (
        <section className="search-add-menu">
            <nav>
                <IoNotificationsOutline/>
                {!user && <img src={DefaultAvatar} alt="default profile picture"/>}
                {user && <img src={user.photoURL || DefaultAvatar} alt="user profile picture"/>}
            </nav>
            <form className="input-side-form" onSubmit={handleSubmit}>
                <input onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search shows or manga..."/>
            </form>
            <section className="trending">
                <h2>Top Trending</h2>
                {loading && <h1>Loading...</h1>}
                {!loading && topAnime?.map(item => 
                        <CardTemplate
                            key={item.mal_id}
                            customClass="sideMenu-cards"
                            sidebar= "true"
                            id={item.mal_id}
                            title={item.title}
                            image={item.images.jpg.image_url}
                            firstTag = {item.genres[0]?.name}
                            secondTag = {item.genres[1]?.name}
                            thirdTag = {item.genres[2]?.name}
                        />
                    )
                }   
                <Link to="/discovery/anime" className="more-btn">See More</Link>
            </section>
        </section>
    )
}
