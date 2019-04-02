import React from 'react';
import PropTypes from 'prop-types';

const UserItem = ({ item }) => (
  <p>
    User INN: {item.inn}<br/>
    User account: {item.account}
  </p>
)

UserItem.propTypes = {
  item: PropTypes.shape({}),
}

export { UserItem };