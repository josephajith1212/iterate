import {NavLink} from "react-router-dom"
import {useAuthContext} from "../hooks/useAuthContext"
import "./Sidebar.css"
import Thumbnail from "./Thumbnail"
import Tour from './Tour';

export default function Sidebar() {
    const {user} = useAuthContext();
    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                    <Thumbnail src={user.photoURL}/>
                    <p>Hey {user.displayName}</p>
                </div>
                <nav className="links">
                    <Tour />
                    <ul>
                        <li>
                            <NavLink exact to="/">
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink to="/project">
                                <span>Projects</span>
                            </NavLink>
                        </li> */}
                        <li >
                            <NavLink  to="/create">
                                <span  >New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
