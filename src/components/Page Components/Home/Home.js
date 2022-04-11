import React, { useEffect } from "react";
import './Home.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import { useAuth } from "../../../context/UserAuthContext";
import MyLists from "../../UI Components/MyLists/MyLists";
import MyPublishedLists from "../../UI Components/MyPublishedLists/MyPublishedLists";
import { db } from "../../firebase";
import {collection, onSnapshot} from "firebase/firestore";

function Home(){
    const { getUsers } = useAuth();
    useEffect( () => {
        const q = collection(db, "User");
        const unsubscribe = onSnapshot(q, () => {
            getUsers();
        });
        return unsubscribe;
    },
    []);

    return(
        <div className="main-home-div">
            <Navbar />
            <div className="home-div">

                <div className="info-div">

                    <div className="info-div-child">
                        < MyLists />
                    </div>
                    <div className="info-div-child">
                        < MyPublishedLists />
                    </div>
                    
                </div>

                <div className="actionbar-div-page" style={{width:'15%'}}>
                    <ActionBar  style={{width:'100%', height:'50vh'}}/>
                </div>
            </div>
        </div>
    );
}

export default Home;