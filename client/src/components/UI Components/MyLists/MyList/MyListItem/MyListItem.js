import React, {useEffect, useState} from 'react';
import './MyListItem.css';
import { DeleteOutline } from '@material-ui/icons';
import {db} from "../../../../firebase"
import { deleteDoc, doc , onSnapshot, setDoc} from 'firebase/firestore';


function MyListItem(props) {

    const [status, setStatus] = useState(false);

    async function changeStatus() {
        await setDoc(doc(db, 'List', props.listID, 'Tasks', props.taskID), {
            taskStatus: !status,
        }, {merge:true});
    }

    useEffect(() => {
        console.log('hello useeffect');
        const unsubscribe = onSnapshot(doc(db, 'List', props.listID, 'Tasks', props.taskID), (doc) => {
            let tempStatus = false;
            console.log(doc.data());

            tempStatus = doc.data().taskStatus;
            setStatus(tempStatus);
        });

        return unsubscribe;
    }
    , []);

    const deleteItemHandler = async () => {
        await deleteDoc(doc(db, "List", props.listID, "Tasks", props.taskID));
    }
    

    return (

        <div className='list-item'>
            <div className='clickable-icon'>
                <DeleteOutline onClick={deleteItemHandler} fontSize='large'/>
            </div>
            <div className="check-container" onClick={changeStatus} style={status ? {backgroundColor: "#D7D4D1"} : {backgroundColor: "white"}}>
                <div className="circular-check"></div>
            </div>
            <p>{props.text}</p>
            
        </div>

    );
}

export default MyListItem;