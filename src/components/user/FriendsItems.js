import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { hashHistory } from "react-router";

import EmptyListItem from '../EmptyListItem';

export default class FriendsItems extends React.Component {

    /**
    * Component lifecycle function.  See:  https://facebook.github.io/react/docs/component-specs.html#render
    * @returns {XML}
    */
    render() {

      const { professors } = this.props;
      if (!professors) return <EmptyListItem primaryText="No friends to show"/>;
      const items = professors.map((item) => {
        return(
          <ListItem key={item._id}
            onClick={()=>{hashHistory.push(`/users/${item._id}`);}}
            leftAvatar={<Avatar src={''} />}
            primaryText={item.name}
          />
        );
      });

      return (

        <List>
          {items}
        </List>
      )
    }

}
