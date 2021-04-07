import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleWare from 'redux-saga';
import rootReducer from './rootReducer';

const defaultState ={};
const sagaMiddleWare = createSagaMiddleWare();
const middlewares = [sagaMiddleWare]

const store = createStore(rootReducer, defaultState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;