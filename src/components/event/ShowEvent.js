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
};

const textStyle = {
  padding: "10px"
};

const labelStyle = {
  padding: "10px"
};

export default class CreateEvent extends React.Component {
  /**
  * React.Component constructor.
  */
  constructor() {
        super();
        this.state = { event: {} };
        this.changeHandler = this.onChange.bind(this);
    }

    /**
    * Component lifecycle function.
    */
    componentWillMount() {
        FeedStore.addChangeListener(this.changeHandler);
    }

    componentDidMount() {
        FeedActions.getEvent(this.props.params.id); 
        FeedActions.getProfessors();
        FeedActions.getStudents();
    }

    componentWillReceiveProps(nextProps) {
        FeedActions.getEvent(nextProps.params.id); 
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
        const event = FeedStore.getEvent();
        const students = FeedStore.getStudents(); 
        const professors = FeedStore.getProfessors(); 
        console.log(event) 
        if(saved){
            this.setState({open:true});
        }
        this.setState({event, students, professors})
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
                <MenuItem value={item.name} primaryText={item.name} />
            )
        });
        return(
            <SelectField
                floatingLabelText="Selecione um aluno"
                value={this.state.event.student}
                disabled
                style={{width: '100%', padding: 10}}
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
                disabled
                style={{width: '100%', padding: 10}}
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
        if(!this.state.event) { return null }
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
            <Subheader style={{fontSize: 24, marginTop: 15}}> Detalhe ocorrência </Subheader>
            <Divider />
          <Paper style={style} zDepth={2} >
            
            
            {this.renderSelectStudent()}

            {this.renderSelectProfessor()}

            <TextField
                style={{width: '100%'}}
                floatingLabelStyle={textStyle}
                floatingLabelText="Disciplina"
                name="subject"
                disabled
                value={this.state.event.subject}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                floatingLabelStyle={textStyle}
                floatingLabelText="Descrição da ocorrência"
                name="description"
                multiLine={true}
                rows={2}
                disabled
                value={this.state.event.description}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                textareaStyle={textStyle}
                floatingLabelStyle={textStyle}
                floatingLabelText="Turma"
                name="class"
                disabled
                value={this.state.event.class}
                onChange={this.onChangeInput}
            />

            <TextField
                style={{width: '100%'}}
                textareaStyle={textStyle}
                floatingLabelStyle={textStyle}
                floatingLabelText="Matricula"
                name="registrationId"
                disabled
                value={this.state.event.registrationId}
                onChange={this.onChangeInput}
            />
          </Paper>
        </div>
      )
    }
}
