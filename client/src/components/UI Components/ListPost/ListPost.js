import React from "react";
import { useState } from "react";
import "./ListPost.css";
import TextInput from '../TextInputs/TextInput';
import Button from '../Button';
import { Whatshot, WhatshotOutlined, Comment, CommentOutlined, Share, ShareOutlined, Edit, Send } from '@material-ui/icons';

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
            <div className="comment-content">
                <h3>{props.user}</h3>
                <p>{props.children}</p>
            </div>
        </div>
    );
}

const ListPost = () => {

    const [like, setLike] = useState(false);
    const [comment, setComment] = useState(false);
    const [share, setShare] = useState(false);

    return (
        <div className="listpost-container">
            <div className="listpost-content">
                <div className="members">
                    <UserTag bg="teal">Christopher Schultze</UserTag>
                    <UserTag bg="green">Ishan Vyas</UserTag>
                </div>
                <div className="userlist">
                    <h1 class="listpost-title">TO-DO List</h1>
                    <div className="listitem-container">
                        <ListItem>SENG 513 - UI Mockups</ListItem>
                        <ListItem>SENG 513 - Technical Presentation</ListItem>
                        <ListItem>SENG 513 - Project Deliverables</ListItem>
                        <ListItem>SENG 401 - Retrospective Paper</ListItem>
                        <ListItem>SENG 300 - Scrum Meeting</ListItem>
                    </div>
                </div>  
            </div>
            <div className="listpost-actions">
                {like ? (<Whatshot onClick={() => setLike(!like)} fontSize="large"/>) : (<WhatshotOutlined onClick={() => setLike(!like)} fontSize="large"/>)}
                {comment ? (<Comment onClick={() => setComment(!comment)} fontSize="large"/>) : (<CommentOutlined onClick={() => setComment(!comment)} fontSize="large"/>)}
                {share ? (<Share onClick={() => setShare(!share)} fontSize="large"/>) : (<ShareOutlined onClick={() => setShare(!share)} fontSize="large"/>)}
                <Edit fontSize="large"/>
            </div>
            <div class="break"></div>
            <div className='listpost-seperator'></div>
            <div class="break"></div>
            <div className="comment-section">
                <p onClick={() => setComment(!comment)} className="comment-number"><u>2 comments</u></p>
                {comment && (
                <>
                    <CommentItem user="Markus" bg="red">Great List</CommentItem>
                    <CommentItem user="Frank" bg="purple">There are other stuff due that needs to be added to this list</CommentItem>
                    <div className="add-comment">
                        <h3>Add Comment</h3>
                        <div className="comment-input">
                            <TextInput />
                            <Send style={{color:'#4285F4', marginLeft:'1%', fontSize:'xx-large'}}/>
                        </div>
                    </div>
                </>
                )}
            </div>
        </div>
    );
}

export default ListPost;