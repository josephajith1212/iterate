import { useEffect, useState } from 'react'
import Select from 'react-select'
import {timestamp} from '../../firebase/config'
import {useCollection} from '../../hooks/useCollection'
import {useAuthContext} from '../../hooks/useAuthContext'
import {useFirestore} from '../../hooks/useFirestore'

import "./Create.css"
import {useHistory} from 'react-router'
const itrOptions = [
  { value: 2, label: "two" },
  { value: 3, label: "three" },
  { value: 4, label: "four" },
  { value: 5, label: "five" },
  { value: 6, label: "six" },
]
const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
  const history = useHistory();
  const {addDocument, response} = useFirestore('projects')
  const {documents} = useCollection('users');
  const [users, setUsers] = useState([]);
  const {user} = useAuthContext();
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [iterations, setIterations] = useState('');
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
      iterations,
      assignedUsersList,
      assignedUsersIdList,
      createdBy,
      comments: []
    }
    // setAssignedUsers( (prevState) => [...prevState, {value:{displayName: user.displayName, id: user.uid, online: true, photoURL: user.photoURL}, label: user.displayName}])
    // prevState => console.log([...prevState, {value:{displayName: user.displayName, id: user.uid, online: true, photoURL: user.photoURL}, label: user.displayName}])
    // console.log([...assignedUsers, {value:{displayName: user.displayName, id: user.uid, online: true, photoURL: user.photoURL}, label: user.displayName}])
    setAssignedUsers([...assignedUsers, {value:{displayName: user.displayName, id: user.uid, online: true, photoURL: user.photoURL}, label: user.displayName}])
    await addDocument(project);
    if(!response.error) history.push('/');
    
  }


  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label className='CPstep1'>
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
        <label className='CPstep2'>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Number of iterations:</span>
          <Select
            onChange={(option) => setIterations(option)}
            options={itrOptions}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label className='CPstep3'>
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
        <button className="btn">Create Project</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}