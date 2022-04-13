import { useEffect, useState } from 'react'
import Select from 'react-select'
import {timestamp} from '../../firebase/config'
import {useCollection} from '../../hooks/useCollection'
import {useAuthContext} from '../../hooks/useAuthContext'
import {useFirestore} from '../../hooks/useFirestore'

import "./Update.css"
import {useHistory} from 'react-router'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
  const history = useHistory();
  const {updateDocument, response} = useFirestore('projects')
  const {documents} = useCollection('users');
  const [users, setUsers] = useState([]);
  const {user} = useAuthContext();
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState();
  const [formError, setFormError] = useState(null);
  
  useEffect(() => {
    if(documents){
      const options = documents.map(user => {
        return {value: user, label: user.displayName};
      });
      setUsers(options);
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!category) setFormError("Please select the project category");
    if (assignedUsers.length < 1) setFormError("Please assign the project to at least 1 user");
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    }
    const assignedUsersList = assignedUsers.map((user) => {
      return{
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id,
      }
    })

    let assignedUsersIdList = assignedUsers.map((user) => {
      return user.value.id
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date()),
      assignedUsersList,
      assignedUsersIdList,
      createdBy,
      comments: []
    }
 
    setAssignedUsers([...assignedUsers, {value:{displayName: user.displayName, id: user.uid, online: true, photoURL: user.photoURL}, label: user.displayName}])
    await updateDocument(project);
    if(!response.error) history.push('/');
    
  }


  return (
    <div className="update-form">
      <h2 className="page-title">Update Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => {
              setAssignedUsers(option)
            }}
            // options={users.filter(each => each.value.id !== user.uid)}
            options={users}
            isMulti
          />
        </label>
        <button className="btn">Update Project</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}