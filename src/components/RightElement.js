import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link , Text} from "react-router";
import { Router, hashHistory, Route, IndexRoute } from "react-router";

export default class RightElement extends React.Component {

  logOut = () => {
    localStorage.clear();
    hashHistory.push('/');
  }

  render() {
    const isLoggedIn = localStorage.getItem('token');
    if(!isLoggedIn) return null;
    return (
      <IconMenu
        iconButtonElement={<IconButton ><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
          <MenuItem primaryText="Alunos"  containerElement={<Link to="/students" />} />
          <MenuItem primaryText="Professores" containerElement={<Link to="/users" />} />
          <MenuItem primaryText="Ocorrências" containerElement={<Link to="/events" />} />
          <MenuItem primaryText="Out" onTouchTap={this.logOut} />
      </IconMenu>
    );
  }
}
