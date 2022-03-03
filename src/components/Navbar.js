import "./Navbar.css"
import {Link} from "react-router-dom"
import {useLogout} from "../hooks/useLogout"

export default function Navbar() {
    const { logout, isPending, error } = useLogout()
    return (
        <div className="navbar">
            <ul>
                <li className="logo">
                    <Link to="/">
                        <p><span>/</span>PlanIT<span>/</span></p>
                    </Link>
                </li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li>
                    {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                    {isPending && <button className="btn" disabled>Logging out</button>}
                </li>
            </ul>
        </div>
    )
}