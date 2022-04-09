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



const InviteItem = (props) => {

    const [list, setList] = useState();
    const { user, users } = useAuth(); 
    const listRef = collection(db, 'List');
    const [invitation, setInvitation] = useState();
    const [view, setView] = useState(false);
    const [accept, setAccept] = useState(false);
    const [deny, setDeny] = useState(false);
    const [title, setTitle] = useState('')

    
    
    useEffect(() => {
        console.log("useEffect from Invitation.");
        const q = query(listRef, where('id', '==', props.listID));

        const unsubscribe = onSnapshot(listRef, (querySnapshot) => {
            const tempList = [];
            querySnapshot.forEach((doc) => {
                tempList[doc.id] = {...doc.data()}
            });
            setList(tempList);
        });
        return unsubscribe;
    }, []);
    
   

    const handleAccept = async () =>{
        await updateDoc(doc(db, 'List', list.id), {
            user: arrayUnion(props.toUser),
        },{merge:true})
        setAccept(false);
    }

    
    const handleDeny = async () => {
        await deleteDoc(doc(db, 'Invitation', props.id)).then(() => {
            const q = query(collection(db, 'Invitation'), where('id', '!=', props.id));

            const querySnapshot = getDocs(q);
            querySnapshot.forEach((doc) => {
                deleteDoc(doc(db, 'Invitation', doc.id));
            });
        });
        setDeny(false);
    }


    
    console.log(props.listID);
    //console.log(list[props.listID].title);
    
    return(
        <>
        {deny && 
        <Confirm confirmHandler={handleDeny} cancelHandler={() => setDeny(false)} title="Are you sure you want to reject the invivation">
                You are about to reject '{props.listID}', it will no longer show up in your 'Invitation' Section.
        </Confirm>}
        {accept && 
        <Accept confirmHandler={handleAccept} cancelHandler={() => setAccept(false)} title="Accept the Invitation">
                You are about to  '{props.listID}'.
        </Accept>}

        <div className="invite-div">
            <div className="Inviter-div">
                <UserTag bg={users[props.fromUser]?.userColor}>{users[props.fromUser]?.username}</UserTag>

                <div className="list-info-section">
                    <p onClick={() => setView(!view)}><u>View</u></p>

                    <p className="list-title">{list[props.listID].title}</p>
                    
                </div>
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