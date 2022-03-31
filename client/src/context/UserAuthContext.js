import { createContext, useContext, useEffect, useState } from "react";
import {auth} from '../components/firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, updatePassword, deleteUser } from 'firebase/auth';


const userAuthContext = createContext();

export function UserAuthContextProvider({children}){

    const [ user, setUser ] = useState("");

    function signUp(username, email, password){
        return createUserWithEmailAndPassword(auth, email, password).then(() => {
            updateProfile(auth.currentUser, {
                displayName: username
            })
        });
    } 

    function logIn(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    } 

    function logOut(email, password){
        return signOut(auth);
    } 

    function changeUsername(newUsername){
        return updateProfile(auth.currentUser, {
            displayName: newUsername
        });
    }

    function changePassword(newPassword){
        return updatePassword(auth.currentUser, newPassword);
    }

    function deleteAccount(){
        return deleteUser(auth.currentUser);
    }

    useEffect(()=>{
        const unsubsribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("This is the current user", currentUser);
            setUser(currentUser);
        });

        return unsubsribe;
    },[]);

    return (
        <userAuthContext.Provider value={{user, signUp, logIn, logOut, changeUsername, changePassword, deleteAccount}}>
            {children}
        </userAuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(userAuthContext);
}