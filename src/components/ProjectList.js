import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'

// styles
import './ProjectList.css'

export default function ProjectList({ projects }) {
  console.log(projects)

  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          
        </Link>
      ))}
    </div>
  )
}