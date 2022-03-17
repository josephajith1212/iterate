import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { myFirestore, timestamp } from '../../firebase/config'
import {useAuthContext} from "../../hooks/useAuthContext";

import Thumbnail from "../../components/Thumbnail"

// styles
import './Chat.css'

export default function Chat() {
  const [selectUser, setSelectUser] = useState({
    online : "",
    displayName : "",
    photoURL : "",
    id : ""
  });
  const location = useLocation();
  const {user} = useAuthContext();
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const userFromId = user.uid;

  useEffect(() => {
    setSelectUser(location.state.selectUser);
    const userToId = location.state.selectUser.id;
    const id = userFromId > userToId ? `${userFromId + userToId}` : `${userToId + userFromId}`;
    const chatsQuery = myFirestore.collection("chats").doc(id).collection("messages").orderBy("createdAt");
    chatsQuery.onSnapshot((querySnapshot) => {
      let texts = [];
      querySnapshot.forEach((doc) => {
        texts.push(doc.data());
      });
      console.log(texts);
      setMsgs(texts);
    }) 
  }, [location, userFromId]);

  console.log("state msgs" + msgs);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToId = selectUser.id;
    const id = userFromId > userToId ? `${userFromId + userToId}` : `${userToId + userFromId}`;

    await myFirestore.collection("chats").doc(id).collection("messages").add({
      fromId : userFromId,
      fromName : user.displayName,
      fromPhotoURL : user.photoURL,
      toId : selectUser.id,
      toName : selectUser.displayName,
      toPhotoURL : selectUser.photoURL,
      message : msg,
      createdAt : timestamp.fromDate(new Date())
    })
    setMsg("");  
  }
  return (
    <div className="chat">
      {selectUser ? (
        <>
          <div className='chat-title'>
            <h3>chat with {selectUser.displayName}</h3>
          </div>
          <div>
            {msgs.length? msgs.map((msg, index) => (
              <div className={msg.fromId === user.uid ? "own" : ""} key={index}>
                <div className="chat-user">
                    <Thumbnail src={msg.fromPhotoURL} />
                    {msg.fromName}
                    <span className="chat-date">{msg.createdAt.toDate().toLocaleString()}</span>
                </div>
                <p className={msg.fromId === user.uid ? "me" : ""}>{msg.message}</p>
                  
              </div>
            )) : null
            }
          </div>
   
          <form className="add-message" onSubmit={handleSubmit}>
            <div>
              <input type="text" placeholder="Enter message" required value={msg} onChange={(e)=> setMsg(e.target.value)}/>
              <button className="btn">Send</button>
            </div>
          </form>
        </>
      ) : (
        <div className='no-conv'><h3>Select a user to start conversation</h3></div>
      )}
    </div>
    
  )
}
