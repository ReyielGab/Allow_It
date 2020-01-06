import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import promise from 'redux-promise';
// import createLogger from 'redux-logger';
import client from './api.js';

const middleWares = applyMiddleware(thunk.withExtraArgument({}));

export default middleWares;