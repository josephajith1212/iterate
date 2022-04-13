import React from 'react'
import Thumbnail from "../../components/Thumbnail"
import {useHistory, useParams} from "react-router-dom"
import {useDocument} from '../../hooks/useDocument'
import TaskComments from './TaskComments'

import './Task.css'

export default function TaskDetail() {
    let history = useHistory()
    const {id} = useParams()
    const {document, error} = useDocument('tasks', id)

    if (error) {
        return <div className="error">{error}</div>
    }
    if (!document) {
        return <div className="loading">Loading...</div>
    }
    const handleClick = (e) => {
        history.push({
          pathname: '/taskList',
          state: {projectId : document.projectId, projectName : document.projectName}
        })
      }
    return (
        <>
            <button className="btn backBtn" onClick={handleClick}>Back to All Tasks</button>
            <div className="task-detail">
                <div>
                    <h2 className="page-title">{document.name}</h2>
                    <p>Created By - {document.createdBy.displayName}</p>
                    <p className="due-date">
                        Task due by {document.dueDate.toDate().toDateString()}
                    </p>
                    <p className="description">
                        {document.description}
                    </p>
                    <h4>Task assigned to:</h4>
                    <div className="assigned-users">
                        {document.assignedUsersList.map(user => (
                            <div key={user.id}>
                                <Thumbnail src={user.photoURL} />
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <TaskComments task={document} />
                </div>
            </div>
        </>
    )
}
//