import ProjectList from '../../components/ProjectList'
import {useAuthContext} from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import './Dashboard.css'
export default function Dashboard() {
  const {user} = useAuthContext();
  // const { documents, error } = useCollection('projects', ["createdBy.id", "==", user.uid])
  const { documents, error } = useCollection('projects', ["assignedUsersIdList", "array-contains", user.uid])

  return (
    <div className='step2'>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectList projects={documents}/>}
    </div>
  )
}
