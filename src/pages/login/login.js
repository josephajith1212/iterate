import "./Login.css"

import {useState} from 'react'
import {useFirebaseLogin} from "../../hooks/useFirebaseLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, isPending} = useFirebaseLogin()



  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className='signupSignin-form'>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          required
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      {!isPending && <button className='btn'>Login</button>}
      {isPending && <button className='btn' disabled>Logging in</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
