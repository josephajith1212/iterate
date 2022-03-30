import {useHistory, useParams} from "react-router-dom"
import {useDocument} from '../../hooks/useDocument'

import ProjectComments from "./ProjectComments"
import ProjectSummary from "./ProjectSummary"

import './Project.css'

export default function Project() {
  let history = useHistory()
  const {id} = useParams()
  const {document, error} = useDocument('projects', id)
  console.log(error)

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }

  const handleClick = (e) => {
    history.push({
      pathname: '/taskList',
      state: {projectId : id, projectName : document.name}
    })
  }

  return (
    <div className="project-details">
      <div className="button-container">
        <button className="btn" onClick={handleClick}>All Tasks</button>
      </div>
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  )
}