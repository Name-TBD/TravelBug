//User profile page (for viewing profile but not necessarily for creating or editing the profile)

import React, { useEffect, useState } from "react";
import axios from "../../utils/client.js";      //replace axios 
import { useParams } from "react-router";   //need to import reactrouterdom? 

export default function Profile() {
    const [user, setUser] = useState({});
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?username=${username}`);
                setUser(res.data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUser();
    }, [username]);

    return (
        <div>
            <h1>{user.username || "Username not available"}</h1>
            <p>{user.desc || "No description provided."}</p>
            {user.profilePicture && (
                <img 
                    src={user.profilePicture} 
                    alt={`${user.username}'s profile`} 
                    style={{ width: "150px", borderRadius: "50%" }} 
                />
            )}
        </div>
    );
}
