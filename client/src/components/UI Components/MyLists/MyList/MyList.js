import React from 'react';
import './MyList.css';
import MyListItem from './MyListItem/MyListItem';
import MyAddListItem from './MyListItem/MyAddListItem';
import { useState, useEffect } from 'react';
import {  onSnapshot, collection, doc, deleteDoc, query, where, getDocs, addDoc } from 'firebase/firestore';
import {db} from "../../../firebase"
import Confirm from "../../Modals/Confirm";
import MemberModal from '../../Modals/MemberModal';
import { MoreHoriz, MoreVert } from '@material-ui/icons';
import { UserTag } from "../../ListPost/ListPost";
import { useAuth } from "../../../../context/UserAuthContext";

const MyList = (props) => {

    const [tasks, setTasks] = useState();
    const [listOpen, setListOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [publish, setPublish] = useState(false);
    const [member, setMember] = useState(false);
    const [invitation, setInvitation] = useState(false);
    const [listInvitations, setListInvitations] = useState(false);
    const [newItemContent, setNewItemContent] = useState();
    // const [delItemContent, setDelItemContent] = useState();
    const { user, users } = useAuth(); 

    const getInvitations = async () => {
        const q = query(collection(db, "Invitation"), where("list", "==", props.listID));
        console.log('hello');
        const querySnapshot = await getDocs(q);
        const tempInvites = [];
        querySnapshot.forEach((doc) => {
            console.log('hello');
            tempInvites.push({...doc.data(), id:doc.id})
        });
        setListInvitations(tempInvites);
    }

    useEffect(() => {
        getInvitations();
        console.log("useEffect from MyList.");
        const taskCollectionRef = collection(db, "List", props.listID, "Tasks");
        const unsubscribe = onSnapshot(taskCollectionRef, (querySnapshot) => {
            console.log('hello');
            const tasksTemp = [];
            querySnapshot.forEach((doc) => {
                tasksTemp.push({...doc.data(), id: doc.id});
            });
            setTasks(tasksTemp);
        });

        return unsubscribe;
    }, []);

    const deleteListHandler = async () => {
        await deleteDoc(doc(db, "List", props.listID)).then(() => {
            const q = query(collection(db, "Invitation"), where("list", "==", props.listID));

            const querySnapshot = getDocs(q);
            querySnapshot.forEach((doc) => {
                deleteDoc(doc(db, "Invitation", doc.id));
            });
        });
        setConfirm(false);
    }

    const publishListHandler = async () => {
        console.log('hello publishListHandler');
        
        const postCollectionRef = collection(db, "Post");
        addDoc(postCollectionRef, {
            likeCount: 0,
            list: props.listID,
            userID: user.uid
        })
        .then(() => {
            setPublish(false);
        })
    }

    const addItemToList = async () => {
        if (newItemContent !== "") {
            const taskColRef = collection(db, "List", props.listID, "Tasks");
            console.log('hello');
            await addDoc(taskColRef, {
                taskContent: newItemContent,
                taskStatus: false,
            })
            .then(() => {
                setNewItemContent("");
            })
        }
    }

    const delItemFromList = async () => {
        // const taskColRef = collection(db, "List", props.id.listID, "Tasks");
        // await deleteDoc(
        //     doc(db, taskColRef, /*todo*/ )
        // )
        // .then(() => {
        //     // reload the set of lists
        // })
    }

    return (
        <>
        {confirm && 
        <Confirm confirmHandler={deleteListHandler} cancelHandler={() => setConfirm(false)} title="Are you sure you want to delete this list?">
            You are about to delete '{props.title}', it will no longer show up in your 'My Lists' Section.
        </Confirm>}
        {publish && 
        <Confirm pos={true} confirmHandler={publishListHandler} cancelHandler={() => setPublish(false)} title="Publish List">
            You are about to publish '{props.title}', this means all users of 'listvine' will be to view and clone this list. 
        </Confirm>}
        {member && 
        <MemberModal closeHandler={() => setMember(false)} title="List Members">
            {props.listUsers.map((u) => {
                return (
                    <>
                        <UserTag key={u} bg={users[u].userColor}>{users[u].username}</UserTag>
                         <br />
                    </>
                )
            })}
        </MemberModal>}
        {invitation && 
        <MemberModal closeHandler={() => setInvitation(false)} title="Invitations sent">
            <p>These are all the users you have sent invitations to:</p>
            <br />
            {listInvitations?.map((u) => {
                return (
                    <>
                        <UserTag bg={users[u.toUser].userColor}>{users[u.toUser].username}</UserTag>
                            <br />
                    </>
                )
            })}
        </MemberModal>}
        <div className="mylist" >  
            <div className='mylist-title-section' onClick={() => setListOpen(!listOpen)}>
                <div className='mylist-title' >
                    {props.title}
                </div>
                {listOpen ?
                (<MoreVert fontSize="large" style={{marginRight:'0.4em'}}/>) : 
                (<MoreHoriz fontSize="large" style={{marginRight:'0.4em'}}/>)}
            </div>
            {listOpen && (
            <>
                <div className='mylist-actions'>
                    <div className='mylist-btn blue' onClick={() => {setMember(true)}}>Members</div>
                    <div className='mylist-btn blue' onClick={() => {setInvitation(true)}}>Invitations</div>
                    <div className='mylist-btn blue' onClick={() => {setPublish(true)}}>Publish</div>
                    <div className='mylist-btn red' onClick={() => {setConfirm(true)}}>Delete</div>
                </div>

                <div>
                    {tasks?.map((task) => {
                        return (< MyListItem key={task?.id} value={task?.id} text={task?.taskContent} onClick={delItemFromList}/>)
                    })}
                    < MyAddListItem onClick={addItemToList} value={newItemContent} onChange={(e) => setNewItemContent(e.target.value)} />
                </div>
            </>)}
        </div>
        </>
    );
}

export default MyList;