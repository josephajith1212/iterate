import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useCollection } from '../../hooks/useCollection'
import TaskItems from '../../components/TaskItems'

import './Task.css'

export default function TaskList() {
    let history = useHistory()
    const location = useLocation()
    const projectId = location.state.projectId
    const projectName = location.state.projectName
    const { documents, error } = useCollection('tasks', ["projectId", "==", projectId], ["dueDate", "asc"])


    const handleCreate = (e) => {
        history.push({
          pathname: '/taskCreate',
          state: {projectId : projectId, projectName : projectName}
        })
    }

    return (
        <div>
            <button className="btn" onClick={handleCreate}>New Task</button> <br/>
            <h3 className="taskList-title">Tasks for Project <span>{projectName}</span></h3>
            {error && <p className="error">{error}</p>}
            {documents &&
                (<div className="task-list TLstep1">
                    {documents.length === 0 && <p>No tasks for this project yet!</p>}
                    <div className='column1 TLstep2'>
                        <p className='column-text'>To Do</p>
                        <TaskItems tasks={documents.filter(task => task.status === "new")} />
                    </div>
                    <div className='column2'>
                        <p className='column-text'>In Process</p>
                        <TaskItems tasks={documents.filter(task => task.status === "doing")} />
                    </div>
                    <div className='column3'>
                        <p className='column-text'>Complete</p>
                        <TaskItems tasks={documents.filter(task => task.status === "complete")} />
                    </div>
                </div>)
            }
        </div>
    )
}
