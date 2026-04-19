//Components...
import { useEffect, useState } from "react"
import Post from "./Posts"
import CreatePosts from "../form"
import MobileNav from "../../Mobile-nav"

//Firebase...
import {getDocs, collection} from "firebase/firestore"
import {database, auth} from "../../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

//Styles...
import "../../../styles/Community.scss"


export default function Community () {

    const [user] = useAuthState(auth)
    const [userPosts, setUserPosts] = useState(null)

    const postReference = collection(database, "userPosts")
    const getPosts = async () => {
        const data = await getDocs(postReference)
        setUserPosts(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    }

    useEffect(() => { 
        getPosts()
    }, [])

    return (
        <section className="community-page">
            <MobileNav/>
            <h2>Community</h2>
            {user && <CreatePosts/>}
            {!user && <p className="community-auth-note">Sign in to create posts and like comments.</p>}
            <section className="user-posts-container">
                {
                    userPosts?.map((post, i) => (
                        <Post
                            key={i}
                            post={post}
                        />
                    ))
                }
            </section>
        </section>
    )
}
