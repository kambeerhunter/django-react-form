import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import { API_ROOT } from '../constants';
import * as actions from './transfer';
import * as AT from './transferTypes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('Transfer action tests', () => {
  it('getUserList', () => {
    const expectedAction = {
      type: AT.GET_USER_LIST,
    };

    expect(actions.getUserList()).toEqual(expectedAction);
  });

  it('getUserListSuccess', () => {
    const expectedAction = {
      type: AT.GET_USER_LIST_SUCCESS,
      payload: {
        list: [1, 2, 3],
      }
    };

    expect(actions.getUserListSuccess([1, 2, 3])).toEqual(expectedAction);
  })

  it('getUserListFailed', () => {
    const expectedAction = {
      type: AT.GET_USER_LIST_FAILED,
      payload: {
        error: 'error',
      }
    };

    expect(actions.getUserListFailed('error')).toEqual(expectedAction);
  });

  describe('Async actions', () => {
    let store;
    beforeEach(()=>{
      store = mockStore({});
    })

    afterEach(() => {
      fetchMock.reset();
    });

    it('getUsers', () => {
      fetchMock.getOnce(`${API_ROOT}/users/`, {
        headers: { 'content-type': 'application/json' },
        body: [1, 2, 3],
      });

      const expectedActions = [
        actions.getUserList(),
        actions.getUserListSuccess([1, 2, 3]),
      ];

      return store.dispatch(actions.getUsers()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('makeTransfer', () => {
      fetchMock.postOnce(`${API_ROOT}/transfer/`, {
        headers: { 'content-type': 'application/json' },
        body: [1, 2, 3],
      });

      const expectedActions = [
        actions.transferMoney(),
        actions.transferMoneySuccess([1, 2, 3]),
      ];

      return store.dispatch(actions.makeTransfer()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
    });
  });
});