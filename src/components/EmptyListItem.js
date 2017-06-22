import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

export default class EmptyListItem extends React.Component {

  render() {
    return (
      <ListItem
        leftAvatar={<Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} />}
        primaryText={this.props.primaryText}/>
    )
  }
}
