import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { formValueSelector, reset } from 'redux-form';
import * as actions from '../../actions/transfer';
import TransferForm from '../TransferForm';
import UserList from '../UserList';
import FormError from '../FormError';

class FormWrapper extends React.Component {
  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    userList: PropTypes.arrayOf(PropTypes.shape({})),
    error: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.string,
    ]),
    resetForm: PropTypes.func.isRequired,
  }

  static defaultProps = {
    userList: [],
    error: null,
  }

  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }

  moneyTransfer = values => {
    const { transfer} = this.props;
    transfer({ ...values });
  }

  submitTransferForm = () => {
    const { formValues, resetForm } = this.props;
    this.moneyTransfer(formValues);
    resetForm('transfer');
  }

  render() {
    const { userList, error } = this.props;

    return (
      <React.Fragment>
        <UserList
          list={userList}
        />
        <TransferForm
          list={userList}
          onSubmit={this.submitTransferForm}
        />
        {error && (
          <FormError
            error={error}
          />
        )}
      </React.Fragment>
    )
  }
}

const selector = formValueSelector('transfer')

const mapStateToProps = state => ({
  userList: state.transfer.userList,
  error: state.transfer.error,
  formValues: {
    inn_list: selector(state, 'innList'),
    source: selector(state, 'source'),
    value: selector(state, 'value'),
  }
});

const mapDispatchToProps = {
    getUsers: actions.getUsers,
    transfer: actions.makeTransfer,
    resetForm: reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWrapper);
