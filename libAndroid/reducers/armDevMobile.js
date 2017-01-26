import * as types from '../actions/actionTypes';

const armDevMobile = (state = [], action) => {
  switch (action.type) {
    case types.ADD_POST:
      return [
        ...state,
        {
          id: action.id,
          post: action.post
        }
      ];
      break;
    case types.ADD_FEED:
      return action.feed.posts.posts;
      break;
    default:
      return state;
      break;
  }
}
export default armDevMobile;
