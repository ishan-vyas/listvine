import React, { useState, useEffect } from 'react';
import './MyPublishedList.css';
import TextInput from '../../TextInputs/TextInput';

import {db} from "../../../firebase";
import { getDoc, doc, collection, getDocs, onSnapshot, addDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../../../../context/UserAuthContext";


import MyPublishedListItem from './MyPublishedListItem/MyPublishedListItem';
import { Send, MoreHoriz, MoreVert } from '@material-ui/icons';

// export const UserTag = (props) => {
//     return(
//         <div className="usertag">
//             <div className="color-container" style={{backgroundColor:props.bg}}>
//                 <div className="usercolor">
//                 </div>
//             </div>
//             <p style={{color:'black'}}>{props.children}</p>
//         </div>
//     );
// }

const CommentItem = (props) => {
    return (
        <div className="publist-comment-container">
            <div className="check-container" style={{backgroundColor:props.bg}}>
                <div className="circular-check">
                </div>
            </div>
            <div className="publist-comment-content" style={{fontFamily:'Roboto'}}>
                <h3>{props.user}</h3>
                <p>{props.children}</p>
            </div>
        </div>
    );
}


const MyPublishedList = (props) => {

    const { user, users } = useAuth();

    const listPost = collection(db, 'Post', props.postID,'Comments');

    const [like, setLike] = useState(false);
    const [comment, setComment] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState();

    const [list, setList] = useState();
    const [tasks, setTasks] = useState(false);

    const [listOpen, setListOpen] = useState(false);

    const addComment = async () => {
        if(commentContent !== ""){
            await addDoc(collection(db, "Post", props.postID, "Comments"), {
                commentContent: commentContent,
                userID: user.uid
            });
        }
        setCommentContent("");
    };


    const getList = async () => {
        const docRef = doc(db, "List", props.listID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setList({...docSnap.data(), id:docSnap.id});
        } else {
            // doc.data() will be undefined in this case
            return {};
        }
    };

    const getTasks = async () => {

        const querySnapshot = await getDocs(collection(db, "List", props.listID, "Tasks"));
        const tempTasks = []
        querySnapshot.forEach((doc) => {
            tempTasks.push({...doc.data(), id:doc.id});
        });
        setTasks(tempTasks);

    };

    useEffect(() => {
        getList();
        getTasks();
        const res = onSnapshot(listPost, (querySnapshot) => {
            const tempComments = [];
            querySnapshot.forEach((doc) => {
                tempComments.push({...doc.data(), id:doc.id, username:users[doc.data().userID].username, userColor: users[doc.data().userID].userColor});
            })
            setComments(tempComments);
        });
        return res;

    }, []);

    return (
        <div className="mypublishedlist">

            <div className = 'mypublishedlist-title-section' onClick={() => setListOpen(!listOpen)}>
                <div className='mypublishedlist-title'>
                    {list?.title}
                </div>
                {listOpen ?
                (<MoreVert fontSize="large" style={{marginRight:'0.4em'}}/>) : 
                (<MoreHoriz fontSize="large" style={{marginRight:'0.4em'}}/>)}
            </div>

            {listOpen && (
            <>
                <div className="publist-content">
                    {tasks?.map((task) => {
                        return (< MyPublishedListItem text={task.taskContent} />)
                    })}

                <div className="break"></div>
                <div className='publist-seperator'></div>
                <div className="break"></div>

                <div className="publist-comment-section">
                    <p onClick={() => setComment(!comment)} className="publist-comment-number"><u>{comments?.length.toString() +' comments'}</u></p>
                    {comment && (
                    <>
                        {comments.map((comment) => {
                            return(<CommentItem user={comment.username} bg={comment.userColor}>{comment.commentContent}</CommentItem>);
                        })}
                        <div className="add-comment">
                            <h3 style={{marginBottom:'1%', fontFamily:'Roboto'}}>Add Comment</h3>
                            <div className="comment-input">
                                <TextInput value={commentContent} onChange={(e) => setCommentContent(e.target.value)} inputStyle={{margin:'0', width:'97%', backgroundColor:"white"}} style={{width:'100%', margin: "0", marginBottom:"0"}}/>
                                <Send onClick={addComment} style={{color:'#4285F4', marginLeft:'1%', fontSize:'xx-large'}}/>
                            </div>
                        </div>
                    </>
                    )}
                </div>
                </div>


                
            </>)}
        </div>
    );
}

export default MyPublishedList;