import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


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

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.state.selectUser); // result: 'some_value'
    setSelectUser(location.state.selectUser);
 }, [location]);

  return (
    <div className="messages_container">
      {selectUser && <div className='messages_user'>
        <h3>{selectUser.displayName}</h3></div>}
      {!selectUser && <div className="no_conv"><h3>Select a user to start conversation</h3></div>}
    </div>
  )
}
