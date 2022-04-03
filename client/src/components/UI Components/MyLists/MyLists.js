import React, { useEffect, useState } from 'react';
import './MyLists.css';
import MyList from './MyList/MyList';
import { db } from '../../firebase';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useAuth } from "../../../context/UserAuthContext";

function MyLists() {

    const [myLists, setMyLists] = useState();
    const listCollectionRef = collection(db, 'List');
    const { user } = useAuth();

    useEffect(() => {
        const q = query(listCollectionRef, where("userID", "==", user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const lists = [];
            querySnapshot.forEach((doc) => {
                console.log(doc);
                lists.push({...doc.data(), id: doc.id, taskRef: "k"});
            });
            setMyLists(lists);
        });

        return unsubscribe;
    }, []);

    return (
        <div className='mylists-content'>
            <h1 className='mylists-title'>My Lists</h1>
            {myLists ? (myLists?.map((list) => {
                return (< MyList listID={list?.id} key={list?.id} title={list?.title}/>)
            })) : (<p>You have no lists</p>)}
        </div>
    );
}

export default MyLists;