import React from "react";
import './Newsfeed.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import ListPost from "../../UI Components/ListPost/ListPost";
import TransparentTextInput from "../../UI Components/TextInputs/TransparentTextInput";
import Button from "../../UI Components/Button";
import { CreateOutlined } from "@material-ui/icons";
import { collection, onSnapshot, orderBy, where, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import {CreateNewList} from '../NewList/NewList';

function Newsfeed(){

    const [posts, setPosts] = useState();
    const listPost = query(collection(db, 'Post'), orderBy('postCreated','desc'));

    useEffect(() => {
        const unsubscribe = onSnapshot(listPost, (querySnapshot) => {
            const tempPosts = [];
            querySnapshot.forEach((doc) => {
                tempPosts.push({...doc.data(), id: doc.id});
            });
            setPosts(tempPosts);
        });

        return unsubscribe;
    }, []);

    return(
        <div className="main-newsfeed-div">
            <Navbar />
            <div className="newsfeed-div">
                 <div className="quicklist-div" style={{alignItems:"center", overflowY:"scroll"}}>
                    <div style={{display:'flex', alignItems:"center"}}>
                        <CreateOutlined fontSize="large"/>
                        <h2 style={{fontFamily:"Roboto"}}>Quick List</h2>
                    </div>
                    <CreateNewList quicklist={true} fontSize="150%"/>
                </div>
                <div className="livelist-div">
                    {posts?.map((post) => {
                        return (<ListPost creation={post?.postCreated.toDate().toString()} key={post?.id} userDetails={post?.userID} likeList={post?.userLikes} id={post?.id} listID={post?.list}/>)
                    })}
                </div>
                <ActionBar style={{width:'15%'}} />
            </div>
        </div>
    );
}

export default Newsfeed;