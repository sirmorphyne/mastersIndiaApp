import React from 'react';
import './App.scss';
import {BrowserRouter as Router,Switch} from 'react-router-dom'; 
import {Home,Signin,Signup} from './pages';
import * as ROUTES from './constants/routes';
import {useAuthListener} from './utils';

import {IsUserRedirect,ProtectedRoute} from './routes';
export default function App() {
  const {user} = useAuthListener();
  return (
    <Router>
    <Switch>
      <IsUserRedirect user={user} loggedInPath={ROUTES.HOME} path={ROUTES.SIGN_IN}>
        <Signin />
      </IsUserRedirect>
      <IsUserRedirect user={user} loggedInPath={ROUTES.HOME} path={ROUTES.SIGN_UP}>
        <Signup />
      </IsUserRedirect>
      <ProtectedRoute user={user} path={ROUTES.HOME}>
      <Home />
      </ProtectedRoute>
    </Switch>
  </Router>
  );
}
