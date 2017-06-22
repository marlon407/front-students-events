import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { hashHistory } from "react-router";


import MainStore from '../../stores/MainStore';
import FeedStore from '../../stores/FeedStore';
import FeedActions from '../../actions/FeedActions';
import EventItems from './EventItems';

const style = {
  margin: 20,
};

export default class Events extends React.Component {

    /**
    * React.Component constructor.
    */
    constructor() {
        super();
        this.state = {};
        this.changeHandler = this.onChange.bind(this);
    }

    /**
    * Component lifecycle function.
    */
    componentDidMount() {
        FeedActions.getEvents();
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
        const events = FeedStore.getEvents();
        this.setState({events});
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
                    <RaisedButton onTouchTap={()=>{hashHistory.push('events/new')}} label="Novo" primary={true} style={{margin:"20"}} />
                </div>
            )
        }
        return (
          <div className="feed">
            <h2> Ocorrências </h2>
            <Paper style={style} zDepth={2} >
              <EventItems events={this.state.events} />
              {renderCreateButton}
            </Paper>
          </div>
        )
    }
}
