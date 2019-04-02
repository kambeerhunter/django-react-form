import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import FormWrapper from  './components/FormWrapper';

const App = () => (
  <Provider store={store}>
    <div className="container mt-5">
      <FormWrapper />
    </div>
  </Provider>
)

export default App;
