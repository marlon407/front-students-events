import React from 'react';
import ReactPaginate from 'react-paginate';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import { hashHistory } from "react-router";

import FeedStore from '../../stores/FeedStore';
import FeedActions from '../../actions/FeedActions';

const style = {
  margin: 20,
  padding: 10
};

export default class CreateEvent extends React.Component {
  /**
  * React.Component constructor.
  */
  constructor() {
        super();
        this.state = { event: {}, students: [], professors: [] };
        this.changeHandler = this.onChange.bind(this);
    }

    /**
    * Component lifecycle function.
    */
    componentWillMount() {
        FeedStore.addChangeListener(this.changeHandler);
    }

    componentDidMount() {
        FeedActions.getProfessors();
        FeedActions.getStudents();
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
        const students = FeedStore.getStudents(); 
        const professors = FeedStore.getProfessors(); 
        if(saved){
            this.setState({open:true});
        }
        this.setState({students, professors})
    }

    /**
    * Pagination Onclick Event Handler
    * @param data
    */
    onChangeInput = (e) => {
        const data = this.state.event;
        data[e.target.name] = e.target.value;
        this.setState({event: data});
    }

    handleStudentChange = (event, index, value) => {
        const data = this.state.event;
        data.student = value;
        this.setState({event: data});
    }

    handleProfessorChange = (event, index, value) => {
        const data = this.state.event;
        data.professor = value;
        this.setState({event: data});
    }

    /**
    * Pagination Onclick Event Handler
    * @param data
    */
    onSave = (e) => {
        const data = this.state.event;
        FeedActions.saveEvent(data);
    }

    handleClose = () => {
        this.setState({open: false});
    };

    renderSelectStudent = () => {
        const students =  this.state.students || [];
        const studentItems = students.map((item, index) => {
            return(
                <MenuItem key={index} value={item.name} primaryText={item.name} />
            )
        });
        return(
            <SelectField
                floatingLabelText="Selecione um aluno"
                value={this.state.event.student}
                name={"student"}
                style={{width: '100%'}}
                onChange={(this.handleStudentChange)}
                >
                {studentItems}
            </SelectField>
        );
    } 

    renderSelectProfessor = () => {
        const professors =  this.state.professors || [];
        const studentItems = professors.map((item, index) => {
            return(
                <MenuItem value={item.name} primaryText={item.name} />
            )
        });
        return(
            <SelectField
                floatingLabelText="Selecione um professor"
                value={this.state.event.professor}
                style={{width: '100%'}}
                onChange={(this.handleProfessorChange)}
                >
                {studentItems}
            </SelectField>
        );
    } 

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
                onTouchTap={()=> {hashHistory.push("/events");}}
            />,
        ];

      return (
        <div className="feed">
            <Subheader style={{fontSize: 24, marginTop: 15}}> Nova ocorrência </Subheader>
            <Divider />
          <Paper style={style} zDepth={2} >
            
            
            {this.renderSelectStudent()}

            {this.renderSelectProfessor()}

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Disciplina"
                name="subject"
                value={this.state.event.subject}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Descrição da ocorrência"
                name="description"
                multiLine={true}
                rows={2}
                value={this.state.event.description}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Turma"
                name="class"
                value={this.state.event.class}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelText="Matricula"
                name="registrationId"
                type="number"
                value={this.state.event.registrationId}
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
                Evento criado com sucesso!
            </Dialog>
        </div>
      )
    }
}
