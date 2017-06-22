import React from 'react';
import { render } from 'react-dom'
import { Router, hashHistory, Route, IndexRoute } from "react-router";

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

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

render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
          <IndexRoute component={Login}/>
          <Route path="/students" component={Students}/>
          <Route path="/students/new" component={CreateStudent}/>
          
          <Route path="/users" component={Users}/>
          <Route path="/users/new" component={CreateUser}/>

          <Route path="/events" component={Events}/>
          <Route path="/events/new" component={EventCreate}/>
          <Route path="/events/:id" component={ShowEvent}/>
      </Route>
    </Router>
  </MuiThemeProvider>
  ), document.getElementById('root'));
