import * as AT from '../actions/transferTypes';

const initialState = {
  userList: [],
  isLoading: false,
  error: null,
}

const transferReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.GET_USER_LIST:
      return {
        ...state,
        isLoading: true,
      }
    case AT.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        userList: action.payload.list,
        isLoading: false,
      }
    case AT.GET_USER_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      }
    case AT.TRANSFER_MONEY:
      return {
        ...state,
        isLoading: true,
      }
    case AT.TRANSFER_MONEY_SUCCESS:
      const result = JSON.parse(action.payload.result);
      return {
        ...state,
        isLoading: false,
        userList: result,
      }
    case AT.TRANSFER_MONEY_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      }
    default:
      return state;
  }
}

export { transferReducer, initialState };