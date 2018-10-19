import xhr from 'xhr';
export const GET_TOP_STORIES = 'GET_TOP_STORIES';
export const RECEIVE_TOP_STORIES = 'RECEIVE_TOP_STORIES';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';

export function getTopStories() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const options = {
        url: `https://hacker-news.firebaseio.com/v0/topstories.json`
      };

      // Make request to get the top story results
      xhr(options, async (err, res, body) => {
        if (err) {
          return reject();
        }

        // We need to parse the response still so we can slice off the first 10 story IDs
        body = JSON.parse(body);
        const storyIDs = body.slice(0, 10);
        const storyItems = await Promise.all(storyIDs.map(async (story) => {
          return await fetchStoryItem(story);
        }));
        dispatch(receiveResults(storyItems));
        resolve();
      });
    });
  };
}

export function getComments(commentIDs) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      // Maybe just re-run the fetch function then populate state with the comments?
      // Then when we go back to /stories we clear the comments state?
      // That might work
      const commentItems = await Promise.all(commentIDs.map(async (item) => {
        return await fetchStoryItem(item);
      }));
      return dispatch(receiveComments(commentItems));
    });
  }
}

export function fetchStoryItem(rawResult) {
  return new Promise((resolve, reject) => {
      const options = {
        url: `https://hacker-news.firebaseio.com/v0/item/${rawResult}.json`
      };
      xhr(options, (err, res, body) => {
        if (err) {
          return reject();
        }
        resolve(JSON.parse(body));
      })
  });
}

export function receiveComments(commentResults) {
  return {
    type: RECEIVE_COMMENTS,
    comments: commentResults
  };
}

export function clearComments() {
  return {
    type: CLEAR_COMMENTS
  };
}

export function receiveResults(rawResults) {
  return {
    type: RECEIVE_TOP_STORIES,
    results: rawResults
  };
}
