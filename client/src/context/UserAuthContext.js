import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../components/firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, updatePassword, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { db } from '../components/firebase';
import { doc, setDoc, deleteDoc, getDoc, getDocs, collection} from 'firebase/firestore';


const userAuthContext = createContext();

export function UserAuthContextProvider({children}){

    const [ user, setUser ] = useState("");
    const [ users, setUsers ] = useState();

    async function getUser(userID){
        const docRef = doc(db, "User", userID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return({...docSnap.data(), id:docSnap.id});
        } else {
            // doc.data() will be undefined in this case
            return {};
        }
    }

    async function getUsers(){
        const querySnapshot = await getDocs(collection(db, "User"));
        const tempUsers = {}
        querySnapshot.forEach((doc) => {
            tempUsers[doc.id] = {...doc.data()};
        });
        setUsers(tempUsers);
    }

    function getColor(){
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    }

    const changeUsernameDB = async (newUsername) => {
        await setDoc(doc(db, "User", auth.currentUser.uid), {
            username: newUsername,
        }, {merge : true}).then(() => {
            auth.currentUser.reload();
        });
    }

    const deleteUserDB = async () => {
        await deleteDoc(doc(db, "User", auth.currentUser.uid));
    }

    function signUp(username, email, password){
        return createUserWithEmailAndPassword(auth, email, password).then(() => {
            updateProfile(auth.currentUser, {
                displayName: username
            })
            setDoc(doc(db, "User", auth.currentUser.uid), {
                username: username,
                userColor: getColor()
            });
        });
    } 

    function logIn(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    } 

    function logOut(){
        return signOut(auth);
    } 
    
    function reauthenticateUser(password){
        var cred = EmailAuthProvider.credential(auth.currentUser.email,password);
        return reauthenticateWithCredential(auth.currentUser, cred);
    }

    function changeUsername(newUsername){
        return updateProfile(auth.currentUser, {
            displayName: newUsername
        }).then(() => {
            changeUsernameDB(newUsername);
        });
    }

    function changePassword(newPassword){
        return updatePassword(auth.currentUser, newPassword);
    }

    function deleteAccount(){
        deleteUserDB();
        return deleteUser(auth.currentUser);
    }

    useEffect(()=>{
        const unsubsribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return unsubsribe;
    },[]);

    return (
        <userAuthContext.Provider value={{user, users, signUp, logIn, logOut, changeUsername, changePassword, deleteAccount, reauthenticateUser, getUser, getUsers}}>
            {children}
        </userAuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(userAuthContext);
}