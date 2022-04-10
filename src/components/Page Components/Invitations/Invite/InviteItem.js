import React, { useState, useEffect } from "react";
import "./InviteItem.css";
import { Close } from "@material-ui/icons";
import { collection, onSnapshot, query, where, doc, getDocs, getDoc,setDoc, arrayUnion,updateDoc, deleteDoc, documentId } from "firebase/firestore";
import { UserTag } from "../../../UI Components/ListPost/ListPost";
import { db } from "../../../firebase";
import { useAuth } from "../../../../context/UserAuthContext";
import { async, map } from "@firebase/util";
import Confirm from "../../../UI Components/Modals/Confirm";
import Accept from "../../../UI Components/Modals/Accept";
import {ListItem} from "../../../UI Components/ListPost/ListPost";



const InviteItem = (props) => {

    const [invitaionList, setInvitationList] = useState({});
    const { user, users } = useAuth(); 
    const [tasks, setTasks] = useState([]);
    const [view, setView] = useState(false);
    const [accept, setAccept] = useState(false);
    const [deny, setDeny] = useState(false);

    const getTasks = async () => {
        const q = await getDocs(collection(db,"List",props.listID,"Tasks"));
        const tempTasks = [];
        q.forEach((doc) => {
            tempTasks.push({...doc.data(), id:doc.id});
        })
        setTasks(tempTasks);
    }
    
    useEffect(() => {
        getTasks();
        const docRef = doc(db, "List", props.listID);
        const unsubscribe = onSnapshot(docRef, (doc) => {
            setInvitationList({...doc.data(), id:doc.id});
        });
        return unsubscribe;
    }, []);
    
   

    const handleAccept = async () =>{
        await setDoc(doc(db, 'List', props.listID), {
            users: [...invitaionList?.users, user.uid],
        },{merge:true}).then(() => {
            deleteDoc(doc(db, 'Invitation', props.id));
        })
        setAccept(false);
    }

    
    const handleDeny = async () => {
        await deleteDoc(doc(db, 'Invitation', props.id));
        setDeny(false);
    }
    
    return(
        <>
        {deny && 
        <Confirm confirmHandler={handleDeny} cancelHandler={() => setDeny(false)} title="Are you sure you want to reject the invivation">
                You are about to reject '{invitaionList?.title}', it will no longer show up in your 'Invitation' Section.
        </Confirm>}
        {accept && 
        <Confirm pos={true} confirmHandler={handleAccept} cancelHandler={() => setAccept(false)} title="Accept Invitation">
                You are about to accept the invitation for '{invitaionList?.title}' from {users[invitaionList?.userID].username}.
        </Confirm>}

        <div className="invite-div">
            <div className="Inviter-div">
                <UserTag bg={users[props.fromUser]?.userColor}>{users[props.fromUser]?.username}</UserTag>

                <div className="list-info-section">
                    <h3 style={{color:"black", fontFamily:"Roboto", margin:"0", marginRight:"1%"}} className="list-title">{invitaionList?.title}</h3>
                    <p onClick={() => setView(!view)}><u>View</u></p>
                </div>
                {view && <div className="listitem-container">
                        {tasks?.map((task) => {
                            return (<ListItem bg="white">{task?.taskContent}</ListItem>);
                        })}
                    </div>}
            </div>
            <div className="accept-reject-section">
                <p onClick={() => {setAccept(true)}} className="accept-button">Accept</p>
                <p onClick={() => {setDeny(true)}} className='close-button'>X</p>
            </div>
        </div>
        </>
    );
}
export default InviteItem;