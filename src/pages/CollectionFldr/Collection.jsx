//Components....
import BMCard from "./BMCard"
import MobileNav from "../Mobile-nav"

//Fiebase...
import {auth, database} from "../../config/firebase"
import {getDoc, doc} from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect } from "react"

//Styles...
import "../../styles/Collection.scss"

export default function Collection () {
    const [user] = useAuthState(auth)

    const [userData, setUserData] = useState([])

    const getUserBM = async () => {
        if (user) {
            const docRef = doc(database, "userInfo", `${user.uid}`)
            const userInfo = await getDoc(docRef)
    
            if (userInfo.exists()) {
                setUserData(userInfo.data().userBookmarks.map(item => item).reverse())
            } 
        }
    }

    useEffect(() => {
        getUserBM()
    }, [user])


    return (
        <section className="collection-page">
            {!user && 
                <h1 className="collection-empty-auth">Sign in to save and view your bookmarks.</h1>
            }
            <MobileNav/>
            {user &&
                <div className="user-bookmarks">
                    <h1 className="bm-header">Bookmarks</h1>
                    {
                    userData?.map((item,i) => 
                        <BMCard
                            key={i}
                            mal_id= {item.mal_id}
                            type={item.type}
                            image = {item.image}
                            title= {item.title}
                            synopsis= {item.synopsis}
                            status= {item.status}
                            score= {item.score}
                        /> 
                    )
                    }
                    {userData.length < 1 && 
                        <h4 className="collection-empty-list">No bookmarks yet.</h4>
                    }
                </div>
            }
        </section>
    )
}
