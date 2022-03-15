import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { myFirestore, timestamp } from "../../firebase/config";
import {useAuthContext} from "../../hooks/useAuthContext";

import  MessageForm from '../../components/MessageForm'
import  Message from '../../components/Message'

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
  const {user} = useAuthContext();
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  const userFromId = user.uid;
  const temp = [];

  useEffect(() => {
    setSelectUser(location.state.selectUser);
    const userToId = location.state.selectUser.id;
    const id = userFromId > userToId ? `${userFromId + userToId}` : `${userToId + userFromId}`;
    console.log("id   " + id);
    const chatsQuery = myFirestore.collection("messages").doc(id).collection("chats").orderBy("createdAt");
    chatsQuery.onSnapshot((querySnapshot) => {
      let texts = [];
      querySnapshot.forEach((doc) => {
        texts.push(doc.data());
        //texts.push({text : doc.data().text, from : doc.data().from});
        //console.log("doc data   " + Object.keys(doc.data()).map((key) => doc.data()[key]));
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
            <h3>{selectUser.displayName}</h3>
          </div>
          {/* <div>
            {msgs.length ? msgs.map((msg, i) => (<Message key={i} msg={msg}/>)) : null}
          </div> */}
          <MessageForm handleSubmit={handleSubmit} text={text} setText={setText}/>
        </>
      ) : (
        <div className='no-conv'><h3>Select a user to start conversation</h3></div>
      )}
      <div></div>
    </div>
    
  )
}
