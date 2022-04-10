import React, {useEffect, useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Select from 'react-select'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'

import "./Task.css"

export default function TaskCreate() {
  
    const history = useHistory()
    const location = useLocation()
    const projectId = location.state.projectId
    const projectName = location.state.projectName
    const {addDocument, response} = useFirestore('tasks')
    const {user} = useAuthContext()
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([])

    // form field values
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [category, setCategory] = useState('')
    const [formError, setFormError] = useState(null)

    const categories = [
      { value: 'development', label: 'Development' },
      { value: 'design', label: 'Design' },
      { value: 'sales', label: 'Testing' },
    ]

     // create user values for react-select
    useEffect(() => {
        if(documents) {
            const options = documents.map(user => {
                return { value: user, label: user.displayName }
            })
            setUsers(options)
        }
    }, [documents])

    const handleSubmit = async (e) => {
      e.preventDefault()
      setFormError(null)

      if (!category) setFormError("Please select the project category");
      if(assignedUsers.length < 1){
          setFormError('Please assign the task to at least one user')
          return
      }

      const assignedUsersList = assignedUsers.map(u => {
        return { 
          displayName: u.value.displayName, 
          photoURL: u.value.photoURL,
          id: u.value.id
        }
      })
      const createdBy = { 
        displayName: user.displayName, 
        photoURL: user.photoURL,
        id: user.uid
      }
      const task = {
        projectId,
        projectName,
        name,
        description,
        category,
        dueDate: timestamp.fromDate(new Date(dueDate)),
        assignedUsersList, 
        createdBy
      }
      
      await addDocument(task)
      if(!response.error){
        history.push({
          pathname: '/taskList',
          state: {projectId : projectId, projectName : projectName}
        })
        //history.push('/')
      }
    }
  
    return (
      <div className="create-form">
        <h2 className="page-title">Create a new Task</h2>
        <label>Project Name: {projectName}</label>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Task Name:</span>
            <input
              required 
              type="text" 
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label>
            <span>Task Description:</span>
            <textarea 
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description} 
            ></textarea>
          </label>
          <label>
          <span>Task Type:</span>
          <Select
            onChange={(option) => {
              setCategory(option)
              console.log(category)
            }}
            options={categories}
          />
        </label>
          <label>
            <span>Set Due Date:</span>
            <input
              required 
              type="date" 
              onChange={(e) => setDueDate(e.target.value)} 
              value={dueDate}
            />
          </label>
          <label>
            <span>Assignee:</span>
            <Select
                onChange={(option) => setAssignedUsers(option)}
                options={users}
                isMulti
            />
          </label>

          <button className="btn">Create Task</button>
          {formError && <p className='error'>{formError}</p>}
        </form>
      </div>
    )
}
