import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import credentialReducer from './slices/CredentialsSlice'

const reducer = combineReducers({
  credentials: credentialReducer
  });

  const store = configureStore({
    reducer,
    // middleware: [thunk],
  });
  
  export default store;
  