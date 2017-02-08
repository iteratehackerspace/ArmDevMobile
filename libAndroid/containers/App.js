import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from '../reducers';
import ArmDevMobileApp from './ArmDevMobileApp';
import { addPost, addFeed, addYou } from '../actions/ArmDevMobileActions'

const reducer = combineReducers(reducers);
export const reduxStore = createStore(reducer);


export default class App extends Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <ArmDevMobileApp />
      </Provider>
    );
  }
}
