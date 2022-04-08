import React from "react";
import "./NewList.css";
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import Button from "../../UI Components/Button";
import TransparentTextInput from "../../UI Components/TextInputs/TransparentTextInput";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {  onSnapshot, collection, doc, getDoc, deleteDoc, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useAuth } from "../../../context/UserAuthContext";

export const CreateNewList = () => {

    const [ListItems, setListItems] = useState([]);
    const [input, setInput] = useState("Enter an Item....");
    const [title, setTitle] = useState("Enter a Title..");
    const [listID, setListID] = useState("");
    const [addedUsers, setAddedUsers] = useState([]);
    const [collaborator, setCollaborator] = useState("");
    const [userids, setUserIDs] = useState([]);
    const [currentItemID, setCurrentItemID] = useState(0);
    const [currentUserItemID, setCurrentUserItemID] = useState(0);

    const { user, users } = useAuth();
    const navigate = useNavigate();
    let id = "";
    let itemID = 0;

    const submitNewList = async () => {
        //
        //e.preventDefault();
        await addDoc(collection(db, "List"), {
            userID: user.uid,
            users: [user.uid],
            title: title,
            published: false,
            listCreated: new Date(), 
        }).then((docRef) => {
            setListID(docRef.id);
            id = docRef.id;
            console.log("id is: " + listID);
            console.log("id is: " + id);
            ListItems.forEach((t) => {
                //console.log('hello');
                addDoc(collection(db, "List", docRef.id, "Tasks"), {
                    taskContent: t.content,
                    taskStatus: false,
                });
            });
            inviteUsers();
       
            console.log(ListItems);
            console.log("list created");
            navigate("/home");
        });
        
    };

    const inviteUsers = async () => {
        userids.forEach( async (au) => {
            await addDoc(collection(db, "Invitation"), {
            fromUser: user.uid,
            list: id,
            toUser: au,
            })
        });
        console.log("invited Users");
        console.log(listID);
    };

    const handleKeyPress = (event) => {
        if (input.length > 0) {
            console.log(input);
            //console.log(ListItems);
            setListItems([...ListItems, {id:currentItemID, content:input}]);
            //setItem(input);
            setCurrentItemID(currentItemID+1);
        }
    };

    const removeItem = (object, type) => {
        console.log(object);
        if(type == "user"){
            console.log("This is added Users:", addedUsers);
            console.log("This is userids", userids);
            const newList = addedUsers.filter((item) => item.id !== object.id);
            console.log("This is the new List", newList);
            setAddedUsers(newList);

            const newUserIds = userids.filter((item) => item !== object.userID);
            console.log("This is the new List", newUserIds);
            setUserIDs(newUserIds);
        }else if(type == "item"){
            const newList = ListItems.filter((item) => item.id !== object.id);
            console.log("This is the new List", newList);
            setListItems(newList);
        }
    };

    const handleKeyPressUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "User"));
        querySnapshot.forEach((doc) => {
            console.log("inside hadleuser");
            console.log(doc.data());
            if(doc.data().username == collaborator){
                console.log("invited" + collaborator + " to list");
                 setAddedUsers([...addedUsers, {id:currentUserItemID, content:collaborator, userID: doc.id}]);
                 setUserIDs([...userids, doc.id]);
                 setCurrentUserItemID(currentUserItemID+1);
            }
        });
    };

    const ListItem = (props) => {
        return (
            <div className="listedItem">
                <p className="item-text">{props.text}</p>
                <p onClick={(e) => removeItem(props.object, props.type)} className="close-button">
                    X
                </p>
            </div>
        );
    };

    return(
        <div className="create-div">
            <div className="header-section">
                <h1 id="newlist-title">Create New List</h1>
            </div>
            <div className="list-section">
                <TransparentTextInput
                    onInput={(e) => setTitle(e.target.value)}
                    defaultValue="Add Title ..."
                />
                <div className="listitem-section">
                    <div className="added-items-container">
                        <>
                            {ListItems?.map((item) => {
                                return (
                                    <ListItem type="item" object={item} key={item.id} id={item.id} text={item.content}></ListItem>
                                );
                            })}
                        </>
                        <TransparentTextInput
                            onInput={(e) => setInput(e.target.value)}
                            onKeyPress={(e) =>
                                e.key === "Enter" && handleKeyPress()
                            }
                            defaultValue="Enter a item..."
                        />
                    </div>
                </div>
            </div>
            <div className="user-section">
                <div className="users-container">
                    <>
                        {addedUsers.map((user) => {
                            return <ListItem type="user" object={user} key={user.id} id={user.id} text={user.content}></ListItem>;
                        })}
                    </>
                    <TransparentTextInput
                        onInput={(e) => setCollaborator(e.target.value)}
                        onKeyPress={(e) =>
                            e.key === "Enter" && handleKeyPressUsers()
                        }
                        defaultValue="Add User ..."
                    />
                </div>
            </div>
            <div className="button-section">
                <Button onClick={(e) => submitNewList(e)}>
                    Create
                </Button>
            </div>
        </div>
    );
}

function NewList() {
    

    return (
        <div className="main-newlist-div">
            <Navbar>Ishan Vyas</Navbar>
            <div className="newlist-div">
                <CreateNewList />
                <ActionBar style={{ width: "15%", height: "50vh" }} />
            </div>
        </div>
    );
}

export default NewList;
