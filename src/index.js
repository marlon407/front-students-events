import React from 'react';
import { render } from 'react-dom'
import { Router, hashHistory, Route, IndexRoute } from "react-router";

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MainStore from './stores/MainStore';

import App from './App.js';
import Login from './components/Login'

import Students from './components/student/Students';
import CreateStudent from './components/student/CreateStudent';

import Users from './components/user/Users'
import CreateUser from './components/user/CreateUser'

import Events from './components/event/Events';
import EventCreate from './components/event/CreateEvent';
import ShowEvent from './components/event/ShowEvent';

import './index.css'

injectTapEventPlugin();

const authTransition = function authTransition(nextState, replace, callback) {
  const isLoogedIn = MainStore.isLoogedIn()
  if (!isLoogedIn) {
    replace({ nextPathname: nextState.location.pathname }, '/login', nextState.location.query)
  }
  callback()
}

render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
          <IndexRoute component={Login}/>
          <Route path="/students" component={Students} onEnter={authTransition}/>
          <Route path="/students/new" component={CreateStudent} onEnter={authTransition}/>
          
          <Route path="/users" component={Users} onEnter={authTransition}/>
          <Route path="/users/new" component={CreateUser} onEnter={authTransition}/>

          <Route path="/events" component={Events} onEnter={authTransition}/>
          <Route path="/events/new" component={EventCreate} onEnter={authTransition}/>
          <Route path="/events/:id" component={ShowEvent} onEnter={authTransition}/>
      </Route>
    </Router>
  </MuiThemeProvider>
  ), document.getElementById('root'));
