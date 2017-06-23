import React from 'react';
import ReactPaginate from 'react-paginate';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import { hashHistory } from "react-router";

import FeedStore from '../../stores/FeedStore';
import FeedActions from '../../actions/FeedActions';

const style = {
  margin: 20,
  padding: 10
};

const textStyle = {
  padding: "0 10px"
};

const labelStyle = {
  padding: "10px"
};

export default class CreateUser extends React.Component {
  /**
  * React.Component constructor.
  */
  constructor() {
        super();
        this.state = { user: {} };
        this.changeHandler = this.onChange.bind(this);
    }

    /**
    * Component lifecycle function.
    */
    componentWillMount() {
        FeedStore.addChangeListener(this.changeHandler);
    }

    /**
    * Component lifecycle function.
    */
    componentWillUnmount() {
        FeedStore.removeChangeListener(this.changeHandler);
    }

    /**
    * onChange Event Handler
    */
    onChange() {
        const saved = FeedStore.getSaved();
        if(saved){
            this.setState({open:true});
        }
    }

    /**
    * Pagination Onclick Event Handler
    * @param data
    */
    onChangeInput = (e) => {
        const data = this.state.user;
        data[e.target.name] = e.target.value;
        this.setState({user: data});
    }

    /**
    * Pagination Onclick Event Handler
    * @param data
    */
    onSave = (e) => {
        const data = this.state.user;
        data.role = "Professor"
        FeedActions.saveUser(data);
    }

    handleClose = () => {
        this.setState({open: false});
    };

    /**
    * Component lifecycle function.  See:  https://facebook.github.io/react/docs/component-specs.html#render
    * @returns {XML}
    */
    render() {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={()=> {hashHistory.push("/users");}}
            />,
        ];

      return (
        <div className="feed">
            <Subheader style={{fontSize: 24, marginTop: 15}}> Nova professor </Subheader>
            <Divider />
          <Paper style={style} zDepth={2} >
            
            <TextField
                style={{width: '100%'}}
                floatingLabelText="Nome"
                name="name"
                value={this.state.user.name}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Email"
                name="email"
                type="email"
                value={this.state.user.email}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Login"
                name="username"
                value={this.state.user.username}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Senha"
                name="password"
                type="password"
                value={this.state.user.password}
                onChange={this.onChangeInput}
            />

            <div style={{textAlign:'right'}}>
                  <RaisedButton onTouchTap={this.onSave} label="Salvar" primary={true} style={{margin:"20"}} />
              </div>
          </Paper>

          <Dialog
                title="Parabens"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                Professor criado com sucesso!
            </Dialog>
        </div>
      )
    }
}
