import React from 'react';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';
import MainStore from './stores/MainStore';
import RightElement from './components/RightElement';

export default class App extends React.Component {

  constructor(){
    super();
    this.state = { message: '', open: false };
    this.changeHandler = this.onChange.bind(this);
  }

  componentWillMount() {
      MainStore.addChangeListener(this.changeHandler);
  }

  componentWillUnmount() {
      MainStore.removeChangeListener(this.changeHandler);
  }

  onChange() {
      const message = MainStore.getMessage();
      console.log("message", message);
      if (message){
        this.setState({message, open: true});
      }else{
        this.setState({open: false});
      }
  }

  render() {
    return (
      <div>
        <AppBar
          title=""
          style={{cursor: 'pointer'}}
          iconElementLeft={<a href="http://araquari.ifc.edu.br/wp-content/themes/ifc-v2/assets/images/favicon-16x16.png" />}
          onTitleTouchTap={()=>this.props.router.push('/students')}
          iconElementRight={<RightElement />}/>
        {this.props.children}
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}/>
      </div>
    )
  }
}
