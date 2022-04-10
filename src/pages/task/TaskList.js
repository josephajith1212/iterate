import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useCollection } from '../../hooks/useCollection'
import { Link } from 'react-router-dom'
import Thumbnail from '../../components/Thumbnail'

import './Task.css'

export default function TaskList() {
    let history = useHistory()
    const location = useLocation()
    const projectId = location.state.projectId
    const projectName = location.state.projectName
    const { documents, error } = useCollection('tasks', ["projectId", "==", projectId])

    const handleCreate = (e) => {
        history.push({
          pathname: '/taskCreate',
          state: {projectId : projectId, projectName : projectName}
        })
    }

    return (
        <div>
            <button className="btn" onClick={handleCreate}>New Task</button> <br/><br></br>
            <h2 className="page-title">Task Dashboard</h2>
            {error && <p className="error">{error}</p>}
            {documents &&
                (<div className="task-list">
                    {documents.length === 0 && <p>No Tasks For This Project Yet!Lets Create One</p>}
                    {documents.map(task => (
                        <Link to={`/taskDetail/${task.id}`} key={task.id}>
                            <h4>{task.name}</h4>
                            <p>{task.category.label} Task</p>
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
                        </Link>
        ))}
        </div>)
        }
        </div>
    )
}
