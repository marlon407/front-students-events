import React from 'react';
import ReactPaginate from 'react-paginate';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { hashHistory } from "react-router";

import FeedStore from '../../stores/FeedStore';
import MainStore from '../../stores/MainStore';
import FeedActions from '../../actions/FeedActions';
import FeedItems from './FeedItems';

const style = {
  margin: 20,
};

export default class Students extends React.Component {
  /**
  * React.Component constructor.
  */
  constructor() {
        super();
        this.state = { offset: 1 };
        this.changeHandler = this.onChange.bind(this);
    }

    /**
    * Component lifecycle function.
    */
    componentDidMount() {
        FeedActions.getStudents();
        const role = MainStore.getRole();
        this.setState({role});
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
        const students = FeedStore.getStudents();
        this.setState({students});
    }

    /**
    * Pagination Onclick Event Handler
    * @param data
    */
    handlePageClick = (data) => {
      let selected = data.selected;
      let offset = selected + 1;
      this.setState({offset: offset, feed: []}, () => {
        FeedActions.getFeed(offset);
      });
    }

    /**
    * Component lifecycle function.  See:  https://facebook.github.io/react/docs/component-specs.html#render
    * @returns {XML}
    */
    render() {
      let renderCreateButton;
      if(this.state.role === "admin"){
        renderCreateButton = (
          <div style={{textAlign:'right'}}>
                <RaisedButton onTouchTap={()=>{hashHistory.push('students/new')}} label="Novo" primary={true} style={{margin:"20"}} />
            </div>
        )
      }
      return (
        <div className="feed">
          <h2> Alunos </h2>
          <Divider />
          <Paper style={style} zDepth={2} >
            <FeedItems students={this.state.students}  />
            {renderCreateButton}
          </Paper>
        </div>
      )
    }
}
