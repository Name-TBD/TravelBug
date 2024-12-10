//CreatePost (Share) creates a new post with title, file/img, descript etc for the user and uploads to db via routes. (To be rendered in Feed)

import { useEffect, useRef, useState } from 'react';
import styles from "../styles/share.module.css";
import profilePic from "../assets/blank-profile-picture.png";  //downloaded on desktop how to upload here?

export default function CreatePost() {          
    const [user, setUser] = useState(null); 
    const desc = useRef();
    const [file, setFile] = useState(null);

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

    
    const submitHandler = async (e) => {
        e.preventDefault();

        if (!user) {
            console.error("User data is not available");
            return;
        }

        const newPost = {           //Create a new post object with userID & descrip. Below are default placeholder titles.
            userId: user.userId,
            description: desc.current.value,
            title: "Default Title", 
            startDate: new Date().toISOString(), 
            endDate: new Date().toISOString(),   
            rating: 5, 
        };


        if (file) {
            const data = new FormData();        //Create a formdata object to send the file to the server and name the file
            const fileName = Date.now() + file.name; 
            data.append("file", file);
            data.append("name", fileName);

            try {
                const uploadResponse = await fetch('/upload', {     //Create upload.js and made route in index.js in backend to handle file uploads
                    method: 'POST',
                    body: data,
                });

                if (!uploadResponse.ok) {
                    throw new Error("File upload failed");
                }

              
                newPost.imageUrl = fileName; //   // Update the newPost object with the uploaded file's name. Backend will use this to retrieve the file.. // Exit if the upload fails
            } catch (err) {
                console.error("Upload error: ", err);
                return; 
            }
        }


        try {
            const token = localStorage.getItem("authToken"); // Fetch token from storage and include below
            const response = await fetch('/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, 
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error("Post creation failed");
            }
            window.location.reload();
        } catch (err) {
            console.error("Post creation error:", err);
        }
    };


    return (              //Top-level cOntainer and wrapper & user profile pic. 
        <div className={styles.share}>
            <div className={styles.shareWrapper}>
                {user && (           
                    <div className={styles.shareTop}>
                        <img
                            src={user.profilePicture || "../assets/blank-profile-picture.png"}      //Create this asset! Its a Fallback for profile pic. The user.profilepicture is used if available, otherwise a default pic is shown. 
                            alt=""
                            className={styles.shareProfileImg}
                        />
                        <input
                            placeholder={`What's happening, ${user.username}?`}
                            className={styles.shareInput}
                            ref={desc}
                        />
                    </div>
                )}
                {file && (
                    <div className={styles.shareImgContainer}>
                        <img
                            className={styles.shareImg}         
                            src={URL.createObjectURL(file)}     
                            alt=""
                        />
                        <button         //File previews if uploaded above. Buttons to Cancel or to Share. Share button submits the form and triggers the submitHandler
                            className={styles.shareCancelImg}
                            onClick={() => setFile(null)}
                        >Cancel</button>       
                    </div>
                )}
                <form className={styles.shareBottom} onSubmit={submitHandler}>
                    <label htmlFor="file" className={styles.shareOption}>
                        <span className={styles.shareOptionText}>Add Photo/Video</span>
                        <input
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                        />
                    </label> 
                    <button className={styles.shareButton} type="submit" >      
                        Share</button>         
                </form>
            </div>
        </div>
    );
}
