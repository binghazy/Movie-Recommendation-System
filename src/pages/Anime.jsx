//Components...
import { useState, useEffect } from "react"
import {animateScroll as scroll} from "react-scroll"
import CardTemplate from "../components/cardTemplate"

//styles...
import "../styles/Anime.scss"

export default function AnimePage () {
    const [topAnime, setTopAnime] = useState([])
    const [filter, setFilter] = useState("airing")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    //The localStorage maintains the page you were on...
    const [page, setPage] = useState(Number(localStorage.getItem("currentAnimePage")) || 1)

    useEffect(() => {
         localStorage.setItem("currentAnimePage", String(page))
    }, [page])

    useEffect(() => {
         getTopAnime()
    }, [page, filter])

    async function getTopAnime() {
        try {
            setLoading(true)
            setErrorMessage("")
            const apiFetch = await fetch(`https://api.jikan.moe/v4/top/anime?limit=15&page=${page}&filter=${filter}`)

            if (!apiFetch.ok) {
                throw new Error("Could not load anime page. Please try again.")
            }

            const data = await apiFetch.json();
            setTopAnime(Array.isArray(data?.data) ? data.data : [])
        } catch (error) {
            setTopAnime([])
            setErrorMessage(error?.message || "Could not load anime page.")
        } finally {
            setLoading(false)
        }
    }

    const handleMore = (e) => {
        scroll.scrollToTop();
        e.currentTarget.parentElement.classList.add("more");
        setPage(prev => prev + 1)
    }
    const handleLess = (e) => {
        scroll.scrollToTop();
        e.currentTarget.parentElement.classList.remove("more")
        setPage(prev => Math.max(prev - 1, 1))
    }

    return (
        <section className="anime-page">
            <nav className="anime-nav-filter">
                <h2>Top Anime</h2>
                <select onChange={(e) => {
                    setPage("1")
                    setFilter(e.target.value)
                }}>
                    <option value="bypopularity">Popularity</option>
                    <option value="airing">Airing</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="favorite">Favorite</option>
                </select>
            </nav>
            {/* <h2>Top Anime </h2> */}
            {loading && <p className="section-status">Loading anime...</p>}
            {!loading && errorMessage && <p className="section-status">{errorMessage}</p>}
            <div className="anime-grid">
                {
                    topAnime?.map((item) => (
                        <CardTemplate
                            key={item.mal_id}
                            customClass="card"
                            id={item.mal_id}
                            title={item.title}
                            image={item.images.jpg.image_url}
                        />
                    ))
                }   
            </div>
            <div className="page-nav">
                {page > 1 && <button onClick={handleLess}>Go Back</button>}
                <span className="page-indicator">Page {page}</span>
                <button onClick={handleMore}>Next Page</button>
            </div>
        </section>
    )
}
