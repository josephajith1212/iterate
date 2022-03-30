import React from 'react'
import Thumbnail from "../../components/Thumbnail"
import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'

import './Task.css'

export default function TaskDetail() {
    const {id} = useParams()
    const {document, error} = useDocument('tasks', id)

    if (error) {
        return <div className="error">{error}</div>
      }
    if (!document) {
    return <div className="loading">Loading...</div>
    }
    
    return (
        <div className="task-detail">
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
    )
}
