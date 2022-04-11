import React, { useState, useEffect } from "react";
import './Invitations.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import { Close } from "@material-ui/icons";
import { collection, onSnapshot, query, where, doc, getDoc, setDoc, arrayUnion,updateDoc, deleteDoc, orderBy } from "firebase/firestore";
import { UserTag } from "../../UI Components/ListPost/ListPost";
import { db } from "../../firebase";
import { useAuth } from "../../../context/UserAuthContext";
import { async, map } from "@firebase/util";
import InviteItem from "./Invite/InviteItem";

function Invitations(props){
    const [list, setList] = useState();
    const { user, users } = useAuth(); 
    const invitationRef = collection(db, 'Invitation');
    const [invitations, setInvitations] = useState([]);
    const [view, setView] = useState(false);
    const [accept, setAccept] = useState(false);
    const [deny, setDeny] = useState(false);

    const getList = async () =>{
        
        onSnapshot(collection(db, 'List'), (querysnapshot) => {
            const tempList = [];
            querysnapshot.forEach((doc) => {
                tempList.push({...doc.data(), id: doc.id});
            });
            setList(tempList);
        });
        //const docSnap = await getDoc(db, 'List', doc.data().list);
        
    };
    

    useEffect(() => {
        getList();

        const q = query(invitationRef, where('toUser', '==', user.uid), orderBy('invitationCreated'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tempInvites = [];
            querySnapshot.forEach((doc) => {
                tempInvites.push({...doc.data(), id: doc.id});
            });
            setInvitations(tempInvites);
        });

        return unsubscribe;
    }, []);

    
    return(
        <div className="main-invitations-div">
            <Navbar />
            <div className="invitations-div">
                <div className="friends-div" style={{overflowY:"scroll"}}>
                    <div className="header">
                        <h1 id="invitations-title">Invitations</h1>
                    </div>
                    <div className="invites-list">
                        {invitations?.length===0 ? <h3 style={{marginLeft:"5%", fontFamily:"Roboto"}}>You have no pending invitations.</h3> : <></>}
                        {invitations ? (invitations?.map((invite) => {
                            return <InviteItem toUser={invite?.toUser} listID={invite?.list} key={invite?.id} fromUser={invite?.fromUser} id={invite?.id}/>
                        })) : (<p>You have no invitation</p>)}
                    </div>
                </div>
                <ActionBar style={{width:'15%'}} />
            </div>
        </div>
    );
}

export default Invitations;