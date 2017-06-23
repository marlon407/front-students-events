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


export default class ShowUser extends React.Component {
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

    componentDidMount() {
        FeedActions.getUser(this.props.params.id)
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
        const user = FeedStore.getUser();
        if(saved){
            this.setState({open:true});
        }
        this.setState({user});
    }

    validateForm = () => {
        const user = this.state.user;
        if(user.name && user.email && user.username && user.password) {
            return true
        }
        return false;
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
    onSave = () => {
        if (this.validateForm()){
            const data = this.state.user;
            data.role = "Professor"
            FeedActions.saveUser(data);
        }else{
            alert("Preencha todos os campos!");
        }
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
            <Subheader style={{fontSize: 24, marginTop: 15}}> Detalhe professor </Subheader>
            <Divider />
          <Paper style={style} zDepth={2} >
            
            <TextField
                style={{width: '100%'}}
                floatingLabelText="Nome"
                name="name"
                disabled
                value={this.state.user.name}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Email"
                name="email"
                type="email"
                disabled
                value={this.state.user.email}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Login"
                name="username"
                disabled
                value={this.state.user.username}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Senha"
                name="password"
                type="password"
                disabled
                value={this.state.user.password}
                onChange={this.onChangeInput}
            />
            
          </Paper>

          <Dialog
                title="Parabéns"
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
