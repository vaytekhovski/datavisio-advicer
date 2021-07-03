import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import AppMenu from './components/AppMenu';
import AppContent from './components/AppContent'
import Authorization from './components/Authorization'
import SignOut from './components/SignOut'
import Home from './components/Home'
import Settings from './components/Settings'
import ChangePassword from './components/ChangePassword'
import History from './components/History'
import Payments from './components/Payments'


import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom"

function App(props) {

  const { history } = props;
  const [jwt, setJwt] = useState("");
  const [isAuth, setAuth] = useState(localStorage.getItem("user") == null ? false : true);
  const [userName, setUserName] = useState("");

  const setAuthorize = (values) => {
    if (values) {
      setJwt(values.jwt);
      setAuth(values.isAuth);
      setUserName(values.username);
    }
    else {

    }
  }

  return (
    <Router history={history}>
      <div>
        <AppMenu isAuth={isAuth} />
        {
          isAuth ?
            <Switch>
              <Route history={history} exact path='/' component={Home} />
              <Route history={history} path='/dashboard' component={AppContent} />
              <Route history={history} exact path='/settings' component={Settings} />
              <Route history={history} path='/settings/change-password' component={ChangePassword} />

              <Route history={history} path='/history' component={History} />
              <Route history={history} path='/payments' component={Payments} />
              
              <Route history={history} path="auth">
                <Authorization onAuthorize={setAuthorize} />
              </Route>
              <Route history={history} path='/sign-out'>
                <SignOut onAuthorize={setAuthorize} />
              </Route>

              <Redirect from='/' to='/dashboard' />
            </Switch>
            :
            <Switch>
              <Route history={history} exact path='/' component={Home} />
              <Route history={history} path="/auth">
                <Authorization onAuthorize={setAuthorize} />
              </Route>
              <Redirect from='/' to='/Home' />

            </Switch>
        }
      </div>
    </Router>
  );
}



export default App;
