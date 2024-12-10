//DIsplays a user's profile page in the app. It fetches the users data, profile pic, cover img, username, descrip forman api and displays it. //The Feed is imported and rendered for the user alone. 



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";   
import Feed from "../Feed.jsx";         //Renders the user's posts only 
import styles from "../../styles/profile.module.css";


export default function MyProfile() {
    const [user, setUser] = useState({});
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem("userId"); // Fetch user data and store in user state. Assume userId is stored locally
                const response = await fetch(`/users/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchUser();
    }, []);



    return (                //Profile, cover, user images and info rendered. Feed is below. Removed Topbar, Sidebar, and Bottombar navigation
        <>
        <div className={styles.profile}>
            <div className={styles.profileRight}>
                <div className={styles.profileRightTop}>
                    <div className={styles.profileCover}>
                        <img
                            className={styles.profileCoverImage}
                            src={
                                user.coverPicture || "/defaultCover.jpg"
                            }
                            alt=""
                        />
                        <img
                            className={styles.profileUserImage}
                            src={
                                user.profilePicture || "/defaultProfile.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className={styles.profileInfo}>
                        <h4 className={styles.profileInfoName}>{user.username}</h4>
                        <h4 className={styles.profileInfoDesc}>{user.desc}</h4>

                    </div>
                </div>
                <div className={styles.profileRightBottom}>
                    {/* {username} */}
                    <Feed username={username} />     
                </div>
            </div>
        </div>
    </>
)
}



