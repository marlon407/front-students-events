import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
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
        return (
          <div className="feed">
            <Subheader style={{fontSize: 24, marginTop: 15}}> Ocorrências </Subheader>
            <Divider />
            <Paper style={style} zDepth={2} >
              <EventItems events={this.state.events} />
              <div style={{textAlign:'right'}}>
                <RaisedButton onTouchTap={()=>{hashHistory.push('events/new')}} label="Novo" primary={true} style={{margin:"20"}} />
              </div>
            </Paper>
          </div>
        )
    }
}
