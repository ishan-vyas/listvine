import React from "react";
import { useState, useEffect } from "react";
import "./ListPost.css";
import TextInput from '../TextInputs/TextInput';
import Button from '../Button';
import {db} from "../../firebase";
import { getDoc, doc, collection, getDocs, onSnapshot, addDoc } from "firebase/firestore";
import { useAuth } from "../../../context/UserAuthContext";
import { Whatshot, WhatshotOutlined, Comment, CommentOutlined, Share, ShareOutlined, Edit, Send} from '@material-ui/icons';

const UserTag = (props) => {
    return(
        <div className="usertag">
            <div className="color-container" style={{backgroundColor:props.bg}}>
                <div className="usercolor">
                </div>
            </div>
            <p>{props.children}</p>
        </div>
    );
}

const ListItem = (props) => {
    return (
        <div className="list-item">
            <div className="check-container" style={{backgroundColor:props.bg}}>
                <div className="circular-check">
                </div>
            </div>
            <p className="listitem-p">{props.children}</p>
        </div>
    );
}

const CommentItem = (props) => {
    return (
        <div className="comment-container">
            <div className="check-container" style={{backgroundColor:props.bg}}>
                <div className="circular-check">
                </div>
            </div>
            <div className="comment-content" style={{fontFamily:'Roboto'}}>
                <h3>{props.user}</h3>
                <p>{props.children}</p>
            </div>
        </div>
    );
}

const ListPost = (props) => {

    const [like, setLike] = useState(false);
    const [comment, setComment] = useState(false);
    const { user, users } = useAuth();
    const [list, setList] = useState();
    const [listTasks, setListTasks] = useState();
    const [comments, setComments] = useState();
    const [commentContent, setCommentContent] = useState();
    const listPost = collection(db, 'Post', props.id,'Comments');

    const addComment = async () => {
        if(commentContent !== ""){
            await addDoc(collection(db, "Post", props.id, "Comments"), {
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
        const tasks = []
        querySnapshot.forEach((doc) => {
            tasks.push({...doc.data(), id:doc.id});
        });
        setListTasks(tasks);
    };

    useEffect(() => {
        getList();
        getTasks();
        const unsubscribe = onSnapshot(listPost, (querySnapshot) => {
            const tempComments = [];
            querySnapshot.forEach((doc) => 
                tempComments.push({...doc.data(), id:doc.id, username:users[doc.data().userID].username, userColor: users[doc.data().userID].userColor})
            )
            setComments(tempComments);
        });

        return unsubscribe;
    }, []);

    return (
        <div className="listpost-container">
            <div className="listpost-content">
                <div className="members">
                    <UserTag bg={users[props.userDetails]?.userColor}>{users[props.userDetails]?.username}</UserTag>
                    <UserTag bg="green">Ishan Vyas</UserTag>
                </div>
                <div className="userlist">
                    <h1 className="listpost-title">{list?.title}</h1>
                    <div className="listitem-container">
                        {listTasks?.map((task) => {
                            return (<ListItem>{task.taskContent}</ListItem>);
                        })}
                    </div>
                </div>  
            </div>
            <div className="listpost-actions">
                {like ? (<Whatshot onClick={() => setLike(!like)} fontSize="large"/>) : (<WhatshotOutlined onClick={() => setLike(!like)} fontSize="large"/>)}
                {comment ? (<Comment onClick={() => setComment(!comment)} fontSize="large"/>) : (<CommentOutlined onClick={() => setComment(!comment)} fontSize="large"/>)}
                <Edit fontSize="large"/>
            </div>
            <div className="break"></div>
            <div className='listpost-seperator'></div>
            <div className="break"></div>
            <div className="comment-section">
                <p onClick={() => setComment(!comment)} className="comment-number"><u>{comments?.length.toString() +' comments'}</u></p>
                {comment && (
                <>
                    {comments.map((comment) => {
                        return(<CommentItem user={comment.username} bg={comment.userColor}>{comment.commentContent}</CommentItem>);
                    })}
                    <div className="add-comment">
                        <h3 style={{marginBottom:'1%', fontFamily:'Roboto'}}>Add Comment</h3>
                        <div className="comment-input">
                            <TextInput value={commentContent} onChange={(e) => setCommentContent(e.target.value)} inputStyle={{margin:'0', width:'97%'}} style={{width:'100%', margin: "0", marginBottom:"0"}}/>
                            <Send onClick={addComment} style={{color:'#4285F4', marginLeft:'1%', fontSize:'xx-large'}}/>
                        </div>
                    </div>
                </>
                )}
            </div>
        </div>
    );
}

export default ListPost;