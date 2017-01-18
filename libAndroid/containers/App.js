import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from '../reducers';
import ArmDevMobileApp from './ArmDevMobileApp';
import { addPost } from '../actions/ArmDevMobileActions'

const reducer = combineReducers(reducers);
export const reduxStore = createStore(reducer);

reduxStore.subscribe(()=>console.log(reduxStore.getState()));

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
const post = {
  id: 123,
  title: 'how to use react native',
  likes: 12332,
  tags: [
    'programming', 
    'reactJS', 
    'react native'
  ],
  seen: 657657,
  time: 'date',
  text: 'a lot of post',
  comments: [
    {
      commentId: 1,
      likes: 123123,
      time: 'dateOfComment',
      text: 'a lot of text of comment',
      author: {
        fullName: 'John Brown',
        ShortDescription: 'I\'m the best react native developer',
        bigDescription: 'react native 12312years of development and blablabla',
        followers: 321,
        idOfAuthor: 3212321,
        image: 'some string',
      },
    }
  ],
}
reduxStore.dispatch(addPost(post));