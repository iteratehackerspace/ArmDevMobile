import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from '../reducers';
import ArmDevMobileApp from './ArmDevMobileApp';
import { addPost, addFeed } from '../actions/ArmDevMobileActions'

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
//Test data
fetch('http://192.168.1.212:8080/get_feed')
  .then((res) => res.json())
  .then((res) => reduxStore.dispatch(addFeed(res)));
