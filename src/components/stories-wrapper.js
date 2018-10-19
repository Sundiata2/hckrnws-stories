import React, { Component } from 'react';
import StoryItem from './story-item';
import { connect } from 'react-redux';

class StoriesResults extends Component {

  renderStoryResultItems() {
    const results = this.props.results;
    const resultItems = this.props.results.map((result, i) => {
      return (
        <StoryItem result={result} key={i}/>
      );
    });
    return resultItems;
  }

  render() {
    return (
      <div className="top-stories-wrapper">
        <div className="top-stories-header">
          {'Top Stories On Hackernews'}
        </div>
        <div className="story-items-wrapper">
          {this.renderStoryResultItems()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    results: state.results
  };
};

export default connect(mapStateToProps)(StoriesResults);
