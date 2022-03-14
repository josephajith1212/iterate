import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { myFirestore } from "../../firebase/config";
import {useAuthContext} from "../../hooks/useAuthContext";
import  MessageForm from '../../components/MessageForm'

// styles
import './Chat.css'

export default function Chat(props) {
  const [selectUser, setSelectUser] = useState({
    online : "",
    displayName : "",
    photoURL : "",
    id : ""
  });
  const location = useLocation();
  const [text, setText] = useState("");
  const {user} = useAuthContext();

  useEffect(() => {
    setSelectUser(location.state.selectUser);
 }, [location]);

 const handleSubmit = async (e) => {
    e.preventDefault();
    const userFromId = user.uid;
    const userToId = selectUser.id;
    const id = userFromId > userToId ? `${userFromId + userToId}` : `${userToId + userFromId}`;
    
    await myFirestore.collection("messages").doc(id).collection("chats").add({
      text,
      from : userFromId,
      to : userToId,
      createdAt : new Date()
    })
    setText("");
 }
  return (
    <div className="chat">
      {selectUser ? (
        <>
          <div className='chat-user'>
          <h3>{selectUser.displayName}</h3></div>
          <MessageForm handleSubmit={handleSubmit} text={text} setText={setText}/>
        </>
      ) : (
        <div className='no-conv'><h3>Select a user to start conversation</h3></div>
      )}
    </div>
  )
}
