import { RECEIVE_TOP_STORIES, CLEAR_COMMENTS, RECEIVE_COMMENTS } from './actions';

const initialState = {
  results: [],
  comments: []
}

function searchRes(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TOP_STORIES:
      return {
        results: action.results
      };
    case RECEIVE_COMMENTS:
      return {
        comments: action.comments,
        results: state.results
      };
    case CLEAR_COMMENTS:
      return {
        comments: [],
        results: state.results
      };
    default:
      return state;
  }
}


export default searchRes;
