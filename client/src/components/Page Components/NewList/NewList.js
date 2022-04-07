import React from "react";
import "./NewList.css";
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import Button from "../../UI Components/Button";
import TransparentTextInput from "../../UI Components/TextInputs/TransparentTextInput";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
    getDoc,
    doc,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    setDoc,
} from "firebase/firestore";
import { useAuth } from "../../../context/UserAuthContext";

function NewList() {
    const [ListItems, setListItems] = useState([]);
    const [input, setInput] = useState("Enter an Item....");
    const [title, setTitle] = useState("Enter a Title..");
    const [listID, setListID] = useState("");
    const [addedUsers, setAddedUsers] = useState([]);
    const [collaborator, setCollaborator] = useState("");

    const { user, users } = useAuth();
    const navigate = useNavigate();

    const submitNewList = async () => {
        //
        //e.preventDefault();
        await addDoc(collection(db, "List"), {
            userID: user.uid,
            users: [user.uid],
            title: title,
            published: false,
        }).then((docRef) => {
            setListID(docRef.id);
            ListItems.forEach((t) => {
                //console.log('hello');
                addDoc(collection(db, "List", docRef.id, "Tasks"), {
                    taskContent: t,
                    taskStatus: false,
                });
            });
        });
        inviteUsers();
        console.log(title);
        console.log(ListItems);
        console.log("list created");
        navigate("/home");
    };

    const inviteUsers = async () => {
        /*await addedUsers.forEach((au) => {
            addDoc(collection(db, "Invitation"), {
            fromUser: user.uid,
            list: listID,
            toUser: au,
            })
        });*/
        console.log("invited Users");
        console.log(addedUsers);
    };

    const handleKeyPress = (event) => {
        if (input.length > 0) {
            console.log(input);
            //console.log(ListItems);
            setListItems([...ListItems, input]);
            //setItem(input);
            console.log(ListItems);
        }
    };

    const removeItem = (event) => {};

    const handleKeyPressUsers = (event) => {
       /* if ("is valid user") {
            console.log(collaborator);
            //console.log(ListItems);
            setAddedUsers([...addedUsers, collaborator]);
            //setItem(input);
            console.log(addedUsers);
        }*/
    };

    const ListItem = (props) => {
        return (
            <div className="listedItem">
                <p className="item-text">{props.text}</p>
                <p onClick={(e) => removeItem()} className="close-button">
                    X
                </p>
            </div>
        );
    };

    return (
        <div className="main-newlist-div">
            <Navbar>Ishan Vyas</Navbar>
            <div className="newlist-div">
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
                                    {ListItems.map((item) => {
                                        return (
                                            <ListItem text={item}></ListItem>
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
                                    return <ListItem text={user}></ListItem>;
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
                <ActionBar style={{ width: "15%", height: "50vh" }} />
            </div>
        </div>
    );
}

export default NewList;
