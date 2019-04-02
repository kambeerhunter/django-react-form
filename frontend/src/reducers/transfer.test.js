import { transferReducer, initialState } from './transfer';
import * as actions from '../actions/transferTypes';

describe('transfer reducer tests', () => {
  it('GET_USER_LIST', () => {

    const action = {
      type: actions.GET_USER_LIST,
    }

    expect(transferReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  it('GET_USER_LIST_SUCCESS', () => {
    const state = {
      userList: [],
      isLoading: true,
      error: null,
    }
    const action = {
      type: actions.GET_USER_LIST_SUCCESS,
      payload: {
        list: [1, 2, 3]
      }
    }

    expect(transferReducer(state, action)).toEqual({
      ...state,
      isLoading: false,
      userList: action.payload.list,
    })
  })

  it('GET_USER_LIST_FAILED', () => {
    const state = {
      userList: [],
      isLoading: true,
      error: null,
    }
    const action = {
      type: actions.GET_USER_LIST_FAILED,
      payload: {
        error: 'error'
      }
    }

    expect(transferReducer(state, action)).toEqual({
      ...state,
      isLoading: false,
      error: action.payload.error,
    })
  })

  it('TRANSFER_MONEY', () => {

    const action = {
      type: actions.TRANSFER_MONEY,
    }

    expect(transferReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  it('TRANSFER_MONEY_SUCCESS', () => {
    const state = {
      userList: [2, 3],
      isLoading: true,
      error: null,
    }
    const action = {
      type: actions.TRANSFER_MONEY_SUCCESS,
      payload: {
        result: JSON.stringify([{id: 1}, {id: 2}, {id: 3}])
      }
    }

    expect(transferReducer(state, action)).toEqual({
      ...state,
      isLoading: false,
      userList: JSON.parse(action.payload.result),
    })
  })

  it('TRANSFER_MONEY_FAILED', () => {
    const state = {
      userList: [4, 5],
      isLoading: true,
      error: null,
    }
    const action = {
      type: actions.TRANSFER_MONEY_FAILED,
      payload: {
        error: 'error'
      }
    }

    expect(transferReducer(state, action)).toEqual({
      ...state,
      isLoading: false,
      error: action.payload.error,
    })
  })
})
