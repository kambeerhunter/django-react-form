import React from 'react';
import { PropTypes } from 'prop-types';
import { UserItem } from './UserItem';

class UserList extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({})),
  }

  static defaultProps = {
    list: [],
  }


  render() {
    const { list } = this.props;

    return (
      <React.Fragment>
        <h5>User list:</h5>
        {list.map((item, index) => (
          <UserItem
            item={item}
            key={`${item.inn}-${index}`}
          />
        ))}
        <hr/>
      </React.Fragment>
    )
  }
}

export default UserList;
