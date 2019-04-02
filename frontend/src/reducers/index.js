import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { transferReducer } from './transfer';

const rootReducer = combineReducers({
  transfer: transferReducer,
  form: formReducer,
});

export default rootReducer;
