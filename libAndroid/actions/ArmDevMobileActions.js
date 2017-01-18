import * as types from './actionTypes';
let nextPostId = 0;

export const addPost = (post) => ({
  type: types.ADD_POST,
  id: nextPostId++,
  post
})