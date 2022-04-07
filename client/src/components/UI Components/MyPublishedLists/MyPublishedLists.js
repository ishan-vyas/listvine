import React, {useEffect, useState } from 'react';
import './MyPublishedLists.css';
import MyPublishedList from './MyPublishedList/MyPublishedList';
import { db } from '../../firebase';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { useAuth } from '../../../context/UserAuthContext';

function MyPublishedLists() {

    const [myPosts, setMyPosts] = useState();
    const postCollectionRef = collection(db, 'Post');
    const { user } = useAuth();

    useEffect(() => {
        const q = query(postCollectionRef, where("userID", "==", user.uid));
        const res = onSnapshot(q, (querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ ...doc.data(), id: doc.id });
            })
            setMyPosts(posts);
            console.log(posts);
        })
        return res;
    }, []);

    return (
        <div className='mypublishedlists-content'>
            <h1 className='mypublishedlists-title'>My Published Lists</h1>

            {
                myPosts ? (myPosts?.map((post) => {
                    return (< MyPublishedList key={post?.id} postID={post?.id}  listID={post?.list} />)
                }))
                : (<p>You have no published lists</p>)
            }

            {/* < MyPublishedList title='List Title 1'/> */}
        </div>
    );
}

export default MyPublishedLists;