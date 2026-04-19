//Components...
import { useState, useEffect } from "react"
import {animateScroll as scroll} from "react-scroll"
import CardTemplate from "../components/cardTemplate"

//styles...
import "../styles/Anime.scss"

export default function ManhuaPage () {
    const [topManhua, setTopManhua] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    //The localStorage maintains the page you were on...
    const [page, setPage] = useState(Number(localStorage.getItem("currentManhuaPage")) || 1)

    useEffect(() => {
        localStorage.setItem("currentManhuaPage", String(page))
    }, [page])

    useEffect(() => {
         getTopManhua()
    }, [page])
    

    async function getTopManhua() {
        try {
            setLoading(true)
            setErrorMessage("")
            const apiFetch = await fetch(`https://api.jikan.moe/v4/top/manga?type=manhua&limit=15&page=${page}`)

            if (!apiFetch.ok) {
                throw new Error("Could not load manhua page. Please try again.")
            }

            const data = await apiFetch.json();
            setTopManhua(Array.isArray(data?.data) ? data.data : [])
        } catch (error) {
            setTopManhua([])
            setErrorMessage(error?.message || "Could not load manhua page.")
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
                <h2>Top Manhua</h2>
            </nav>
            {loading && <p className="section-status">Loading manhua...</p>}
            {!loading && errorMessage && <p className="section-status">{errorMessage}</p>}
            <div className="anime-grid">
                {
                    topManhua.map((item) => (
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
