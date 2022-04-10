import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListPost.css";
import TextInput from '../TextInputs/TextInput';
import {db} from "../../firebase";
import { getDoc, doc, collection, getDocs, onSnapshot, addDoc, setDoc, query, orderBy } from "firebase/firestore";
import { useAuth } from "../../../context/UserAuthContext";
import { Whatshot, WhatshotOutlined, Comment, CommentOutlined, Edit, Send} from '@material-ui/icons';
import Confirm from "../Modals/Confirm";

export const UserTag = (props) => {
    return(
        <div className="usertag">
            <div className="color-container" style={{backgroundColor:props.bg}}>
                <div className="usercolor">
                </div>
            </div>
            <p style={{color:'black'}}>{props.children}</p>
        </div>
    );
}

export const ListItem = (props) => {
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
    const [comment, setComment] = useState(false);
    const { user, users } = useAuth();
    const [like, setLike] = useState(props.likeList?.includes(user.uid));
    const [list, setList] = useState();
    const [listTasks, setListTasks] = useState();
    const [comments, setComments] = useState();
    const [commentContent, setCommentContent] = useState();
    const listPost = collection(db, 'Post', props.id,'Comments');
    const [confirm, setConfirm ] = useState(false);
    const navigate = useNavigate();

    const copyList = async () => {
        console.log('hello');
        console.log(list);
        console.log(listTasks);
        console.log('hello');
        await addDoc(collection(db, "List"), {
            userID: user.uid,
            users: [user.uid],
            title: list.title,
            listCreated: new Date(),
            published: false
        }).then((docRef) => {
            listTasks.forEach((t) => {
            console.log('hello');
                addDoc(collection(db, "List", docRef.id, "Tasks"), {
                    taskContent: t.taskContent,
                    taskStatus: t.taskStatus
                })
            })
        });
        navigate('/home');
        
    }

    const addComment = async () => {
        if(commentContent !== ""){
            await addDoc(collection(db, "Post", props.id, "Comments"), {
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
        console.log('hello');

        const querySnapshot = await getDocs(collection(db, "List", props.listID, "Tasks"));
        const tasks = []
        querySnapshot.forEach((doc) => {
            console.log('hello');
            tasks.push({...doc.data(), id:doc.id});
        });
        setListTasks(tasks);
    };

    const likeHandler = async () => {
        if(like === false){
            await setDoc(doc(db, "Post", props.id), {
                userLikes: [...props.likeList, user.uid]
            }, {merge:true});
            setLike(true);
        }else{
            const newLikeList = props.likeList.filter((u) => u !== user.uid);
            await setDoc(doc(db, "Post", props.id), {
                userLikes: [...newLikeList]
            }, {merge:true});
            setLike(false);  
        }
    }

    useEffect(() => {
        console.log("useEffect from ListPost.");
        getList();
        getTasks();
        const q = query(listPost, orderBy("commentCreated"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            console.log('hello');
            const tempComments = [];
            querySnapshot.forEach((doc) => { 
                console.log('hello');
                tempComments.push({...doc.data(), id:doc.id, username:users[doc.data().userID] ? users[doc.data().userID]?.username : "deletedAccount", userColor: users[doc.data().userID] ? users[doc.data().userID]?.userColor : "black"}); 
            })
            setComments(tempComments);
        });

        return unsubscribe;
    }, []);

    return (
        <>
        {confirm && <Confirm confirmHandler={copyList} pos={true} cancelHandler={()=>setConfirm(false)} title="Clone List">
            This will make a copy of this list and add it to your 'My Lists' section in the home page. Allowing you to edit this list and its content.
            </Confirm>}
        <div className="listpost-container">
            <div className="listpost-content">
                <div className="members">
                    {list?.users.map( (u) => {
                        return(<UserTag bg={users[u] ? users[u]?.userColor : "black"}>{users[u] ? users[u]?.username : "deletedAccount"}</UserTag>);
                    })}
                    {/* <UserTag bg={users[props.userDetails]?.userColor}>{users[props.userDetails]?.username}</UserTag> */}
                </div>
                <div className="userlist">
                    <h1 className="listpost-title">{list?.title}</h1>
                    <p style={{color:"grey", fontFamily:"Roboto", fontWeight:"100", margin:"0", marginLeft:"1%"}}>Posted on: {props.creation}</p>
                    <div className="listitem-container">
                        {listTasks?.map((task) => {
                            return (<ListItem>{task.taskContent}</ListItem>);
                        })}
                    </div>
                </div>  
            </div>
            <div className="listpost-actions">
                {like ? (<Whatshot style={{color:"orange"}} onClick={likeHandler} fontSize="large"/>) : (<WhatshotOutlined onClick={likeHandler} fontSize="large"/>)}
                {comment ? (<Comment style={{color:"#4285F4"}} onClick={() => setComment(!comment)} fontSize="large"/>) : (<CommentOutlined onClick={() => setComment(!comment)} fontSize="large"/>)}
                <Edit fontSize="large" onClick={() => setConfirm(true)}/>
            </div>
            <div className="break"></div>
            <div className='listpost-seperator'></div>
            <div className="break"></div>
            <div className="comment-section">
                <div className="commentStat-section">
                    <p style={{marginRight:"1%"}}className="comment-number">{props.likeList?.length +' likes'}</p>
                    <p onClick={() => setComment(!comment)} className="comment-number"><u>{comments?.length.toString() +' comments'}</u></p>   
                </div>
                {comment && (
                <div className="commentItem-section">
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
                </div>
                )}
            </div>
        </div>
        </>
    );
}

export default ListPost;