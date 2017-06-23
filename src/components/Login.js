import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { hashHistory } from "react-router";

import MainStore from '../stores/MainStore';
import MainActions from '../actions/MainActions';

const style = {
  margin: "20px 50px",
};

const textStyle = {
    width: '100%',
};

export default class Feed extends React.Component {
  /**
    * React.Component constructor.
  */
  constructor() {
        super();
        this.state = { offset: 1, username: '', password: '' };
        this.changeHandler = this.onChange.bind(this);
    }

    /**
        * Component lifecycle function.
    */
    componentWillMount() {
        MainStore.addChangeListener(this.changeHandler);
    }

    /**
        * Component lifecycle function.
    */
    componentWillUnmount() {
        MainStore.removeChangeListener(this.changeHandler);
    }

    /**
    * onChange Event Handler
    */
    onChange() {
        const loginSuccess = MainStore.isLoogedIn();
        if(loginSuccess){
            hashHistory.push('/students');
        }
    }

    onChangeUsername = (e) => {
        this.setState({username:e.target.value});
    }

    onChangePassword = (e) => {
        this.setState({password:e.target.value});
    }

    /**
        * Pagination Onclick Event Handler
        * @param data
    */
    handlePageClick = () => {
        MainActions.login(this.state.username, this.state.password);
    }

    /**
        * Component lifecycle function.  See:  https://facebook.github.io/react/docs/component-specs.html#render
        * @returns {XML}
    */
    render() {
      return (
        <div className="login">
          <Paper style={style} zDepth={2} >
              <div style={{padding: 10}}>
                <TextField
                    style={textStyle}
                    floatingLabelText="Username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                />

                <TextField
                    style={textStyle}
                    floatingLabelText="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                />
                <div style={{textAlign:'right'}}>
                    <RaisedButton onTouchTap={this.handlePageClick} label="Login" primary={true} style={{margin:"20"}} />
                </div>
            </div>
          </Paper>
        </div>
      )
    }
}
