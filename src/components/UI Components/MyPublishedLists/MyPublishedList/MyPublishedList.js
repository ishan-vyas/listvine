import React, { useState, useEffect } from 'react';
import './MyPublishedList.css';
import TextInput from '../../TextInputs/TextInput';

import {db} from "../../../firebase";
import { query, getDoc, doc, collection, getDocs, onSnapshot, addDoc, deleteDoc, orderBy } from "firebase/firestore";
import { useAuth } from "../../../../context/UserAuthContext";
import Confirm from '../../Modals/Confirm';

import { ListItem } from '../../ListPost/ListPost';
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
    const [confirm, setConfirm] = useState(false);

    const [list, setList] = useState();
    const [tasks, setTasks] = useState(false);

    const [listOpen, setListOpen] = useState(false);

    const addComment = async () => {
        console.log(commentContent);
        console.log("commenting from published list");
        if(commentContent !== ""){
            await addDoc(collection(db, "Post", props.postID, "Comments"), {
                commentContent: commentContent,
                commentCreated: new Date(),
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

    const deleteListHandler = async () => {

        const q1 = query(collection(db, "List", props.listID, "Tasks"));
        const taskSnapshot = await getDocs(q1);
        taskSnapshot.forEach((t) => {
            deleteDoc(doc(db, "List", props.listID, "Tasks", t.id));
        });
        
        deleteDoc(doc(db, "List", props.listID))
        setConfirm(false);
    }

    const deletePostHandler = async () => {

        const q1 = query(collection(db, "Post", props.postID, "Comments"));
        const commentSnapshot = await getDocs(q1);
        commentSnapshot.forEach((c) => {
            deleteDoc(doc(db, "Post", props.postID, "Comments", c.id));
        });
        
        deleteDoc(doc(db,"Post",props.postID)).then(() => {
            deleteListHandler();
        })
    }

    useEffect(() => {
        getList();
        getTasks();
        const q = query(listPost, orderBy("commentCreated"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tempComments = [];
            querySnapshot.forEach((doc) => { 
                tempComments.push({...doc.data(), id:doc.id, username:users[doc.data().userID] ? users[doc.data().userID]?.username : "deletedAccount", userColor: users[doc.data().userID] ? users[doc.data().userID]?.userColor : "black"}); 
            })
            setComments(tempComments);
        });

        return unsubscribe;

    }, []);

    return (
        <>
        {confirm && 
            <Confirm confirmHandler={deletePostHandler} cancelHandler={() => setConfirm(false)} title="Are you sure you want to delete this post?">
                You are about to delete '{list?.title}', it will no longer show up in your 'My Published Lists' section and will be removed from the Newsfeed.
            </Confirm>}
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
                <p style={{color:"grey", fontFamily:"Roboto", fontWeight:"100", margin:"0", marginLeft:"1%"}}>Posted on: {props.creation}</p>
                <div className='mylist-actions'>
                    <div className='mylist-btn red' onClick={() => {setConfirm(true)}}>Delete</div>
                </div>
                <div className="publist-content">
                    {tasks?.map((task) => {
                        return (<ListItem bg="white">{task.taskContent}</ListItem>)
                    })}
                </div>
                <div className="break"></div>
                <div className='publist-seperator' style={{alignSelf:"center"}}></div>
                <div className="break"></div>

                <div className="publist-comment-section">
                    <div className="commentStat-section" style={{marginBottom:"1%"}}>
                        <p style={{marginRight:"1%"}}className="comment-number">{props.likeList?.length +' likes'}</p>
                        <p onClick={() => setComment(!comment)} className="publist-comment-number"><u>{comments?.length.toString() +' comments'}</u></p>
                    </div>
                    {comment && (
                    <div className="commentItem-section">
                        {comments.map((comment) => {
                            return(<CommentItem user={comment.username} bg={comment.userColor}>{comment.commentContent}</CommentItem>);
                        })}
                        <div className="add-comment">
                            <h3 style={{marginBottom:'1%', fontFamily:'Roboto'}}>Add Comment</h3>
                            <div className="publist-comment-input">
                                <TextInput value={commentContent} onChange={(e) => setCommentContent(e.target.value)} inputStyle={{margin:'0', width:'97%', backgroundColor:"white", marginBottom:"1%"}} style={{width:'100%', margin: "0", marginBottom:"0"}}/>
                                <Send onClick={addComment} style={{color:'#4285F4', marginLeft:'1%', fontSize:'xx-large'}}/>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </>)}
        </div>
    </>
    );
}

export default MyPublishedList;