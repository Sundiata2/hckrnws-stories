import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { getComments } from '../lib/actions';

class CommentSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.props.fetchCommentItems(this.props.shortenedIDs);
  }

  renderComments() {
    const { comments } = this.props;
    if (comments) {
      const commentItems = comments.map((comment, i) => {
        const { by, id, time, kids, text } = comment;
        // We need to multiply the time by 1000 to get the current time and not 1970
        const timeCreated = new Date(time*1000).toISOString();
        const formattedDate = DateTime.fromISO(timeCreated).toLocaleString(DateTime.DATETIME_MED);
        const commentText = {
          __html: text
        };
        return (
          <div className="comment-item-wrapper" key={i}>
            <div className="author">{`User: ${by}`}</div>
            <div className="middle" dangerouslySetInnerHTML={commentText}></div>
            <div className="bottom">
              <div className="replies">
                {
                  kids ?
                  `${kids.length} replies`
                  :
                  `No replies.`
                }
              </div>
              <div className="time">{formattedDate}</div>
            </div>
          </div>
        );
      });
      return commentItems;
    }
    return null;
  }

  render() {
    const { match, resultItem } = this.props;
    return (
      <div className="comments-page-wrapper">
        <div className="comments-page-header">
          <div className="header-top">
            <div>
              {`Story: ${resultItem.title}`}
            </div>
          </div>
          <div className="go-home">
            <Link to="/">{'Back to Top Stories'}</Link>
          </div>
          <div>{'Comments Below'}</div>
        </div>
        <div className="comments-wrapper">
          {this.renderComments()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const resultItem = state.results.find((result) => {
    return result.id === Number(ownProps.match.params.storyID);
  });
  const commentIDs = resultItem ? resultItem.kids : null;
  let shortenedIDs;
  if (commentIDs && commentIDs.length > 20) {
    shortenedIDs = commentIDs.slice(0, 20);
  }
  else {
    shortenedIDs = commentIDs;
  }
  const comments = state.comments;
  return {
    resultItem,
    shortenedIDs,
    comments
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // Need function here to dispatch to fetch the comments
  return {
    fetchCommentItems: (commentIDs) => {
      return dispatch(getComments(commentIDs));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);
