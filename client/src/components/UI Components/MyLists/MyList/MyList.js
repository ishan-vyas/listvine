import React from 'react';
import './MyList.css';
import MyListItem from './MyListItem/MyListItem';
import MyAddListItem from './MyListItem/MyAddListItem';
import { useState, useEffect } from 'react';
import { query, onSnapshot, getDocs, collection } from 'firebase/firestore';
import {db} from "../../../firebase"


function MyList(props) {

    const [tasks, setTasks] = useState();
    const [listOpen, setListOpen] = useState(false);

    useEffect(() => {
        const taskCollectionRef = collection(db, "List", props.listID, "Tasks");
        const unsubscribe = onSnapshot(taskCollectionRef, (querySnapshot) => {
            const tasksTemp = [];
            querySnapshot.forEach((doc) => {
                tasksTemp.push({...doc.data(), id: doc.id});
            });
            setTasks(tasksTemp);
        });

        return unsubscribe;
    }, []);

    return (
        <div className="mylist" onClick={() => setListOpen(!listOpen)}>
            <div className='mylist-title'>
                {props.title}
            </div>
            {listOpen && (
            <>
                <div className='mylist-actions'>
                    <div className='mylist-btn blue'>Members</div>
                    <div className='mylist-btn blue'>Invitations</div>
                    <div className='mylist-btn blue'>Publish</div>
                    <div className='mylist-btn red'>Delete</div>
                </div>

                <div>
                    {tasks?.map((task) => {
                        return (< MyListItem value={task?.id} text={task?.taskContent}/>)
                    })}
                    < MyAddListItem text="Add new list item..." />
                </div>
            </>)}
        </div>
    );
}

export default MyList;