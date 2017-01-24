import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from '../reducers';
import ArmDevMobileApp from './ArmDevMobileApp';
import { addPost } from '../actions/ArmDevMobileActions'

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
const post = {
  id: 123,
  title: ' id quod m ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
  likes: 12332,
  tags: [
    'programming', 
    'reactJS', 
    'react native'
  ],
  seen: 657657,
  time: '02/12/2016',
  text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
  author: {
    fullName: 'John Brown',
    ShortDescription: 'I\'m the best react native developer',
    bigDescription: 'react native 12312years of development and blablabla',
    followers: 321,
    idOfAuthor: 3212321,
    image: '../assets/trump.jpg',
  },
  comments: [
    {
      commentId: 1,
      likes: 123123,
      time: '02/12/2016',
      text: 'a lot of text of comment',
      author: {
        fullName: 'John Brown',
        ShortDescription: 'I\'m the best react native developer',
        bigDescription: 'react native 12312years of development and blablabla',
        followers: 321,
        idOfAuthor: 3212321,
        image: '../assets/trump.jpg',
      },
    }
  ],
}
reduxStore.dispatch(addPost(post));