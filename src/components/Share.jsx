/*The Share component allows users to type a description for their post. Enables optional photo/video upload with file preview and cancellation.Sends a new post to the server upon submission.Automatically refreshes the page to show the newly created post.
*/

import React, { useContext, useRef, useState } from 'react';       
import styles from "../styles/share.module.css"; //update this path
import { newUser } from '../routes/auth.js';   // Access users through auth.js. useContect ensures global data access of user info (used below).

export default function Share() {   //Create share component. Handle state and context maangement.  Usecontext gives global acces to the user info
    const { user } = useContext(Auth.js);      
    const desc = useRef();
    const [file, setFile] = useState(null);

  
    const submitHandler = async (e) => {            
        e.preventDefault();       //Create SubmitHandler functionality to constructs the newPost object. 
        const newPost = { userId: user._id, desc: desc.current.value };   

    if (file) {     //Optional file upload with post
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("file", file);
        data.append("name", fileName);
        newPost.img = fileName;

        try {
            // Using fetch to upload the file. File Upload (fetch): The fetch function is a native javascript function here used to send the file data to the /upload endpoint.  The method is set to 'POST', and the body is the FormData object.  We check if the response is ok (status code 200-299) to ensure the upload succeeded.
            const uploadResponse = await fetch('/upload', {
                method: 'POST',
                body: data,
            });
            if (!uploadResponse.ok) {
                throw new Error("File upload failed");
            }
        } catch (err) {
            console.error("Upload error: ", err);
        }
    }

    try {             // Using fetch to create a new post
        const postResponse = await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        });
        if (!postResponse.ok) {
            throw new Error("Post creation failed");
        }
        window.location.reload();
    } catch (err) {
        console.error("Post error: ", err);
    }
};




    return (            //JSX Rendering Core Elements. Render post, profile picture and input field, file preview w/cancel button. File upload input and share button. 
        <div className={styles.share}>
            <div className={styles.shareWrapper}>
                <div className={styles.shareTop}>
                    <img        //Profile picture and input field
                        src={user.profilePicture || "../assets/blank-profile-picture.png"}          
                        alt=""
                        className={styles.shareProfileImg}
                    />
                    <input
                        placeholder={`What's happening, ${user.username}?`}
                        className={styles.shareInput}
                        ref={desc}    
                    />
                </div>
                {file && (          //File preview with a cancel button
                    <div className={styles.shareImgContainer}>
                        <img
                            className={styles.shareImg}
                            src={URL.createObjectURL(file)}
                            alt=""
                        />
                        <button
                            className={styles.shareCancelImg}
                            onClick={() => setFile(null)}
                        >
                            Cancel
                        </button> 
                    </div>        
                )}
                <form className={styles.shareBottom} onSubmit={submitHandler}>
                    <label htmlFor="file" className={styles.shareOption}>
                        <span className={styles.shareOptionText}>Add Photo/Video</span>     
                        <input      //File upload input and share button
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                        />
                    </label>
                    <button className={styles.shareButton} type="submit">              
                        Share      
                    </button>                  
                </form>         
            </div>     
        </div>
    );
}
