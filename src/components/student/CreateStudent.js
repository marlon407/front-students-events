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

export default class CreateStudent extends React.Component {
  /**
  * React.Component constructor.
  */
  constructor() {
        super();
        this.state = { student: {} };
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
            //FeedActions.sendMessage("Salvo com sucesso");
            // hashHistory.push("/students");
            this.setState({open:true});
        }
    }

    /**
    * Pagination Onclick Event Handler
    * @param data
    */
    onChangeInput = (e) => {
        const data = this.state.student;
        data[e.target.name] = e.target.value;
        this.setState({student: data});
    }

    /**
    * Pagination Onclick Event Handler
    * @param data
    */
    onSave = (e) => {
        const data = this.state.student;
        FeedActions.saveStudent(data);
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
                onTouchTap={()=> {hashHistory.push("/students");}}
            />,
        ];

      return (
        <div className="feed">
            <Subheader style={{fontSize: 24, marginTop: 15}}> Nova aluno </Subheader>
            <Divider />
          <Paper style={style} zDepth={2} >
            <TextField
                style={{width: '100%'}}
                floatingLabelText="Nome"
                name="name"
                value={this.state.student.name}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Email"
                name="email"
                value={this.state.student.email}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Telefone"
                name="phone"
                type="number"
                value={this.state.student.phone}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Turma"
                name="class"
                value={this.state.student.class}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Curso"
                name="course"
                value={this.state.student.course}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Matricula"
                name="registrationId"
                type="number"
                value={this.state.student.registrationId}
                onChange={this.onChangeInput}
            />

            <div style={{textAlign:'right'}}>
                  <RaisedButton onTouchTap={this.onSave} label="Salvar" primary={true} style={{margin:"20"}} />
              </div>
          </Paper>

          <Dialog
                title="Parabéns"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                Aluno criado com sucesso!
            </Dialog>
        </div>
      )
    }
}
