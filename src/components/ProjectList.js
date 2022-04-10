import { Link } from 'react-router-dom'
import Thumbnail from './Thumbnail'

import './ProjectList.css'

export default function ProjectList({ projects }) {

  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h3>Project Name :{project.name}</h3>
          <p>Created By {project.createdBy.displayName}</p>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <p><strong>Assigned to:</strong></p>
            <ul>
              {project.assignedUsersList.map(user => (
                <li key={user.photoURL}>
                  <Thumbnail src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  )
}
