import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const thunkMiddleware = applyMiddleware(thunk);

const store = createStore(rootReducer, thunkMiddleware);

export default store;

