import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { hashHistory } from "react-router";

import MainStore from '../../stores/MainStore';
import FeedStore from '../../stores/FeedStore';
import FeedActions from '../../actions/FeedActions';
import FriendsItems from './FriendsItems';

const style = {
  margin: 20,
};

export default class Users extends React.Component {

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
        FeedActions.getProfessors();
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
        const professors = FeedStore.getProfessors();
        this.setState({professors});
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
                    <RaisedButton onTouchTap={()=>{hashHistory.push('users/new')}} label="Novo" primary={true} style={{margin:"20"}} />
                </div>
            )
        }
        return (
          <div className="feed">
              <Subheader style={{fontSize: 24, marginTop: 15}}> Professores </Subheader>
            <Divider />
            <Paper style={style} zDepth={2} >
              <FriendsItems professors={this.state.professors} />
              {renderCreateButton}
            </Paper>
          </div>
        )
    }
}
