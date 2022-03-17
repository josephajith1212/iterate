import { useCollection } from '../hooks/useCollection'
import { useHistory } from 'react-router-dom'
import Thumbnail from './Thumbnail'
import './OnlineUsers.css'

export default function OnlineUsers() {
  const { error, documents } = useCollection('users')
  const history = useHistory();

  const selectUser = (user) => {
    history.push({
      pathname : '/chat',
      state : {selectUser : user}
    });
  }
  
  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {documents && documents.map(user => (
        <div key={user.id} className="user-list-item" onClick={() => selectUser(user)}>
            {user.online && <span className='online-user'></span>}
          <Thumbnail src={user.photoURL} />
          <span>{user.displayName}</span>
        </div>
      ))}
    </div>
  )
}