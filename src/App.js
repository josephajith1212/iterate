import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Signup from './pages/signup/signup';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Dashboard/>
            </Route>
            <Route path="/create">
              <Create/>
            </Route>
            <Route path="/project">
              <Create/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/signup">
              <Signup/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
