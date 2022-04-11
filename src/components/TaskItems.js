import { Link, useHistory } from 'react-router-dom'
import Thumbnail from './Thumbnail'
import React from 'react'
import {useFirestore} from "../hooks/useFirestore";

import './TaskItems.css'

export default function TaskNew({tasks}) {
    const history = useHistory()
    const {updateDocument, response} = useFirestore('tasks');

    const handleClick = async(task, e) => {
        if(task.status === "new"){
            await updateDocument(task.id, {
                status: "doing",
           })
        }
        else if(task.status === "doing"){
            await updateDocument(task.id, {
                status: "complete",
           })
        }
        if(!response.error){
            history.push({
              pathname: '/taskList',
              state: {projectId : task.projectId, projectName : task.projectName}
            })
        }
    }

  return (
    <div>
        {tasks.map(task => (
            <div className='taskCard'  key={task.id}>
            <Link to={`/taskDetail/${task.id}`}>
                <h4>{task.name}</h4>
                <p>Due by {task.dueDate.toDate().toDateString()}</p>
                <div className="assigned-to">
                    <p><strong>Assigned to:</strong></p>
                    <ul>
                    {task.assignedUsersList.map(user => (
                        <li key={user.photoURL}>
                        <Thumbnail src={user.photoURL} />
                        </li>
                    ))}
                    </ul>
                </div>
                {task.status === "new" && (<button className="btn" onClick={(e) => handleClick(task, e)}>Mark as 'In Progress'</button>)}
                {task.status === "doing" && (<button className="btn" onClick={(e) => handleClick(task, e)}>Mark as 'Complete'</button>)} 
            </Link>
            </div>
        ))}
    </div>
  )
}
