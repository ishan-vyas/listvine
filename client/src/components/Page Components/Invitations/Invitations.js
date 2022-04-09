import React, { useState, useEffect } from "react";
import './Invitations.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import { Close } from "@material-ui/icons";
import { collection, onSnapshot, query, where, doc, getDoc, setDoc, arrayUnion,updateDoc, deleteDoc } from "firebase/firestore";
import { UserTag } from "../../UI Components/ListPost/ListPost";
import { db } from "../../firebase";
import { useAuth } from "../../../context/UserAuthContext";
import { async, map } from "@firebase/util";
import InviteItem from "./Invite/InviteItem";




function Invitations(props){
    const [list, setList] = useState();
    const { user, users } = useAuth(); 
    const invitationRef = collection(db, 'Invitation');
    const [invitation, setInvitation] = useState();
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
        console.log("useEffect from Invitation.");
        const q = query(invitationRef, where('toUser', '==', user.uid));


        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tempInvites = [];
            const tempList = [];
            querySnapshot.forEach((doc) => {
                tempInvites.push({...doc.data(), id: doc.id});
            });
            setInvitation(tempInvites);
        });

        return unsubscribe;
    }, []);



    const viewList = (e) => {}


    const acceptInvite = (e) => {}


    const rejectInvite = (e) => {}

    
    return(
        <div className="main-invitations-div">
            <Navbar />
            <div className="invitations-div">
                <div className="friends-div">
                    <div className="header">
                        <h1 id="invitations-title">Invitations</h1>
                    </div>
                    <div className="invites-list">
                        {invitation ? (invitation?.map((invite) => {
                            return <InviteItem toUser={invite?.toUser} listID={invite?.list} key={invite?.key} fromUser={invite?.fromUser} id={invite?.id}/>
                        })) : (<p>You have no invitation</p>)}
                    </div>
                </div>
                <ActionBar style={{width:'15%', height: '50vh'}} />
            </div>
        </div>
    );
}

export default Invitations;