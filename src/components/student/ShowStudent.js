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

export default class ShowStudent extends React.Component {
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
    componentDidMount() {
        FeedActions.getStuent(this.props.params.id);
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
        const student = FeedStore.getStudent();
        if(saved){
            this.setState({open:true});
        }
        this.setState({student});
    }

    validateForm = () => {
        const student = this.state.student;
        if(student.name && student.email && student.phone && student.course && student.class && student.registrationId){
            return true
        }
        return false;
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
    onSave = () => {
        if (this.validateForm()){
            const data = this.state.student;
            FeedActions.saveStudent(data);
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
                onTouchTap={()=> {hashHistory.push("/students");}}
            />,
        ];

      return (
        <div className="feed">
            <Subheader style={{fontSize: 24, marginTop: 15}}> Novo aluno </Subheader>
            <Divider />
          <Paper style={style} zDepth={2} >
            <TextField
                style={{width: '100%'}}
                floatingLabelText="Nome"
                name="name"
                disabled
                value={this.state.student.name}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Email"
                name="email"
                disabled
                value={this.state.student.email}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Telefone"
                name="phone"
                type="number"
                disabled
                value={this.state.student.phone}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Turma"
                name="class"
                disabled
                value={this.state.student.class}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Curso"
                name="course"
                disabled
                value={this.state.student.course}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Matricula"
                name="registrationId"
                type="number"
                disabled
                value={this.state.student.registrationId}
                onChange={this.onChangeInput}
            />
            
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
