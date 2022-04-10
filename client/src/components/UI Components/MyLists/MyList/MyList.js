import React from 'react';
import './MyList.css';
import MyListItem from './MyListItem/MyListItem';
import MyAddListItem from './MyListItem/MyAddListItem';
import { useState, useEffect } from 'react';
import {  onSnapshot, collection, doc, deleteDoc, query, where, getDocs, addDoc} from 'firebase/firestore';
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

        const q1 = query(collection(db, "List", props.listID, "Tasks"));
        const taskSnapshot = await getDocs(q1);
        taskSnapshot.forEach((t) => {
            deleteDoc(doc(db, "List", props.listID, "Tasks", t.id));
        });
        
        deleteDoc(doc(db, "List", props.listID)).then(() => {
            deleteInvitations();
        });
        setConfirm(false);
    }

    const deleteInvitations = async () => {
        console.log("Deleting invitations now");
        const q = query(collection(db, "Invitation"), where("list", "==", props.listID));
        const querySnapshot = await getDocs(q);
        querySnapshot?.forEach((i) => {
            console.log("found one");
            deleteDoc(doc(db, "Invitation", i.id));
        });
    }

    const publishListHandler = async () => {
        
        await addDoc(collection(db, "List"), {
            userID: user.uid,
            users: props.listUsers,
            title: props.title,
            listCreated: new Date(),
            published: true
        }).then((docRef) => {
            tasks?.forEach((t) => {
            console.log('hello');
                addDoc(collection(db, "List", docRef.id, "Tasks"), {
                    taskContent: t.taskContent,
                    taskStatus: t.taskStatus
                })
            })
            addDoc(collection(db, "Post"), {
                likeCount: 0,
                postCreated: new Date(),
                list: docRef.id,
                userID: user.uid,
                userLikes: []
            })
            .then(() => {
                setPublish(false);
            })
        });
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
                        <UserTag bg={users[u] ? users[u]?.userColor : "black"}>{users[u] ? users[u]?.username : "deletedAccount"}</UserTag>
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
                        <UserTag bg={users[u.toUser] ? users[u.toUser]?.userColor : "black"}>{users[u.toUser] ? users[u.toUser]?.username : "deletedAccount"}</UserTag>
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
                <p style={{color:"grey", fontFamily:"Roboto", fontWeight:"100", margin:"0", marginLeft:"1%"}}>Created on: {props.creation}</p>
                <div className='mylist-actions'>
                    <div className='mylist-btn blue' onClick={() => {setMember(true)}}>Members</div>
                    <div className='mylist-btn blue' onClick={() => {setInvitation(true)}}>Invitations</div>
                    <div className='mylist-btn blue' onClick={() => {setPublish(true)}}>Publish</div>
                    <div className='mylist-btn red' onClick={() => {setConfirm(true)}}>Delete</div>
                </div>

                <div className='listitem-div'>
                    {tasks?.map((task) => {
                        return (< MyListItem taskID={task?.id} listID={props.listID} text={task?.taskContent} />)
                    })}
                    < MyAddListItem onKeyPress={(e) => {
                        e.key === "Enter" && addItemToList();
                    }} onClick={addItemToList} value={newItemContent} onChange={(e) => setNewItemContent(e.target.value)} />
                </div>
            </>)}
        </div>
        </>
    );
}

export default MyList;