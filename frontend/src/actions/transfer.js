import * as AT from './transferTypes';
import { API_ROOT } from '../constants';

export const getUserList = () => ({
  type: AT.GET_USER_LIST,
});

export const getUserListSuccess = list => ({
  type: AT.GET_USER_LIST_SUCCESS,
  payload: {
    list,
  },
});

export const getUserListFailed = error => ({
  type: AT.GET_USER_LIST_FAILED,
  payload: {
    error,
  },
});

export function getUsers() {
  return (dispatch) => {
    dispatch(getUserList());
    return fetch(`${ API_ROOT }/users/`)
    .then(response => response.json())
    .then(data => {
      dispatch(getUserListSuccess(data))
    })
    .catch(error => dispatch(getUserListFailed(error)));
  }
}


export const transferMoney = () => ({
  type: AT.TRANSFER_MONEY,
});

export const transferMoneySuccess = result => ({
  type: AT.TRANSFER_MONEY_SUCCESS,
  payload: {
    result,
  },
});

export const transferMoneyFailed = error => ({
  type: AT.TRANSFER_MONEY_FAILED,
  payload: {
    error,
  },
});

export function makeTransfer(formValues) {
  return (dispatch) => {
    dispatch(transferMoney());
    return fetch(
      `${ API_ROOT }/transfer/`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues),
      }
    )
    .then(response => response.json())
    .then(data => {
      if (data.hasOwnProperty('non_field_errors')) {
        dispatch(transferMoneyFailed(data.non_field_errors))
      } else {
        dispatch(transferMoneySuccess(data))
      }
    })
    .catch(error => dispatch(transferMoneyFailed(error.message)));
  }
}
